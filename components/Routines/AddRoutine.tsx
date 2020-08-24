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

interface Props {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRoutine: React.FC<Props> = ({ setIsAdding }) => {
  return (
    <Surface>
      <Title>Add Routine</Title>
      <Formik
        onSubmit={async (values) => {
          try {
            const response = await axios({
              method: "POST",
              url: "/routine",
              data: values,
            });

            if (response && response.data) {
              console.log(response.data);
              setIsAdding(false);
            }
          } catch (err) {
            console.log(err);
          }
        }}
        initialValues={{
          title: "",
          description: "",
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
              <Paragraph>
                {errors.description ? errors.description : null}
              </Paragraph>
            </Surface>

            <Button onPress={handleSubmit}>Add Routine</Button>
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
