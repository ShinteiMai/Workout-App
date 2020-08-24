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
import { RoutineProps } from "../../navigation/screens/Routines";

interface Props {
  routine: RoutineProps;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateRoutine: React.FC<Props> = ({ routine, setIsUpdating }) => {
  return (
    <Surface>
      <Title>Update Routine: {routine.title}</Title>
      <Formik
        onSubmit={async (values) => {
          console.log(values);
          try {
            const response = await axios({
              method: "PUT",
              url: "/routine",
              data: {
                ...values,
                id: routine.id,
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
          title: routine.title,
          description: routine.description,
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
              <Paragraph>
                {errors.description ? errors.description : " "}
              </Paragraph>
            </Surface>

            <Button onPress={handleSubmit}>Update Routine</Button>
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

export default UpdateRoutine;
