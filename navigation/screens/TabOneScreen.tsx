import React from "react";
import { StyleSheet } from "react-native";

import Workout from "../../components/Workout/Workout";
import { View, Text } from "../../components/Themed";

const TabOneScreen = () => {
  return (
    <View>
      <View>
        <Text style={styles.title}>Workout App by Endoza</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>
      <Workout />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default TabOneScreen;
