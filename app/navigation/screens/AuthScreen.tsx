import React, { useState } from "react";
import { Dimensions, StyleSheet, Image, View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Provider,
  Surface,
  Text,
} from "react-native-paper";

import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import Layout from "../../components/Layout";
import { AuthScreenProp } from "../index";
import { StackScreenProps } from "@react-navigation/stack";

import Auth from "../../components/Auth/Auth";
import logo from "../../assets/images/splash2.png";

import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

interface ModalProps { }

const MessageModal: React.FC<ModalProps> = ({ }) => {
  const [visible, setVisible] = useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <Text> attempt failed</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

interface AuthProps {
  navigation: AuthScreenProp;
}

const AuthScreen: React.FC<AuthProps> = ({ navigation }) => {
  const [currentDisplay, setCurrentDisplay] = useState(0);

  return (
    <Layout>
      <View style={styles.container}>
        <View>
          <MessageModal />
        </View>
        <Image source={logo} style={styles.logo} />
        <Surface style={styles.content}>
          {currentDisplay === 0 ? (
            <Login navigation={navigation} />
          ) : (
              <Register />
            )}
          <Button
            onPress={() => {
              setCurrentDisplay(currentDisplay === 0 ? 1 : 0);
            }}
          >
            <Text>
              {currentDisplay === 0
                ? "Don't have an account?\nRegister here"
                : "Already have an account? Login"}
            </Text>
          </Button>
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
  logo: {
    position: "absolute",
    width: "20%",
    height: "20%",
    resizeMode: "contain",
    marginHorizontal: height / 6,
    top: height / 20,
    // left: width / 2.7,
    zIndex: 1,
  },
  content: {
    paddingVertical: height / 3,
  },
  //   title: {
  //     fontSize: 20,
  //     fontWeight: "bold",
  //   },
  //   link: {
  //     marginTop: 15,
  //     paddingVertical: 15,
  //   },
  //   linkText: {
  //     fontSize: 14,
  //     color: "#2e78b7",
  //   },
});

export default AuthScreen;
