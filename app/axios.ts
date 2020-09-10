import Axios from "axios";
import { AsyncStorage } from "react-native";
import * as data from "./tools-buffer/localtunnel.json";
import { ExerciseProps, RoutineProps } from './types';

export const axios = Axios.create({
  baseURL: (<any>data).url,
});

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

type httpMethodTypes = keyof typeof HTTP_METHODS;

export const stronkJWTKeyname = "jwt";

export const createAxiosRequest = async (method: httpMethodTypes, url: string, data: any): Promise<any> => {
  const token = await AsyncStorage.getItem(stronkJWTKeyname);
  console.log("[token]: ", token);
  try {
    const response = await axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
        // Authorization: token
      },
      data
    });
    return response.data;
  } catch (err) {
    throw new Error;
  }
}

class SendApiRequest {
  /**
   * Authentication
   */
  async me() {
    return createAxiosRequest(
      "GET",
      "/me",
      null
    )
  };
  async login(email: string, password: string) {
    return createAxiosRequest(
      "POST",
      "/user/login",
      { email, password },
    )
  };
  async register(email: string, password: string) {
    return createAxiosRequest(
      "POST",
      "/user/register",
      { email, password }
    )
  };
  async logout() {
    return createAxiosRequest(
      "GET",
      "/user/logout",
      {}
    )
  };

  /**
   * Routines
   */
  async fetchRoutines() {
    return createAxiosRequest(
      "GET",
      "/routines",
      {}
    )
  }

  async fetchRoutine(routineId: string) {
    return createAxiosRequest(
      "GET",
      `/routine?id=${routineId}`,
      {}
    )
  }

  async addRoutine(
    title: string,
    description: string,
    exercises: ExerciseProps[]
  ) {
    return createAxiosRequest(
      "POST",
      "/routine",
      {
        title,
        description,
        // exercises
      }
    )
  }

  async updateRoutine(routineId: string, title?: string, description?: string, exercises?: ExerciseProps[]) {
    return createAxiosRequest(
      "PUT",
      `/routine?id=${routineId}`,
      {
        title,
        description,
        exercises
      }

    )
  }

  async deleteRoutine(routineId: string) {
    return createAxiosRequest(
      "DELETE",
      `/routine?id=${routineId}`,
      {}
    )
  };

  async pushExerciseIntoRoutine(routineId: string, exerciseId: string) {
    return createAxiosRequest(
      "POST",
      ``,
      {
        routineId,
        exerciseId
      }
    );
  }

  async popExerciseFromRoutine(routineId: string, exerciseId: string) {
    return createAxiosRequest(
      "POST",
      ``,
      {
        routineId,
        exerciseId
      }
    )
  }

  /**
   * Exercises
   */
  async fetchExercises() {
    return createAxiosRequest(
      "GET",
      "/exercises",
      {}
    )
  };

  async fetchExercise(exerciseId: string) {
    return createAxiosRequest(
      "GET",
      `/exercise?id=${exerciseId}`,
      {}
    );
  }

  async addExercise(name: string, sets: number, reps: number) {
    return createAxiosRequest(
      "POST",
      "/exercise",
      {
        name,
        sets,
        reps
      }
    )
  }

  async updateExercise(exerciseId: string, name?: string, sets?: number, reps?: number) {
    return createAxiosRequest(
      "PUT",
      `/exercise?id=${exerciseId}`,
      {
        name,
        sets,
        reps
      }
    )
  }

  async deleteExercise(exerciseId: string) {
    return createAxiosRequest(
      "DELETE",
      `/exercise?id=${exerciseId}`,
      {}
    )
  }
};

export const fromApi = new SendApiRequest();