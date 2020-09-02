import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Button,
  List,
  Surface,
  Title,
  Paragraph,
  Card,
} from "react-native-paper";
import { Formik } from "formik";
import { axios } from "../../axios";

import ExerciseList from "../../components/Exercises/ExerciseList";
import AddExercise from "../../components/Exercises/AddExercise";
import UpdateExercise from "../../components/Exercises/UpdateExercise";
import { ExerciseProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExercises,
  selectExercisesStatus,
} from "../../features/exercisesSlice";
import { reduxStatus } from "../../features/types";

type ExercisesProps = ExerciseProps[];

interface fetchExercisesProps {
  setExercises: React.Dispatch<React.SetStateAction<ExercisesProps>>;
}
const Exercises: React.FC = () => {
  const dispatch = useDispatch();

  const [currentDisplay, setCurrentDisplay] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [currentExercise, setCurrentExercise] = useState<ExerciseProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { status } = useSelector(selectExercisesStatus);

  useEffect(() => {
    if (status === reduxStatus.idle) {
      dispatch(fetchExercises());
    }
  }, []);

  if (status === reduxStatus.loading) {
    return (
      <Surface>
        <Paragraph>LOADING</Paragraph>
      </Surface>
    );
  }

  let display: JSX.Element;
  if (isUpdating) {
    display = (
      <UpdateExercise
        exercise={currentExercise}
        setIsUpdating={setIsUpdating}
      />
    );
  } else if (isAdding) {
    display = <AddExercise setIsAdding={setIsAdding} />;
  }

  return (
    <Layout>
      <Title>Exercises</Title>
      <Button
        onPress={() => {
          setIsAdding(true);
        }}
      >
        Add a new exercise
      </Button>
      {!isUpdating && !isAdding ? (
        <ExerciseList
          setIsUpdating={setIsUpdating}
          setCurrentExercise={setCurrentExercise}
        />
      ) : (
        display
      )}
    </Layout>
  );
};

export default Exercises;
