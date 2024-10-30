import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  hasError: false,
  rates: [],
};

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setRatesLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setRatesError: (state, action) => {
      state.hasError = action.payload;
    },
    setRates: (state, action) => {
      state.rates = action.payload;
    },
  },
});

export default ratesSlice.reducer;
export const { setRates, setRatesLoading, setRatesError } = ratesSlice.actions;
