import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lowerInputValue: 0,
};

export const lowerInputSlice = createSlice({
  name: 'lowerInput',
  initialState,
  reducers: {
    setLowerInput: (state, action) => {
      state.lowerInputValue = action.payload;
    },
  },
});

export default lowerInputSlice.reducer;
export const { setLowerInput } = lowerInputSlice.actions;
