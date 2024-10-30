import { configureStore } from '@reduxjs/toolkit';
import ratesReducer from '../features/ratesSlice';
import upperInputReducer from '../features/upperInputSlice';
import lowerInputSlice from '../features/lowerInputSlice';

export const store = configureStore({
  reducer: {
    currentRates: ratesReducer,
    upperInputValue: upperInputReducer,
    lowerInputValue: lowerInputSlice,
  },
});
