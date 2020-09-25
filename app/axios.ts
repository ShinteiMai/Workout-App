import Axios from "axios";
import { AsyncStorage } from "react-native";
import * as data from "./buffer/localtunnel.json";
import { ExerciseProps, RoutineProps } from "./types";
import * as FileSystem from "expo-file-system";
import * as Google from 'expo-google-app-auth';
import * as env from './.env.json';

const baseUrl = (<any>data).url;
// const baseUrl = "http://localhost:8080";

const googleConfig = {
  expoClientId: (<any>env).web_client_id,
  iosClientId: (<any>env).ios_client_id,
  androidClientId: (<any>env).android_client_id,
  iosStandaloneAppClientId: (<any>env).ios_client_id,
  androidStandaloneAppClientId: (<any>env).android_client_id,
};

export const axios = Axios.create({
  baseURL: baseUrl,
});

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

type httpMethodTypes = keyof typeof HTTP_METHODS;

export const stronkJWTKeyname = "jwt";

export const createAxiosRequest = async (
  method: httpMethodTypes,
  url: string,
  data: any,
  type: string
): Promise<any> => {
  const token = await AsyncStorage.getItem(stronkJWTKeyname);
  try {
    const response = await axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        data: {
          attributes: data,
          type,
        },
      },
    });

    const responseObject = response.data.data;

    /**
     * when fetching data from database you also have relationships key
     * so overall it looks like this
     * data: {
     *  attributes: {
     *      title: "",
     *      description: "",
     *        ....
     *  },
     *  relationships: {
     *    exercises: {
     *       data: {
     *         ...
     *       }
     *    }
     *  }
     * }
     *
     * so what we have to do is to like move everything in relationships
     * to exercises, i think i will just do this in the backend, in the next PR
     * lets solve this issue
     */
    // const relationships =
    //   Object.keys(responseObject.relationships).map((relationship) => {
    //     return relationship;
    //   }) || {};
    // console.log(responseObject);
    return {
      ...responseObject.attributes,
      id: responseObject.id,
    };
  } catch (err) {
    // return the statusCode and the message of the error
    // from the error response object.
    return {
      statusCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

class SendApiRequest {
  /**
   * Authentication
   */
  async me() {
    return createAxiosRequest("GET", "/me", null, "user");
  }

  async login(email: string, password: string) {
    return createAxiosRequest(
      "POST",
      "/user/login",
      { email, password },
      "auth"
    );
  }

  async register(email: string, username: string, password: string) {
    return createAxiosRequest(
      "POST",
      "/user/register",
      { email, username, password },
      "user"
    );
  }

  async logout() {
    return createAxiosRequest("GET", "/user/logout", {}, "user");
  }

  async googleAuth() {
    const response = await Google.logInAsync(googleConfig);
    return createAxiosRequest(
      "POST",
      "/user/google/authorize",
      { ...response },
      "auth"
    );

  }

  /**
   * Routines
   */
  async fetchRoutines() {
    return createAxiosRequest("GET", "/routine", {}, "routine");
  }

  async fetchRoutine(routineId: string) {
    return createAxiosRequest("GET", `/routine?id=${routineId}`, {}, "routine");
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
      },
      "routine"
    );
  }

  async updateRoutine(
    routineId: string,
    title?: string,
    description?: string
    // exercises?: ExerciseProps[]
  ) {
    return createAxiosRequest(
      "PUT",
      `/routine?id=${routineId}`,
      {
        title,
        description,
        // exercises,
      },
      "routine"
    );
  }

  async deleteRoutine(routineId: string) {
    return createAxiosRequest(
      "DELETE",
      `/routine?id=${routineId}`,
      {},
      "routine"
    );
  }

  async pushExerciseIntoRoutine(routineId: string, exerciseId: string) {
    return createAxiosRequest(
      "POST",
      ``,
      {
        routineId,
        exerciseId,
      },
      "routine"
    );
  }

  async popExerciseFromRoutine(routineId: string, exerciseId: string) {
    return createAxiosRequest(
      "POST",
      ``,
      {
        routineId,
        exerciseId,
      },
      "routine"
    );
  }

  /**
   * Exercises
   */
  async fetchExercises() {
    return createAxiosRequest("GET", "/exercises", {}, "exercise");
  }

  async fetchExercise(exerciseId: string) {
    return createAxiosRequest(
      "GET",
      `/exercise?id=${exerciseId}`,
      {},
      "exercise"
    );
  }

  async addExercise(name: string, sets: number, reps: number) {
    return createAxiosRequest(
      "POST",
      "/exercise",
      {
        name,
        sets,
        reps,
      },
      "exercise"
    );
  }

  async updateExercise(
    exerciseId: string,
    name?: string,
    sets?: number,
    reps?: number
  ) {
    return createAxiosRequest(
      "PUT",
      `/exercise?id=${exerciseId}`,
      {
        name,
        sets,
        reps,
      },
      "exercise"
    );
  }

  async deleteExercise(exerciseId: string) {
    return createAxiosRequest(
      "DELETE",
      `/exercise?id=${exerciseId}`,
      {},
      "exercise"
    );
  }

  /*
   * Images
   */
  async fetchImage(imageId: string) {
    return createAxiosRequest(
      "POST",
      `/file/image?id=${imageId}`,
      {},
      "image"
    )
  }

  async uploadImage(fileUri: string) {
    // async uploadImage(image: any) {
    const token = await AsyncStorage.getItem(stronkJWTKeyname);
    // const response = await axios({
    //   method,
    //   url,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   data: {
    //     data: {
    //       attributes: data,
    //       type,
    //     },
    //   },
    // });
    return FileSystem.uploadAsync(
      baseUrl + "/file/image",
      fileUri,
      {
        "headers": {
          "Content-Type": "image/jpeg",
          // "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        "httpMethod": "POST",
        "sessionType": FileSystem.FileSystemSessionType.BACKGROUND,
        "uploadType": FileSystem.FileSystemUploadType.BINARY_CONTENT,
      }
    )
    // return createAxiosRequest(
    //   "POST",
    //   "/file/image",
    //   { image },
    //   "image"
    // )
  }

  async deleteImage(imageId: string) {
    return createAxiosRequest(
      "DELETE",
      `/file/image?id=${imageId}`,
      {},
      "image"
    )
  }

}

export const fromApi = new SendApiRequest();
