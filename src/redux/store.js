import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from './goalsSlice';
import backgroundReducer from './backgroundSlice';
import quotesReducer from './quotesSlice';

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    background: backgroundReducer,
    quotes: quotesReducer,
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
