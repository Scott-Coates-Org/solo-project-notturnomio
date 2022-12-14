import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  email: "",
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginGoogle: (state, action) => {
      state.user = action.payload.displayName;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      console.log(state.user);
    },
    logoutGoogle: (state) => {
      state.user = "";
      state.email = "";
      state.accessToken = "";
      console.log(state.user);
    },
  },
});

export const { loginGoogle, logoutGoogle } = authSlice.actions;

export default authSlice.reducer;
