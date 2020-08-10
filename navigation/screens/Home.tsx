import React, { useState, useContext } from "react";

import { StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";
import { RoutinesContext } from "../RoutinesContext";
import { Title } from "react-native-paper";
import SelectRoutine from "../../components/SelectRoutine";
import Workout from "../../components/Workout/Workout";

const Home = () => {
  const routines = useContext(RoutinesContext);

  const [hasWorkoutStarted, setHasWorkoutStarted] = useState<Boolean>(false);
  const [selectedRoutine, setSelectedRoutine] = useState<number>(0);

  return (
    <View>
      <View>
        <Title>Workout App by Endoza</Title>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {hasWorkoutStarted ? (
          <Workout
            routine={routines[selectedRoutine]}
            finishHandler={() => {
              setHasWorkoutStarted(false);
            }}
          />
        ) : (
          <SelectRoutine
            routines={routines}
            startHandler={(routineIndex: number) => {
              setSelectedRoutine(routineIndex);
              setHasWorkoutStarted(true);
            }}
          />
        )}
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
