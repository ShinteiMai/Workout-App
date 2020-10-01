import React from "react";
import {
  Button,
  Surface,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { Formik } from "formik";
import { axios, fromApi } from "../../axios";
import { useDispatch } from "react-redux";
import { addRoutine } from "../../features/routinesSlice";

interface Props {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRoutine: React.FC<Props> = ({ setIsAdding }) => {
  const dispatch = useDispatch();
  return (
    <Surface>
      <Title>Add Routine</Title>
      <Formik
        onSubmit={async (values) => {
          console.log(values);
          dispatch(addRoutine(
            { ...values }
          ))
          setIsAdding(false);
        }}
        initialValues={{
          title: "",
          description: "",
          duration: 0,
          exercises: [],
        }}
      >
        {({ errors, handleSubmit, values, handleChange }) => (
          <Surface>
            <Surface>
              <TextInput
                mode="outlined"
                label="title"
                value={values.title}
                onChangeText={handleChange("title")}
              />
              <Paragraph>{errors.title ? errors.title : null}</Paragraph>

              <TextInput
                mode="outlined"
                label="description"
                value={values.description}
                onChangeText={handleChange("description")}
              />
              <Paragraph>{errors.description ? errors.description : null}</Paragraph>

              <TextInput
                mode="outlined"
                label="duration"
                value={values.duration}
                onChangeText={handleChange("duration")}
              />
              <Paragraph>{errors.duration ? errors.duration : null}</Paragraph>
              {/* <TextInput
                mode="outlined"
                label="exercises"
                value={values.exercises}
                onChangeText={handleChange("exercises")}
              />
              <Paragraph>{errors.exercises ? errors.exercises : null}</Paragraph> */}
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

export default AddRoutine;