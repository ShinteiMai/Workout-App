import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import routineReducer from "./features/routinesSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    routines: routineReducer,
  }
})