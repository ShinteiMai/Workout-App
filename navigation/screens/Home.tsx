import React, { useState, useContext } from "react";

/* Components */
/* Kalo kita mau pake component harus import dulu */
import { StyleSheet, Button } from "react-native";
import { View, Text } from "../../components/Themed";
import { RoutinesContext } from "../RoutinesContext";

/* React Component */
const Home = () => {
  /* 1. State */
  const routines = useContext(RoutinesContext);

  /* 2. Logic */

  /* 3. Render */
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

      <View>
        <Text>Select ur damn routine nigga</Text>
        {routines.map((routine, index) => {
          return (
            <Button title={"Select " + routine.title} onPress={() => {}} />
          );
        })}

        {/* <Button title="Routine 1" onPress={() => {}} />
        <Button title="Routine 2" onPress={() => {}} />
        <Button title="Routine 3" onPress={() => {}} /> */}
      </View>
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

export default Home;
