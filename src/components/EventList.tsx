import React from 'react';
import { MusicEvent } from '../types/event';

interface EventListProps {
    events: MusicEvent[];
}

// FC - Functional Component
const EventList: React.FC<EventListProps> = ({events}) => { //  - это тип для функциональных компонентов
    if (events.length === 0) {
        return <div>Нет событий для отображения</div>;
    }

    return (
        <div style={{maxHeight: '300px', overflowY: 'auto'}}>
            {
                events.map((event) => (
                    <div key={event.id} style={{
                        padding: '10px', 
                        borderBottom: '1px solid #ccc'
                    }}>
                        <strong>{event.type}</strong> - {new Date(event.timestamp).toLocaleString()}
                        <pre> {JSON.stringify(event.payload, null, 2)}</pre>
                    </div>
                ))
            }
        </div>
    );
};

export default EventList; // Экспортируем компонент EventList
