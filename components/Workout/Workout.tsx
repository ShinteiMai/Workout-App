import React, { useState } from "react";

import { View, Text } from "../Themed";
import { Button, StyleSheet } from "react-native";

import Info from "./components/Info";
import Timer from "../Timer";
import { RoutineProps } from "../../navigation/screens/Routines";

type Props = {
  routine: RoutineProps;
  finishHandler: () => void;
};

export interface WorkoutProps {
  name: string;
  sets: number;
  reps: number;
}

const Workout: React.FC<Props> = (props) => {
  const [workouts, setWorkouts] = useState<WorkoutProps[]>(
    props.routine.exercises
  );
  const [currentWorkout, setCurrentWorkout] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);

  const [showWorkout, setShowWorkout] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);

  if (
    currentSet > workouts[currentWorkout].sets &&
    currentWorkout < workouts.length
  ) {
    setCurrentSet(1);
    if (currentWorkout === workouts.length - 1) {
      console.log("Finished");
      setIsWorkoutFinished(true);
      props.finishHandler();
    } else {
      setCurrentWorkout(currentWorkout + 1);
    }
  }

  let timer: JSX.Element;
  let finishSetButton: JSX.Element;
  let workoutApp: JSX.Element;
  let finishedState: JSX.Element;

  timer = (
    <View style={styles.timer}>
      <Text>Rest Time!</Text>
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

  workoutApp = (
    <View>
      <View style={styles.startButton}>
        <Button
          title={showWorkout ? "Stop Workout" : "Start Workout"}
          onPress={() => {
            setIsResting(false);
            setCurrentWorkout(0);
            setCurrentSet(1);
            setShowWorkout(!showWorkout);
          }}
        />
      </View>

      {showWorkout ? (
        <View>
          <Info
            currentWorkout={workouts[currentWorkout]}
            currentSet={currentSet}
          />
          {!isResting ? finishSetButton : null}
          {isResting ? timer : null}
        </View>
      ) : null}
    </View>
  );

  finishedState = (
    <View>
      <Text>Congrats! You finished the exercise today :D</Text>
      <Button
        title="Workout again if you're a fucking chad"
        onPress={() => {
          setIsWorkoutFinished(false);
          setCurrentWorkout(0);
          setCurrentSet(1);
          setIsResting(false);
        }}
      />
    </View>
  );

  // * EDIT VIEW DASHBOARD DISINI
  return (
    <View style={styles.container}>
      {isWorkoutFinished ? finishedState : workoutApp}
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
