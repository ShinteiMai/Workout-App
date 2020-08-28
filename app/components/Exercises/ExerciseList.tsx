import React from "react";
import { Button, List, Paragraph, Card } from "react-native-paper";
import { Formik } from "formik";
import { axios } from "../../axios";
import { ExercisesProps, ExerciseProps } from "./Exercises";

interface Props {
  exercises: ExercisesProps;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentExercise: React.Dispatch<React.SetStateAction<ExerciseProps>>;
}

const ExerciseList: React.FC<Props> = ({
  exercises,
  setIsUpdating,
  setCurrentExercise,
}) => {
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
              try {
                const response = await axios({
                  method: "DELETE",
                  url: "/exercise",
                  data: {
                    id: exercise.id,
                  },
                });

                if (response && response.data) {
                  console.log(response.data.message);
                }
              } catch (err) {
                console.log(err);
              }
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
