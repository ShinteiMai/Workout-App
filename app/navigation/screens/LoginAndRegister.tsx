import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Image, View } from "react-native";
import { Button, Surface, Title, Text } from "react-native-paper";

import Layout from "../../components/Layout";
import { AuthScreenProp } from "../index";

import logo from "../../assets/images/splash2.png";

import { useDispatch, useSelector } from "react-redux";
import { login, googleAuth, selectUserStatus } from "../../features/userSlice";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

interface AuthProps {
  navigation: AuthScreenProp;
}

const LoginAndRegisterScreen: React.FC<AuthProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentDisplay, setCurrentDisplay] = useState(0);
  const { status } = useSelector(selectUserStatus);

  return (
    <Layout>
      <View style={styles.container}>
        <Surface style={styles.content}>
          <Image source={logo} style={styles.logo} />
          <Title>stronk</Title>
          <Text>became a chad today</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.margin}>
              <Button
                mode="contained"
                color={"#7ac7bf"}
                contentStyle={styles.buttonBody}
                labelStyle={styles.buttonText1}
                onPress={() => dispatch(googleAuth())}
              >
                Continue with Google
              </Button>
            </View>
            <View style={styles.margin}>
              <Button
                mode="contained"
                color={"#7ac7bf"}
                contentStyle={styles.buttonBody}
                labelStyle={styles.buttonText1}
                onPress={() => navigation.navigate("Register")}
              >
                Use Email Address
              </Button>
            </View>
            <View style={styles.margin}>
              <Button
                contentStyle={styles.buttonBody}
                labelStyle={styles.buttonText2}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                Already have an account? Login here
              </Button>
            </View>
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
  logo: {
    position: "absolute",
    width: 120,
    height: 120,
    resizeMode: "contain",
    // marginHorizontal: "auto",
    top: height / 10,
    // left: width / 2.7,
    zIndex: 1,
  },
  content: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: height,
    // marginTop: height / 4,
    paddingVertical: height / 3,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 10,
  },
  buttonColor: {
    color: "#7ac7bf",
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

export default LoginAndRegisterScreen;
