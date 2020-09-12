import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { ColorSchemeName } from "react-native";

// Screens
import SplashScreen from "./screens/SplashScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
// New Screens
import LoginAndRegisterScreen from "./screens/LoginAndRegister";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";

import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
// const Auth = createStackNavigator<AuthParamsList>();
const Stack = createStackNavigator<RootStackParamList>();

export type SplashScreenProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;
export type AuthScreenProp = StackNavigationProp<RootStackParamList, "Auth">;
export type RootScreenProp = StackNavigationProp<RootStackParamList, "Root">;
const RootNavigator: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return <SplashScreen setIsLoaded={setIsLoaded} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={LoginAndRegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
      />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};
