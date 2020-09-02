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
import { addExercise } from "../../features/exercisesSlice";
import { useDispatch } from "react-redux";

interface Props {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddExercise: React.FC<Props> = ({ setIsAdding }) => {
  const dispatch = useDispatch();
  return (
    <Surface>
      <Title>Add Exercise</Title>
      <Formik
        onSubmit={async (values) => {
          dispatch(addExercise({ ...values }));
          setIsAdding(false);
        }}
        initialValues={{
          name: "",
          sets: "",
          reps: "",
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
              <Paragraph>{errors.name ? errors.name : null}</Paragraph>

              <TextInput
                mode="outlined"
                label="sets"
                value={values.sets}
                onChangeText={handleChange("sets")}
              />
              <Paragraph>{errors.sets ? errors.sets : null}</Paragraph>

              <TextInput
                mode="outlined"
                label="reps"
                value={values.reps}
                onChangeText={handleChange("reps")}
              />
              <Paragraph>{errors.reps ? errors.reps : null}</Paragraph>
            </Surface>

            <Button onPress={handleSubmit}>Add Exercise</Button>
          </Surface>
        )}
      </Formik>
      <Button
        onPress={() => {
          setIsAdding(false);
        }}
      >
        Cancel
      </Button>
    </Surface>
  );
};

export default AddExercise;
