import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fromApi } from "../axios";
import { reduxStatus } from "./routinesSlice";

export const fetchExercises = createAsyncThunk(
  'exercises/fetchExercises',
  async () => {
    const data = await fromApi.fetchExercises();
    return data.exercises;
  }
)

export const fetchExercise = createAsyncThunk(
  'exercises/fetchExercise',
  async ({ exerciseId }: any) => {
    const data = await fromApi.fetchExercise(exerciseId);
    return data.exercise;
  }
)

export const addExercise = createAsyncThunk(
  'exercises/addExercise',
  async ({
    name,
    sets,
    reps,
  }: any) => {
    const data = await fromApi.addExercise(name, sets, reps);
    return data.exercise;
  }
)

export const updateExercise = createAsyncThunk(
  'exercises/updateExercise',
  async ({
    exerciseId,
    name,
    sets,
    reps
  }: any) => {
    const data = await fromApi.updateExercise(exerciseId, name, sets, reps);
    return data.exercise;
  }
)

export const deleteExercise = createAsyncThunk(
  'exercises/deleteExercise',
  async ({
    exerciseId
  }: any) => {
    const data = await fromApi.deleteExercise(exerciseId)
    return data.exercise;
  }
)

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercises: [],
    status: reduxStatus.idle
  },
  reducers: {},
  extraReducers: {
    // Pending
    [fetchExercises.pending as any]: (state, action) => {
      state.status = reduxStatus.loading;
    },
    [fetchExercise.pending as any]: (state, action) => {
      state.status = reduxStatus.loading;
    },
    [addExercise.pending as any]: (state, action) => {
      state.status = reduxStatus.loading;
    },
    [updateExercise.pending as any]: (state, action) => {
      state.status = reduxStatus.loading;
    },
    [deleteExercise.pending as any]: (state, action) => {
      state.status = reduxStatus.loading;
    },
    // Rejected 
    [fetchExercises.rejected as any]: (state, action) => {
      state.status = reduxStatus.error;
    },
    [fetchExercise.rejected as any]: (state, action) => {
      state.status = reduxStatus.error;
    },
    [addExercise.rejected as any]: (state, action) => {
      state.status = reduxStatus.error;
    },
    [updateExercise.rejected as any]: (state, action) => {
      state.status = reduxStatus.error;
    },
    [deleteExercise.rejected as any]: (state, action) => {
      state.status = reduxStatus.error;
    },
    // Fulfilled
    [fetchExercises.fulfilled as any]: (state, action) => {
      state.exercises = action.payload;
      state.status = reduxStatus.success;
    },
    [fetchExercise.fulfilled as any]: (state, action) => {
      const fetchedExercise = action.payload;
      state.exercises.forEach((exercise, index) => {
        if (fetchedExercise.id.toString() === exercise.id.toString()) {
          state.exercises[index] = fetchedExercise;
        }
      });
      state.status = reduxStatus.success;
    },
    [addExercise.fulfilled as any]: (state, action) => {
      const addedExercise = action.payload;
      state.exercises.push(addedExercise);
      state.status = reduxStatus.success;
    },
    [updateExercise.fulfilled as any]: (state, action) => {
      const updatedExercise = action.payload;
      state.exercises.forEach((exercise, index) => {
        if (updatedExercise.id.toString() === exercise.id.toString()) {
          state.exercises[index] = updatedExercise;
        };
      });
      state.status = reduxStatus.success;
    },
    [deleteExercise.fulfilled as any]: (state, action) => {
      const deletedExercise = action.payload;
      state.exercises.forEach((exercise, index) => {
        if (deletedExercise.id.toString() === exercise.id.toString()) {
          state.exercises.splice(index, 1);
        };
      });
      state.status = reduxStatus.success;
    }
  }
});

export const selectExercises = state => {
  return {
    exercises: state.exercises.exercises
  }
};

export const selectExercisesStatus = state => {
  return {
    status: state.exercises.status
  }
};

export default exercisesSlice.reducer;