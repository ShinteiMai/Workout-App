import React, { useEffect, useState, useContext } from "react";
import { Surface, Title, Button, List, Paragraph } from "react-native-paper";
import { RoutinesContext } from "../Contexts/RoutinesContext";

interface Props {}

const RoutineList: React.FC<Props> = () => {
  const { routines } = useContext(RoutinesContext);

  return (
    <Surface>
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
    </Surface>
  );
};

export default RoutineList;
