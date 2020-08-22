import React, { useState, useContext } from "react";
import { AsyncStorage } from "react-native";
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

import { UserContext } from "../Contexts/UserContext";
import { axios } from "../../axios";

interface values {
  email: string;
  password: string;
}

interface Props {}

const Login: React.FC<Props> = () => {
  const { id, email } = useContext(UserContext);

  const [visible, setVisible] = useState(false);

  const LoginModal = () => {
    return (
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal}>
            <Text>Login attempt failed</Text>
          </Modal>
        </Portal>
      </Provider>
    );
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
      })
      .catch((err) => {
        showModal();
        console.log(err);
      });
  };

  return (
    <Surface style={styles.container}>
      <Title style={styles.title}>LOGIN</Title>
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
              <TextInput
                mode="outlined"
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
              />
              <Text>{errors.email}</Text>
              <TextInput
                mode="outlined"
                label="Password"
                value={values.password}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
              />
              <Text>{errors.password}</Text>
              <Button
                icon="account-arrow-left"
                mode="contained"
                onPress={handleSubmit}
              >
                Login
              </Button>
            </Surface>
          )}
        </Formik>
      </Surface>
      {LoginModal}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
  },
  title: {
    left: 10,
  },
  form: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
});

export default Login;
