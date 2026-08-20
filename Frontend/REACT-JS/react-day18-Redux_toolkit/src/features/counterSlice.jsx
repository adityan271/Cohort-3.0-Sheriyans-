import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decrerment: (state) => {
      state.count--;
    },
  },
});

export const { increment, decrerment } = counterSlice.actions;

export default counterSlice.reducer;
