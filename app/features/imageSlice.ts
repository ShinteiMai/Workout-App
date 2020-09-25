import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fromApi } from "../axios";
import { reduxStatus } from "./types";

export const fetchImage = createAsyncThunk(
  "image/fetchImage",
  async ({ imageId }: any) => {
    const data = await fromApi.fetchImage(imageId);
    // console.log(data);
    return data.image;
  }
);

export const uploadImage = createAsyncThunk(
  "image/uploadImage",
  async (image: any) => {
    // async (fileUri: any) => {
    console.log(String(image.picture).length);
    const data = await fromApi.uploadImage(image);
    // const data = await fromApi.uploadImage(fileUri);
    // return data.image;
  }
);

export const deleteImage = createAsyncThunk(
  "image/deleteImage",
  async ({ imageId }: any) => {
    const data = await fromApi.deleteImage(imageId);
    return data.image;
  }
);

export const imageSlice = createSlice({
  name: "image",
  initialState: {
    image: [],
    status: reduxStatus.idle,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchImage.pending as any]: (state, action) => {
      state.status = `fetchImage/${reduxStatus.loading}`;
    },
    [uploadImage.pending as any]: (state, action) => {
      state.status = `addRoutine/${reduxStatus.loading}`;
    },
    [deleteImage.pending as any]: (state, action) => {
      state.status = `deleteRoutine/${reduxStatus.loading}`;
    },
    [fetchImage.rejected as any]: (state, action) => {
      state.status = `fetchImage/${reduxStatus.error}`;
    },
    [uploadImage.rejected as any]: (state, action) => {
      state.status = `addRoutine/${reduxStatus.error}`;
    },
    [deleteImage.rejected as any]: (state, action) => {
      state.status = `deleteRoutine/${reduxStatus.error}`;
    },
    [fetchImage.fulfilled as any]: (state, action) => {
      state.status = `fetchImage/${reduxStatus.success}`;
    },
    [uploadImage.fulfilled as any]: (state, action) => {
      state.status = `addRoutine/${reduxStatus.success}`;
    },
    [deleteImage.fulfilled as any]: (state, action) => {
      state.status = `deleteRoutine/${reduxStatus.success}`;
    },
  },
});

export const selectImage = (state) => {
  return {
    image: state.image.image,
  };
};

export const imageStatus = (state) => {
  return {
    status: state.image.status,
  };
};

export default imageSlice.reducer;
