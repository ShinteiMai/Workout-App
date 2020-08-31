import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fromApi } from "../axios";

const fetchRoutines = createAsyncThunk(
  'routines/fetch',
  async () => {
    const data = await fromApi.fetchRoutines();
    return data.routines;
  }
)

export const routineSlice = createSlice({
  name: 'routines',
  initialState: {
    routines: []
  },
  reducers: {
  },
  extraReducers: {
    [fetchRoutines.fulfilled as any]: (state, action) => {
      return {
        ...state,
        routines: action.payload
      }
    }
  }

});

export const selectRoutine = state => {
  return {
    routines: state.routines
  }
}
export default routineSlice.reducer;