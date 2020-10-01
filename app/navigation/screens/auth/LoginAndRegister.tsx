import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Image, View } from "react-native";
import { Button, Surface, Title, Text } from "react-native-paper";
import SvgUri from 'react-native-svg-uri';

import Layout from "../../../components/Layout";
import { AuthScreenProp } from "../../index";

import logo from "../../../assets/images/logo.png";
import Decor2Svg from "../../../assets/images/decor2.svg";

import { useDispatch, useSelector } from "react-redux";
import { login, googleAuth, selectUserStatus } from "../../../features/userSlice";

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

          <Decor2Svg fill="blue" style={styles.decor} />
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
  },
  decor: {
    zIndex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    transform: [{ rotate: "180deg" }]
  },
  logo: {
    position: "absolute",
    width: 120,
    height: 120,
    resizeMode: "contain",
    top: height / 10,
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  },
  buttonText1: {
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

});

export default LoginAndRegisterScreen;
