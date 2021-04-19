import { createSlice } from "@reduxjs/toolkit";

export const exampleSlice = createSlice({
  name: "example",
  initialState: {
    number: 0,
  },
  reducers: {
    updateNumber: (state, action) => {
      state.number += action.payload;
    },
  },
});

export const { updateNumber } = exampleSlice.actions;

export const actions = { ...exampleSlice.actions };

export default exampleSlice.reducer;
