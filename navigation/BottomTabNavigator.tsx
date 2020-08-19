import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

/* Screens */
import Home from "./screens/Home";

/* Screen Prop Types */
import { BottomTabParamList, HomeParamList, RoutinesParamList } from "../types";
import Routines from "./screens/Routines";
import { RoutinesContext } from "./RoutinesContext";
import { routines } from "../data/data.json";

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <RoutinesContext.Provider value={routines}>
      <BottomTab.Navigator
        initialRouteName="Home"
        // tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      >
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-home" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Routines"
          component={Routines}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-calendar" color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </RoutinesContext.Provider>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: 0 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const RoutinesStack = createStackNavigator<RoutinesParamList>();

function RoutinesNavigator() {
  return (
    <RoutinesStack.Navigator>
      <RoutinesStack.Screen
        name="RoutinesScreen"
        component={Routines}
        options={{ headerTitle: "Routines" }}
      ></RoutinesStack.Screen>
    </RoutinesStack.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerTitle: "Home" }}
      />
    </HomeStack.Navigator>
  );
}
