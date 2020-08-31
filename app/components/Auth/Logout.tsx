import React from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

import { RootStackParamList } from "../../types";

import { Button } from "react-native-paper";

interface values {
  email: string;
  password: string;
}

type LogoutScreenProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: LogoutScreenProp;
}

const Logout: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    dispatch(logout());
    navigation.navigate("Auth");
  };
  return (
    <View>
      <Button onPress={
        () => {
          dispatch(logout());
        }
      }>
        goblok
      </Button>
      <Button
        icon="account-arrow-left"
        mode="contained"
        onPress={logoutHandler}
      >
        Log Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
  },
  title: {
    // left: 10,
    textAlign: "center",
  },
  form: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    // paddingBottom: 15,
  },
});

export default Logout;
