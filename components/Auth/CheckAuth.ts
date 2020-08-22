import React from "react";
import { AsyncStorage } from "react-native";
import axios from "axios";
import jwtDecode from "jwt-decode";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CheckAuthStatus = async ({ setUser, setIsAuth }: Props) => {
  await axios({
    method: "GET",
    url: "/auth/me",
  }).then(async (res) => {
    const token = await AsyncStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded) {
        setUser(decoded as string);
        setIsAuth(true);
      }
    }
  });
};
