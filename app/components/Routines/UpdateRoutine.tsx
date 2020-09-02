import React from "react";
import {
  Button,
  Surface,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from "formik";
import { RoutineProps } from "../../types";
import { axios, fromApi } from "../../axios";
import { updateRoutine } from "../../features/routinesSlice";

interface Props {
  routine: RoutineProps;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateRoutine: React.FC<Props> = ({ routine, setIsUpdating }) => {
  const dispatch = useDispatch();
  return (
    <Surface>
      <Title>Update routine: {routine.title}</Title>
      <Formik
        onSubmit={async (values) => {
          dispatch(updateRoutine({ ...values, routineId: routine.id }));
          setIsUpdating(false);
        }}
        initialValues={{
          title: routine.title,
          description: String(routine.description),
          exercises: []
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
              <Paragraph>{errors.title ? errors.title : " "}</Paragraph>
              <TextInput
                mode="outlined"
                label="description"
                value={values.description}
                onChangeText={handleChange("description")}
              />
              <Paragraph>{errors.description ? errors.description : " "}</Paragraph>
              {/* <TextInput
                mode="outlined"
                label="reps"
                value={values.exercises as string}
                onChangeText={handleChange("reps")}
              />
              <Paragraph>{errors.exercises ? errors.exercises : " "}</Paragraph> */}
            </Surface>

            <Button onPress={handleSubmit}>Update routine</Button>
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
    </Surface >
  );
};

export default UpdateRoutine;