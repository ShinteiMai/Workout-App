import React, { useState, useContext } from "react";

import { StyleSheet } from "react-native";

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
import { isLoadingContext } from "../../Contexts/isLoadingContext";

import { axios } from "../../axios";
import { Message, Timer } from "../../constants/loading";

interface values {
  // username: string;
  email: string;
  password: string;
}

interface Props { }

const Register: React.FC<Props> = () => {
  const { id, email } = useContext(UserContext);
  const { setIsLoading, setIsLoadingMessage } = useContext(isLoadingContext);

  const validateSchema = Yup.object().shape({
    // username: Yup.string().label("Username").required("Enter a username"),
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
    axios({
      method: "POST",
      url: "/ping",
    })
      .then((res) => {

        setIsLoading(true);
        setIsLoadingMessage(Message.send);

      })
      .then((res) => {

        setTimeout(() => { }, Timer.medium);

        return axios({
          method: "POST",
          url: "/register",
          data: values,
        })

      })
      .then((res) => {
        setIsLoadingMessage(Message.success);
        setTimeout(() => {
          setIsLoadingMessage(Message.reset);
        }, Timer.long);
        setTimeout(() => {
          setIsLoading(false);
        }, Timer.short);
        console.log(res);
      })
      .catch((err) => {
        setIsLoadingMessage(Message.error);
        setTimeout(() => {
          setIsLoadingMessage(Message.reset);
        }, Timer.long);
        setTimeout(() => {
          setIsLoading(false);
        }, Timer.short);
        console.log(err);
      });
  };

  return (
    <Surface style={styles.container}>
      <Title style={styles.title}>REGISTER</Title>
      <Surface>
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
            <Surface style={styles.form}>
              {/* <TextInput
                mode="outlined"
                label="Username"
                value={values.username}
                onChangeText={handleChange("username")}
              />
              <Text>{errors.username}</Text> */}
              <TextInput
                mode="outlined"
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
              />
              <Text>{errors.email ? errors.email : " "}</Text>
              <TextInput
                mode="outlined"
                label="Password"
                value={values.password}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
              />
              <Text>{errors.password ? errors.password : " "}</Text>
              <Button
                icon="account-plus"
                mode="contained"
                onPress={handleSubmit}
              >
                Register
              </Button>
            </Surface>
          )}
        </Formik>
      </Surface>
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
});

export default Register;
