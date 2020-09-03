import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../features/userSlice";

import { StyleSheet } from "react-native";

import {
  Button,
  Surface,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

interface values {
  // username: string;
  email: string;
  password: string;
}

interface Props { }

const RegisterForm: React.FC<Props> = () => {
  const dispatch = useDispatch();

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

  const submitHandler = async (values: values) => {
    await dispatch(register({ ...values }));
  };

  return (
    <Surface style={styles.container}>
      {/* <Title style={styles.title}>REGISTER</Title */}
      <Surface>
        <Formik
          initialValues={{
            username: "",
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
                label="username"
                value={values.username}
                onChangeText={handleChange("username")}
              />
              <Text>{errors.username ? errors.username : " "}</Text>
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
                color={errors ? "#888888" : "#7ac7bf"}
                labelStyle={{ color: "#ffffff" }}
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
    marginHorizontal: 20,
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

export default RegisterForm;
