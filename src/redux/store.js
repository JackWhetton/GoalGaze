import { configureStore } from '@reduxjs/toolkit';

// Import your slices here when you create them
// import weatherSlice from '../features/weather/weatherSlice';
// import quoteSlice from '../features/quote/quoteSlice';
// import imageSlice from '../features/images/imageSlice';
// import goalsSlice from '../features/goals/goalsSlice';

export const store = configureStore({
  reducer: {
    // Add your reducers here when you create them
    // weather: weatherSlice,
    // quote: quoteSlice,
    // images: imageSlice,
    // goals: goalsSlice,
  },
});
