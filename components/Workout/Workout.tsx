import React, { useState } from "react";

import { View, Text } from "../Themed";
import { Button, StyleSheet } from "react-native";

import Info from "./components/Info";
import Timer from "../Timer";

export interface WorkoutProps {
  name: string;
  sets: number;
  reps: number;
}

const Workout: React.FC = () => {
  const [workouts, setWorkouts] = useState<WorkoutProps[]>([
    {
      name: "Burpees",
      sets: 3,
      reps: 8,
    },
    {
      name: "Crunches",
      sets: 4,
      reps: 10,
    },
    {
      name: "Bench Press",
      sets: 5,
      reps: 12,
    },
  ]);
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutProps>(
    workouts[0]
  );
  const [showWorkout, setShowWorkout] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);

  let timer: JSX.Element;
  let finishSetButton: JSX.Element;

  timer = (
    <View style={styles.timer}>
      <Timer
        countdown={5}
        finishHandler={() => {
          setIsResting((prevValue) => {
            return !prevValue;
          });
        }}
      />
    </View>
  );

  finishSetButton = (
    <Button
      title="Finish current set"
      onPress={() => {
        setCurrentSet(currentSet + 1);
        setIsResting((prevValue) => {
          return !prevValue;
        });
      }}
    />
  );

  // * EDIT VIEW DASHBOARD DISINI
  return (
    <View style={styles.container}>
      <View style={styles.startButton}>
        <Button
          title={showWorkout ? "Stop Workout" : "Start Workout"}
          onPress={() => {
            setIsResting(false);
            setCurrentSet(1);
            setShowWorkout(!showWorkout);
          }}
        />
      </View>

      {showWorkout ? (
        <View>
          <Info currentWorkout={currentWorkout} currentSet={currentSet} />
          {!isResting ? finishSetButton : null}
          {isResting ? timer : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
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
  startButton: {
    marginVertical: 30,
  },
});

export default Workout;
