import React from "react";
import { View, Text } from "../../Themed";
import { WorkoutProps } from "../Workout";
import { StyleSheet } from "react-native";

interface Props {
  currentWorkout: WorkoutProps;
  currentSet: number;
}

const Info: React.FC<Props> = ({ currentWorkout, currentSet }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Exercise name: {currentWorkout.name}</Text>
        <Text>
          Sets/Reps: {currentWorkout.sets}x{currentWorkout.reps}
        </Text>
      </View>
      <View>
        <Text>Current Set: {currentSet}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 15,
  },
});

export default Info;
