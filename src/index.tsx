import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux'; 
import { store, RootState } from './app/store'; // store - это store Redux, RootState - это тип состояния Redux

import EventList from './components/EventList';
import Statistics from './components/Statistics';
import { clearEvents } from './features/events/eventsSlice';

const App =() => {
    const dispatch = useDispatch(); // useDispatch - это хук для получения диспетчера Redux
    const {items, totalCount, connectionStatus} = useSelector( // useSelector - это хук для получения состояния Redux
        (state: RootState) => state.events 
    );

    const handleClear = () => {
        dispatch(clearEvents()); // clearEvents - это функция для очистки событий
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>🎵 Music Event Dashboard</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <span>🔌 Статус: {connectionStatus}</span>
          <button 
            onClick={handleClear} 
            style={{ marginLeft: '20px', padding: '5px 10px' }}
          >
            Очистить все
          </button>
        </div>
        
        <Statistics events={items} totalCount={totalCount} />
        
        <h2>Последние события:</h2>
        <EventList events={items} />
      </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);