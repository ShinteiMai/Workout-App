import React, { useState, useContext } from "react";
import { AsyncStorage } from "react-native";
import { StyleSheet, View } from "react-native";
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

import { UserContext } from "../Contexts/UserContext";
import { isAuthContext } from "../Contexts/isAuthContext";
import { axios } from "../../axios";

interface values {
  email: string;
  password: string;
}

type LoginProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: LoginProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const { id, email } = useContext(UserContext);
  const { setIsAuth } = useContext(isAuthContext);

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .label("Email")
      .email("Enter valid email")
      .required("Enter a valid email"),
    password: Yup.string()
      .label("Password")
      .required("Enter a password")
      .min(6, "Password must have at least 6 characters"),
  });

  const submitHandler = (values: values) => {
    let self = this;
    axios({
      method: "POST",
      url: "/login",
      data: values,
    })
      .then((res) => {
        const jwt = res.data.jwt;
        console.log(res);
        console.log(jwt);

        AsyncStorage.setItem("jwt", jwt);
        if (res && res.data) {
          setIsAuth(true);
          navigation.navigate("Root");
        }
      })
      // .t//   if (res /    props.navigation.navi //; // })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Surface style={styles.container}>
      <Title style={styles.title}>LOGIN</Title>
      <View>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validateSchema}
          onSubmit={(values) => {
            submitHandler(values);
          }}
        >
          {({ values, handleSubmit, handleChange, errors }) => (
            <View style={styles.form}>
              <TextInput
                mode="outlined"
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                style={styles.input}
              />
              <Text>{errors.email ? errors.email : " "}</Text>
              <TextInput
                mode="outlined"
                label="Password"
                value={values.password}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                style={styles.input}
              />
              <Text>{errors.password ? errors.password : " "}</Text>
              <Button
                icon="account-arrow-left"
                mode="contained"
                onPress={handleSubmit}
              >
                Login
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </Surface>
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

export default Login;