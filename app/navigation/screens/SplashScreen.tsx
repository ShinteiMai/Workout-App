import React, { useState, useEffect } from "react";

import Decor1Svg from "../../assets/images/decor1.svg";
import Decor2Svg from "../../assets/images/decor2.svg";
import logo from "../../assets/images/logo.png";

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
      <View style={styles.decor}>
        <Decor1Svg style={[styles.decor, styles.left]} />
        <Decor2Svg style={styles.decor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    margin: 30,
  },
  decor: {
    position: "absolute",
    bottom: 0,
  },
  left: {
    right: 0,
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});

export default SplashScreen;
