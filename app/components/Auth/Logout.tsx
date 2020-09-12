import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserStatus } from "../../features/userSlice";

import { RootStackParamList } from "../../types";

import { Button } from "react-native-paper";
import { reduxStatus } from "../../features/types";

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
  const { status } = useSelector(selectUserStatus);

  useEffect(() => {
    if (status === `logout/${reduxStatus.success}`) {
      navigation.navigate("Auth");
    }
  });

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <View>
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
