import Axios from "axios";
import { AsyncStorage } from "react-native";
import * as data from "./tools-buffer/localtunnel.json";

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
  try {
    const response = await axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      data
    });
    return response.data;
  } catch (err) {
    throw new Error;
  }
}

class SendApiRequest {
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
      "/login",
      { email, password },
    )
  };
  async register(email: string, password: string) {
    return createAxiosRequest(
      "POST",
      "/register",
      { email, password }
    )
  };
  async logout() {
    return createAxiosRequest(
      "GET",
      "/logout",
      {}
    )
  };

  async fetchRoutines() {
    return createAxiosRequest(
      "GET",
      "/routines",
      {}
    )
  }
};

export const fromApi = new SendApiRequest();