import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

/* Screens */
import Home from "./screens/Home";
import Routines from "./screens/Routines";
import Exercises from "./screens/Exercises";

/* Screen Prop Types */
import { BottomTabParamList } from "../types";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { RootScreenProp } from ".";

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

type Prop = {
  navigation: RootScreenProp;
};

const BottomTabNavigator: React.FC<Prop> = ({ navigation }) => {
  const user = useSelector(selectUser);

  if (user.id && user.email) {
    navigation.navigate("Root");
  }

  return (
    <BottomTab.Navigator initialRouteName="Home">
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
      <BottomTab.Screen
        name="Exercises"
        component={Exercises}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-calendar" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: 0 }} {...props} />;
}

export default BottomTabNavigator;
