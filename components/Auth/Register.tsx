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

import { UserContext } from "../Contexts/UserContext";
import { axios } from "../../axios";

interface values {
  // username: string;
  email: string;
  password: string;
}

interface Props {}

const RegisterModal: React.FC<Props> = () => {
  const [visible, setVisible] = useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <Text>Register attempt failed</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

const Register: React.FC<Props> = () => {
  const { id, email } = useContext(UserContext);

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
      url: "/register",
      data: values,
    })
      .then((res) => {
        // const { token } = res.data;
        // localStorage.setItem("jwtToken", token);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        return <RegisterModal />;
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
      <RegisterModal />
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

export default Register;
