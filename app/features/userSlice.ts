import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import { fromApi, stronkJWTKeyname } from "../axios";
import { reduxStatus } from "./types";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: any) => {
    const data = await fromApi.login(email, password);
    await AsyncStorage.setItem(stronkJWTKeyname, data.jwt);
    return data;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const data = await fromApi.logout();
  await AsyncStorage.removeItem(stronkJWTKeyname);
  return data;
});

export const register = createAsyncThunk(
  "user/register",
  async ({ email, username, password }: any) => {
    const data = await fromApi.register(email, username, password);
    return data;
  }
);

export const googleAuth = createAsyncThunk(
  "user/googleAuth",
  async () => {
    const data = await fromApi.googleAuth();
    console.log(data);
    await AsyncStorage.setItem(stronkJWTKeyname, data.jwt);
    return data;
  }
)



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
      state.status = `login/${reduxStatus.loading}`;
    },
    [googleAuth.pending as any]: (state, action) => {
      state.status = `googleAuth/${reduxStatus.loading}`;
    },
    [register.pending as any]: (state, action) => {
      state.status = `register/${reduxStatus.loading}`;
    },
    [logout.pending as any]: (state, action) => {
      state.status = `logout/${reduxStatus.loading}`;
    },
    [login.fulfilled as any]: (state, action) => {
      const { id, email } = action.payload;
      state.id = id;
      state.email = email;

      state.status = `login/${reduxStatus.success}`;
    },
    [googleAuth.fulfilled as any]: (state, action) => {
      const { id, email } = action.payload;
      state.id = id;
      state.email = email;

      state.status = `googleAuth/${reduxStatus.success}`;
    },
    [register.fulfilled as any]: (state, action) => {
      state.status = `register/${reduxStatus.success}`;
    },
    [logout.fulfilled as any]: (state, action) => {
      state.id = null;
      state.email = null;

      state.status = `logout/${reduxStatus.success}`;
    },
    [login.rejected as any]: (state, action) => {
      state.status = `login/${reduxStatus.error}`;
    },
    [googleAuth.rejected as any]: (state, action) => {
      state.status = `googleAuth/${reduxStatus.error}`;
    },
    [register.rejected as any]: (state, action) => {
      state.status = `register/${reduxStatus.error}`;
    },
    [logout.rejected as any]: (state, action) => {
      state.status = `logout/${reduxStatus.error}`;
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
