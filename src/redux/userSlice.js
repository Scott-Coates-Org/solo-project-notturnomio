import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  email: "",
  uid: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      console.log(state.user);
    },
    logout: (state, action) => {
      state.user = "";
      state.email = "";
      state.uid = "";
      console.log(state.user);
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
