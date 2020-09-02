import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import routineReducer from "./features/routinesSlice";
import exercisesReducer from "./features/exercisesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    routines: routineReducer,
    exercises: exercisesReducer,
  },
});
