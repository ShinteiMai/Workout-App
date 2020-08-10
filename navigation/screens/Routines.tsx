import React, { useState, useContext } from "react";
import { View, Text } from "../../components/Themed";
import { RoutinesContext } from "../RoutinesContext";
import { Button, List, Title, Paragraph } from "react-native-paper";

export interface WorkoutProps {
  name: string;
  sets: number;
  reps: number;
}

export interface RoutineProps {
  title: string;
  desc: string;
  exercises: WorkoutProps[];
}

const Routines: React.FC = () => {
  const routines = useContext(RoutinesContext);
  return (
    <View>
      <Title>Routines</Title>
      <List.Section>
        {routines.map((routine, index) => (
          <List.Accordion title={routine.title} key={`routine-${index}`}>
            <Paragraph>{routine.desc}</Paragraph>
            {routine.exercises.map((exercise, index) => {
              return (
                <List.Item
                  key={`item-${exercise}-${index}`}
                  title={`Exercise ${index + 1}: ${exercise.name}`}
                  description={`Reps x Sets: ${exercise.reps}x${exercise.sets}`}
                />
              );
            })}
            <Button onPress={() => {}}>Select {routine.title}</Button>
          </List.Accordion>
        ))}
      </List.Section>
    </View>
  );
};

export default Routines;
