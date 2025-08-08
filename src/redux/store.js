import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from './goalsSlice';
import backgroundReducer from './backgroundSlice';
import quotesReducer from './quotesSlice';
import weatherReducer from './weatherSlice';

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    background: backgroundReducer,
    quotes: quotesReducer,
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
