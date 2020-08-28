import React from "react";
import { AsyncStorage } from "react-native";
import jwtDecode from "jwt-decode";
import { axios } from "../../axios";

interface Props {
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      email: string;
    }>
  >;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CheckAuthStatus = async ({ setUser, setIsAuth }: Props) => {
  AsyncStorage.getItem("jwt")
    .then((token) => {
      return axios({
        method: "POST",
        url: "/me",
        headers: {
          Authorization: `Bearer ${String(token)}`,
        },
      });
    })
    .then((response) => {
      console.log("User: ");
      console.log(response);
      console.log(response.data);
      if (response.data) {
        const user = response.data;
        setUser(user);
        setIsAuth(true);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
