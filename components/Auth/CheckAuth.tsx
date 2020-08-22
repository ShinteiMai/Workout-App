import React from "react";
import { AsyncStorage } from "react-native";
import axios from "axios";
import jwt_decode from "jwt-decode";

interface Props {
  setUser: React.Dispatch<
    React.SetStateAction<{
      // id: string;
      // username: string;
      // email: string;
      // password: string;
    }>
  >;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CheckAuthStatus = async ({ setUser, setIsAuth }: Props) => {
  axios({
    method: "POST",
    url: "/me",
  }).then(async (res) => {
    if (AsyncStorage.getItem("jwt")) {
      const token = await AsyncStorage.getItem("jwt");
      const decoded = jwt_decode(token);
      setUser(decoded);
      setIsAuth(true);
    }
  });
};
