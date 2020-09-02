import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fromApi } from "../axios";
import { RoutineProps, ExerciseProps } from "../types";
import { reduxStatus } from "./types";

export const fetchRoutines = createAsyncThunk(
  "routines/fetchRoutines",
  async () => {
    const data = await fromApi.fetchRoutines();
    return data.routines;
  }
);

export const fetchRoutine = createAsyncThunk(
  "routines/fetchRoutine",
  async ({ routineId }: any) => {
    const data = await fromApi.fetchRoutine(routineId);
    return data.routine;
  }
);

export const addRoutine = createAsyncThunk(
  "routines/addRoutine",
  async ({ title, description, exercises }: RoutineProps) => {
    const data = await fromApi.addRoutine(title, description, exercises);
    return data.routine;
  }
);

export const updateRoutine = createAsyncThunk(
  "routines/updateRoutine",
  async ({
    routineId,
    title,
    description,
    exercises,
  }: {
    routineId: string;
    title: string;
    description: string;
    exercises: ExerciseProps[];
  }) => {
    const data = await fromApi.updateRoutine(
      routineId,
      title,
      description,
      exercises
    );
    return data.routine;
  }
);

export const deleteRoutine = createAsyncThunk(
  "routines/deleteRoutine",
  async ({ routineId }: any) => {
    const data = await fromApi.deleteRoutine(routineId);
    return data.routine;
  }
);

export const routinesSlice = createSlice({
  name: "routines",
  initialState: {
    routines: [],
    status: reduxStatus.idle,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchRoutines.pending as any]: (state, action) => {
      state.status = reduxStatus.loading;
    },
    [fetchRoutine.pending as any]: (state, action) => {
      state.status = reduxStatus.loading;
    },
    [addRoutine.pending as any]: (state, action) => {
      state.status = reduxStatus.loading;
    },
    [updateRoutine.pending as any]: (state, action) => {
      state.status = reduxStatus.loading;
    },
    [deleteRoutine.pending as any]: (state, action) => {
      state.status = reduxStatus.loading;
    },
    [fetchRoutines.rejected as any]: (state, action) => {
      state.status = reduxStatus.error;
    },
    [fetchRoutine.rejected as any]: (state, action) => {
      state.status = reduxStatus.error;
    },
    [addRoutine.rejected as any]: (state, action) => {
      state.status = reduxStatus.error;
    },
    [updateRoutine.rejected as any]: (state, action) => {
      state.status = reduxStatus.success;
    },
    [deleteRoutine.rejected as any]: (state, action) => {
      state.status = reduxStatus.error;
    },
    [fetchRoutines.fulfilled as any]: (state, action) => {
      state.routines = action.payload;
      state.status = reduxStatus.success;
    },
    [fetchRoutine.fulfilled as any]: (state, action) => {
      const fetchedRoutine = action.payload;
      state.routines.forEach((routine, index) => {
        if (fetchedRoutine.id.toString() === routine.id.toString()) {
          state.routines[index] = fetchedRoutine;
        }
      });
      state.status = reduxStatus.success;
    },
    [addRoutine.fulfilled as any]: (state, action) => {
      const addedRoutine = action.payload;
      state.routines.push(addedRoutine);
      state.status = reduxStatus.success;
    },
    [updateRoutine.fulfilled as any]: (state, action) => {
      const updatedRoutine = action.payload;
      state.routines.forEach((routine, index) => {
        if (updatedRoutine.id.toString() === routine.id.toString()) {
          state.routines[index] = updatedRoutine;
        }
      });
      state.status = reduxStatus.success;
    },
    [deleteRoutine.fulfilled as any]: (state, action) => {
      const deletedRoutine = action.payload;
      state.routines.forEach((routine, index) => {
        if (deletedRoutine.id.toString() === routine.id.toString()) {
          console.log(routine.id);
          state.routines.splice(index, 1);
        }
      });
      state.status = reduxStatus.success;
    },
  },
});

export const selectRoutines = (state) => {
  return {
    routines: state.routines.routines,
  };
};

export const routinesStatus = (state) => {
  return {
    status: state.routines.status,
  };
};

export default routinesSlice.reducer;
