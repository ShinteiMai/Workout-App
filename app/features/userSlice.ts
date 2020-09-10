import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import { fromApi, stronkJWTKeyname } from "../axios";
import { reduxStatus } from "./types";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: any) => {
    const data = await fromApi.login(email, password);
    console.log(data.jwt);
    const jwt = JSON.stringify(data.jwt);
    console.log(data);
    console.log(jwt);
    await AsyncStorage.setItem(stronkJWTKeyname, data.jwt);
    return data.user;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const data = await fromApi.logout();
  await AsyncStorage.removeItem(stronkJWTKeyname);
  // return data;
});

export const register = createAsyncThunk(
  "user/register",
  async ({ email, password }: any) => {
    const data = await fromApi.register(email, password);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
    status: reduxStatus.idle,
  },
  reducers: {},
  extraReducers: {
    [login.pending as any]: (state, action) => {
      state.status = reduxStatus.loading;
    },
    [login.fulfilled as any]: (state, action) => {
      const { id, email } = action.payload;
      state.id = id;
      state.email = email;
      state.status = reduxStatus.success;
    },
    [login.rejected as any]: (state, action) => {
      state.status = reduxStatus.error;
    },
    [logout.fulfilled as any]: (state, action) => {
      state.status = reduxStatus.success;
    },
  },
});

export const selectUser = (state) => {
  return {
    id: state.user.id,
    email: state.user.email,
  };
};

export const selectUserStatus = (state) => {
  return {
    status: String(state.user.status),
  };
};
export default userSlice.reducer;
