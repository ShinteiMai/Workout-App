import React, { useState } from "react";
import { StyleSheet, Button } from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Timer from "../components/Timer";
// import CountDown from 'react-native-countdown-component';

export default function TabOneScreen() {
  const [currentWorkout, setWorkout] = useState({
    exercise: {
      name: "Burpees",
      sets: 3,
      reps: 8,
    },
  });
  const [showWorkout, setShowWorkout] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);

  let workout: JSX.Element;
  let exercise: JSX.Element;
  let timer: JSX.Element;
  let displaySet: JSX.Element;

  timer = (
    <View style={styles.timer}>
      <Timer
        countdown={5}
        finishHandler={() => {
          console.log(
            "Nanti kalo misalnya timernya selesai taruh logicnya disini"
          );
          setIsResting((prevValue) => {
            return !prevValue;
          });
        }}
      />
    </View>
  );

  exercise = (
    <View>
      <Text>Exercise name: {currentWorkout.exercise.name}</Text>
      <Text>
        Sets/Reps: {currentWorkout.exercise.sets}x{currentWorkout.exercise.reps}
      </Text>
    </View>
  );

  displaySet = (
    <View>
      <Text>Current Set: {currentSet}</Text>
    </View>
  );

  workout = (
    <View>
      {exercise}
      {displaySet}
      <Button
        title="Finish current set"
        onPress={() => {
          setCurrentSet(currentSet + 1);
          setIsResting((prevValue) => {
            return !prevValue;
          });
        }}
      />
      {isResting ? timer : null}
    </View>
  );

  let buttonTitle = "Stop Workout";
  if (!showWorkout) buttonTitle = "Start Workout";

  // * EDIT VIEW DASHBOARD DISINI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout App by Endoza</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Button
        title={buttonTitle}
        onPress={() => {
          setIsResting(false);
          setCurrentSet(1);
          setShowWorkout(!showWorkout);
        }}
      />

      {/* Munculinnya di sini, pake ternary operator (boolean statement) ? (kalo true outputnya apa) : (kalo false outputnya apa) */}
      {showWorkout ? workout : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  timer: {
    marginVertical: 30,
  },
});
