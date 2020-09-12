import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./features/userSlice";
import routineReducer from "./features/routinesSlice";
import exercisesReducer from "./features/exercisesSlice";
import { AsyncStorage } from "react-native";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    routines: routineReducer,
    exercises: exercisesReducer,
  })
);

export const store = configureStore({
  reducer: rootReducer,
});
export const persistor = persistStore(store);
