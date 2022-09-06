import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "./authSlice";
import userReducer from "./userSlice";
import listsReducer from "./listsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // auth: authReducer,
    lists: listsReducer,

    // cards: cardsReducer,
    // cardLabels: cardLabelsReducer,
    // cardTasks: cardTasksReducer,
  },
});
