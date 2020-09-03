import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUserStatus } from "../../features/userSlice";

import Colors from "../../constants/Colors";
import { RootStackParamList } from "../../types";

import { Button, Surface, Text, TextInput, Title } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { reduxStatus } from "../../features/types";

interface values {
  email: string;
  password: string;
}

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const LoginForm: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectUserStatus);

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
    dispatch(
      login({
        ...values,
      })
    );
    if (status === reduxStatus.success) {
      navigation.navigate("Root");
    }
  };
  return (
    <Surface style={styles.container}>
      {/* <Title style={styles.title}>LOGIN</Title> */}
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
              <Button
                onPress={() => {
                  values.email = "megumin@gmail.com";
                  values.password = "1234567";
                }}
              >
                Megumin is flat
              </Button>
              <Button
                onPress={() => {
                  values.email = "Nezuko@Nezuko.com";
                  values.password = "Nezuko";
                }}
              >
                Dont lewd nezuko bro
              </Button>
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
                color={errors ? "#888888" : "#7ac7bf"}
                labelStyle={{ color: "#ffffff" }}
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

export default LoginForm;
