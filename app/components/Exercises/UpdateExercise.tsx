import React from "react";
import {
  Button,
  Surface,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { Formik } from "formik";
import { axios } from "../../axios";
import { ExerciseProps } from "./Exercises";

interface Props {
  exercise: ExerciseProps;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateExercise: React.FC<Props> = ({ exercise, setIsUpdating }) => {
  return (
    <Surface>
      <Title>Update Exercise: {exercise.name}</Title>
      <Formik
        onSubmit={async (values) => {
          console.log(values);
          try {
            const response = await axios({
              method: "PUT",
              url: "/exercise",
              data: {
                ...values,
                id: exercise.id,
              },
            });

            if (response && response.data) {
              console.log(response.data);
              setIsUpdating(false);
            }
          } catch (err) {
            console.log(err);
          }
        }}
        initialValues={{
          name: exercise.name,
          sets: String(exercise.sets),
          reps: String(exercise.reps),
        }}
      >
        {({ errors, handleSubmit, values, handleChange }) => (
          <Surface>
            <Surface>
              <TextInput
                mode="outlined"
                label="name"
                value={values.name}
                onChangeText={handleChange("name")}
              />
              <Paragraph>{errors.name ? errors.name : " "}</Paragraph>

              <TextInput
                mode="outlined"
                label="sets"
                value={values.sets}
                onChangeText={handleChange("sets")}
              />
              <Paragraph>{errors.sets ? errors.sets : " "}</Paragraph>

              <TextInput
                mode="outlined"
                label="reps"
                value={values.reps as string}
                onChangeText={handleChange("reps")}
              />
              <Paragraph>{errors.reps ? errors.reps : " "}</Paragraph>
            </Surface>

            <Button onPress={handleSubmit}>Update Exercise</Button>
          </Surface>
        )}
      </Formik>
      <Button
        onPress={() => {
          setIsUpdating(false);
        }}
      >
        Cancel Update
      </Button>
    </Surface>
  );
};

export default UpdateExercise;
