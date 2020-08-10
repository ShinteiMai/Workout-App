import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

/* Screens */
import Home from "./screens/Home";

/* Screen Prop Types */
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  HomeParamList,
  RoutinesParamList,
} from "../types";
import Routines from "./screens/Routines";
import { RoutinesContext } from "./RoutinesContext";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const routines = [
    {
      title: "Noob",
      desc: "soys only",
      exercises: [
        {
          name: "Burpees",
          sets: 2,
          reps: 5,
        },
        {
          name: "Crunches",
          sets: 2,
          reps: 10,
        },
        {
          name: "Bench Press",
          sets: 3,
          reps: 12,
        },
      ],
    },
    {
      title: "Actually Zyzz",
      desc: "motherfuckin jacked",
      exercises: [
        {
          name: "literally lifting 69 women at the same time",
          sets: 6,
          reps: 9,
        },
      ],
    },
  ];

  return (
    <RoutinesContext.Provider value={routines}>
      <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      >
        <BottomTab.Screen
          name="Routines"
          component={Routines}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-code" color={color} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-code" color={color} />
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
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
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
