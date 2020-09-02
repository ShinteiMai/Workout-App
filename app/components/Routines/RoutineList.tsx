import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RoutineProps } from '../../types';
import { deleteRoutine, selectRoutines } from '../../features/routinesSlice';
import { Surface, Title, Button, List, Paragraph } from "react-native-paper";

interface Props {
  setCurrentRoutine: React.Dispatch<React.SetStateAction<RoutineProps>>;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoutineList: React.FC<Props> = ({
  setIsUpdating,
  setCurrentRoutine,
}) => {
  const dispatch = useDispatch();
  const { routines } = useSelector(selectRoutines);
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
            <Button onPress={() => {
              setCurrentRoutine(routine);
              setIsUpdating(true);
            }}>
              Update {routine.title}
            </Button>

            <Button onPress={() => {
              dispatch(deleteRoutine({ routineId: routine.id }))
            }}>
              Delete {routine.title}
            </Button>

            <Button onPress={() => { }}>Select {routine.title}</Button>

          </List.Accordion>
        ))}
      </List.Section>
    </Surface>
  );
};

export default RoutineList;
