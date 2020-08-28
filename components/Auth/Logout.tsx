import React, { useState, useContext } from "react";
import { AsyncStorage } from "react-native";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";

import Colors from "../../constants/Colors";
import { RootStackParamList } from "../../types";

import {
  Button,
  Modal,
  Portal,
  Provider,
  Surface,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import { UserContext } from "../../Contexts/UserContext";
import { isAuthContext } from "../../Contexts/isAuthContext";
import { axios } from "../../axios";

interface values {
  email: string;
  password: string;
}

type LogoutScreenProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: LogoutScreenProp;
}

const Logout: React.FC<Props> = ({ navigation }) => {
  const { id, email, setUser } = useContext(UserContext);
  const { setIsAuth } = useContext(isAuthContext);

  const logoutHandler = () => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        return axios({
          method: "GET",
          url: "/logout",
          headers: {
            Authorization: `Bearer ${res}`,
          },
        });
      })
      .then(async (res) => {
        await AsyncStorage.removeItem("jwt");

        setUser({ id: "", email: "" });
        setIsAuth(false);
        navigation.navigate("Auth");
      })
      .catch((err) => console.log(err));
  };

  return (
    <View>
      <Button
        icon="account-arrow-left"
        mode="contained"
        onPress={logoutHandler}
      >
        Log Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
  },
  title: {
    // left: 10,
    textAlign: "center",
  },
  form: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    // paddingBottom: 15,
  },
});

export default Logout;
