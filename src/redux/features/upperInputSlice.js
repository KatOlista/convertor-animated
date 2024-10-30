import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  upperInputValue: 0,
};

export const upperInputSlice = createSlice({
  name: 'upperInput',
  initialState,
  reducers: {
    setUpperInput: (state, action) => {
      state.upperInputValue = action.payload;
    },
  },
});

export default upperInputSlice.reducer;
export const { setUpperInput } = upperInputSlice.actions;
