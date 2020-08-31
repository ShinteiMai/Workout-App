import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import { fromApi, stronkJWTKeyname } from "../axios";

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: any) => {
    const data = await fromApi.login(email, password);
    await AsyncStorage.setItem(stronkJWTKeyname, data.jwt);
    return data.user;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    const data = await fromApi.logout();
    await AsyncStorage.removeItem(stronkJWTKeyname);
    return data;
  }
);

export const test = createAsyncThunk(
  'user/test',
  async () => {
    console.log('TEST ANJING BEGO');
  }
)

export const register = createAsyncThunk(
  'user/register',
  async ({ email, password }: any) => {
    const data = await fromApi.register(email, password);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    email: '',
  },
  reducers: {
  },
  extraReducers: {
    [login.fulfilled as any]: (state, action) => {
      const { id, email } = action.payload;
      console.log('setting a new user in the global state');
      state.id = id;
      state.email = email;
    },
    [logout.fulfilled as any]: (state, action) => {
      console.log('in logout fulfilled');

    }
  }
});



export const selectUser = state => {
  return {
    id: state.user.id,
    email: state.user.email
  }
};
export default userSlice.reducer;