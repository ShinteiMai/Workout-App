import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Image, View } from "react-native";
import {
  Button,
  Surface,
  Text,
  Title,
} from "react-native-paper";

import LoginForm from "../../components/Auth/LoginForm";
import Layout from "../../components/Layout";
import { AuthScreenProp } from "../index";

import Auth from "../../components/Auth/Auth";

import { useDispatch, useSelector } from "react-redux";
import { login, selectUserStatus } from "../../features/userSlice";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

interface ModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthProps {
  navigation: AuthScreenProp;
}

const LoginScreen: React.FC<AuthProps> = ({ navigation }) => {
  const { status } = useSelector(selectUserStatus);

  return (
    <Layout>
      <View style={styles.container}>
        <Surface style={styles.content}>
          <View style={styles.titleContainer}>
            <Title >Welcome Back!</Title>
          </View>
          <LoginForm navigation={navigation} />
          <View style={styles.margin}>
            <Button
              contentStyle={styles.buttonBody}
              labelStyle={styles.buttonText2}
              onPress={() => { navigation.navigate("Register") }}
            >
              Don't have an account ? Signup
            </Button>
          </View>
        </Surface>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // paddingTop: height,
    // marginTop: height / 4,
  },
  content: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    paddingTop: height / 7,
    paddingBottom: height / 3.5,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height / 7,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 10,
  },
  buttonBody: {
    // marginHorizontal: 0,
    // paddingVertical: 10
  },
  buttonText1: {
    // marginVertical: 10,
    color: "#ffffff",
    fontSize: 12,
  },
  buttonText2: {
    color: "#000000",
    fontSize: 12,
  },
  margin: {
    marginVertical: 10,
    marginHorizontal: width / 10,
  }
  //   title: {
  //     fontSize: 20,
  //     fontWeight: "bold",
  //   },
  //   link: {
  //     marginTop:3.5,
  //     paddingVertical: 15,
  //   },
  //   linkText: {
  //     fontSize: 14,
  //     color: "#2e78b7",
  //   },
});

export default LoginScreen;
