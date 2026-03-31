import React, { useMemo } from 'react';
import { MusicEvent } from '../types/event';

interface StatisticsProps {
    events: MusicEvent[];
    totalCount: number;
}


const Statictics: React.FC<StatisticsProps> = ({events, totalCount}) => {
    const stats = useMemo(() => {
        const purchaseCount = events.filter((event) => event.type === 'PURCHASE').length;
        const totalRevenue = events
        .filter(e => e.type ==='PURCHASE')
        .reduce((sum, e) => {
            const payload = e.payload as {price?: number};
            return sum + (payload.price || 0);
        }, 0);

        const searchCount = events.filter((event) => event.type === 'SEARCH').length;
        const errorCount = events.filter((event) => event.type === 'ERROR').length;

        return {
            purchaseCount,
            totalRevenue,
            searchCount,
            errorCount,
        };
    }, [events] );


    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px', background: '#f5f5f5' }}>
        <div>📊 Всего событий: {totalCount}</div>
        <div>🎵 Покупок: {stats.purchaseCount}</div>
        <div>💰 Выручка: {stats.totalRevenue} ₽</div>
        <div>🔍 Поисков: {stats.searchCount}</div>
        <div>⚠️ Ошибок: {stats.errorCount}</div>
      </div>
    );
};