import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import { ColorSchemeName } from "react-native";

import SplashScreen from "./screens/SplashScreen";
import AuthScreen from "./screens/AuthScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import { AuthParamsList, RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { isAuthContext } from "../Contexts/isAuthContext";

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
      {/* <AuthNavigator /> */}
      <RootNavigator />
      {/* {createAppContainer(App)} */}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
// const Auth = createStackNavigator<AuthParamsList>();
const Stack = createStackNavigator<RootStackParamList>();

// const AuthNavigator: React.FC = () => {
//   return (
//     <Auth.Navigator screenOptions={{ headerShown: false }}>
//       <Auth.Screen
//         name="Auth"
//         component={AuthScreen}
//         options={{ title: "Let's Auth" }}
//       />
//     </Auth.Navigator>
//   );
// };

export type SplashScreenProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;
export type AuthScreenProp = StackNavigationProp<RootStackParamList, "Auth">;

const RootNavigator: React.FC = () => {
  const { isAuth, setIsAuth } = useContext(isAuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(isAuth);

  if (!isLoaded) {
    return <SplashScreen setIsLoaded={setIsLoaded} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuth ? (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
    </Stack.Navigator>
  );
};

// const Application = createSwitchNavigator({
//   SplashScreen: {
//     screen: SplashScreen,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   Auth: {
//     screen: AuthNavigator,
//   },
//   DrawerNavigationRoutes: {
//     screen: BottomTabNavigator,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
// });

// export default createAppContainer(Application);
