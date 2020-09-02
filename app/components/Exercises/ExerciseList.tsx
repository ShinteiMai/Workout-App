import React from "react";
import { Button, List, Paragraph, Card } from "react-native-paper";
import { Formik } from "formik";
import { axios } from "../../axios";
import { ExerciseProps } from "../../types";
import { useDispatch } from "react-redux";
import { deleteExercise } from "../../features/exercisesSlice"

interface Props {
  exercises: ExerciseProps[];
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentExercise: React.Dispatch<React.SetStateAction<ExerciseProps>>;
}

const ExerciseList: React.FC<Props> = ({
  exercises,
  setIsUpdating,
  setCurrentExercise,
}) => {
  const dispatch = useDispatch();
  return (
    <List.Section>
      {exercises.map((exercise) => (
        <Card key={exercise.id}>
          <Card.Title title={exercise.name} />
          <Card.Content>
            <Paragraph>Sets: {exercise.sets}</Paragraph>
            <Paragraph>Reps: {exercise.reps}</Paragraph>
          </Card.Content>
          <Button
            onPress={async () => {
              dispatch(deleteExercise({
                exerciseId: exercise.id
              }))
            }}
          >
            Delete Exercise
          </Button>
          <Button
            onPress={() => {
              setIsUpdating(true);
              setCurrentExercise(exercise);
            }}
          >
            Update Exercise
          </Button>
        </Card>
      ))}
    </List.Section>
  );
};

export default ExerciseList;
