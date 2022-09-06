import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: 0,
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    get: (state) => {
      state.value += 1;
    },
    set: (state) => {
      state.value -= 1;
    },
  },
});

export const { get, set } = listsSlice.actions;

export default listsSlice.reducer;
