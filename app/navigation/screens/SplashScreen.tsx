import React, { useState, useEffect, useContext } from "react";

import logo from "../../assets/images/splash2.png";
import { isAuthContext } from "../../components/Contexts/isAuthContext";

import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
  Image,
} from "react-native";

interface Props {
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const SplashScreen: React.FC<Props> = ({ setIsLoaded }) => {
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      setIsLoaded(true);
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#307ecc",
    backgroundColor: "#000000",
  },
  logo: {
    width: "90%",
    resizeMode: "contain",
    margin: 30,
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});

export default SplashScreen;
