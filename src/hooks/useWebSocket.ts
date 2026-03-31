import { useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, setConnectionStatus } from '../features/events/eventsSlice';
import { MusicEvent } from '../types/event';

// Мок-генератор событий (заменяет реальный WebSocket сервер)
class MockWebSocketServer {
    private intervalId: ReturnType<typeof setInterval> | null = null;
    private listeners: ((data: string) => void)[] = [];

  // Генерация случайного музыкального события
  private generateRandomEvent(): MusicEvent {
    const trackNames = ['Bohemian Rhapsody', 'Stairway to Heaven', 'Imagine', 'Billie Jean'];
    const artists = ['Queen', 'Led Zeppelin', 'John Lennon', 'Michael Jackson'];
    const eventTypes: MusicEvent['type'][] = ['PURCHASE', 'SEARCH', 'STREAM', 'ERROR'];
    
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const randomTrack = trackNames[Math.floor(Math.random() * trackNames.length)];
    const randomArtist = artists[Math.floor(Math.random() * artists.length)];
    
    const baseEvent = {
      id: Date.now() + '-' + Math.random(),
      timestamp: Date.now(),
    };

    switch (type) {
      case 'PURCHASE':
        return {
          ...baseEvent,
          type: 'PURCHASE',
          payload: {
            trackName: randomTrack,
            artist: randomArtist,
            price: Math.floor(Math.random() * 500) + 99,
            userId: 'user_' + Math.floor(Math.random() * 1000)
          }
        };
      case 'SEARCH':
        return {
          ...baseEvent,
          type: 'SEARCH',
          payload: {
            query: randomArtist,
            resultsCount: Math.floor(Math.random() * 100)
          }
        };
      case 'STREAM':
        return {
          ...baseEvent,
          type: 'STREAM',
          payload: {
            trackName: randomTrack,
            artist: randomArtist,
            duration: Math.floor(Math.random() * 300) + 30
          }
        };
      default:
        return {
          ...baseEvent,
          type: 'ERROR',
          payload: {
            message: 'Failed to process request',
            code: 500
          }
        };
    }
  }

  start() {
    console.log('🔌 Mock WebSocket: Подключение установлено');
    // Генерируем событие каждые 3 секунды
    this.intervalId = setInterval(() => {
      const event = this.generateRandomEvent();
      const message = JSON.stringify(event);
      this.listeners.forEach(listener => listener(message));
    }, 3000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('🔌 Mock WebSocket: Соединение закрыто');
    }
  }

  onMessage(callback: (data: string) => void) {
    this.listeners.push(callback);
  }
}

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const serverRef = useRef<MockWebSocketServer | null>(null);

  useEffect(() => {
    // Создаем мок-сервер
    const server = new MockWebSocketServer();
    serverRef.current = server;
    
    // Подписываемся на события
    server.onMessage((data) => {
      try {
        const event: MusicEvent = JSON.parse(data);
        dispatch(addEvent(event));
      } catch (error) {
        console.error('Ошибка парсинга события:', error);
      }
    });
    
    // Устанавливаем статус connected
    dispatch(setConnectionStatus('connecting'));
    
    // Запускаем с небольшой задержкой (имитация подключения)
    setTimeout(() => {
      server.start();
      dispatch(setConnectionStatus('connected'));
    }, 1000);
    
    // Очистка при размонтировании компонента
    return () => {
      server.stop();
      dispatch(setConnectionStatus('disconnected'));
    };
  }, [dispatch]);
};

// "Как обрабатывать разрыв соединения?"
// Нужен reconnect с exponential backoff — при ошибке ждем 1 сек, потом 2, потом 4 и т.д.

// Почему useRef? — сохраняем ссылку на сервер между рендерами, чтобы правильно закрыть соединение.
