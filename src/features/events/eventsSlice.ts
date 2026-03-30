import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MusicEvent } from '../../types/event';

interface EventsState {
  items: MusicEvent[];           
  totalCount: number;           
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
}

const initialState: EventsState = {
  items: [],
  totalCount: 0,
  connectionStatus: 'disconnected',
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<MusicEvent>) => {
      state.items.unshift(action.payload); 
      state.totalCount += 1;
      
      if (state.items.length > 100) {
        state.items.pop();
      }
    },
    
    clearEvents: (state) => {
      state.items = [];
      state.totalCount = 0;
    },
    
    setConnectionStatus: (state, action: PayloadAction<EventsState['connectionStatus']>) => {
      state.connectionStatus = action.payload;
    },
  },
});

export const { addEvent, clearEvents, setConnectionStatus } = eventsSlice.actions;
export default eventsSlice.reducer;