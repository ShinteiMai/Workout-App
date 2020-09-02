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
import { ExerciseProps } from '../../types';

type ExercisesProps = ExerciseProps[];

interface fetchExercisesProps {
  setExercises: React.Dispatch<React.SetStateAction<ExercisesProps>>;
}

const fetchExercises = async ({ setExercises }: fetchExercisesProps) => {
  const response = await axios({
    method: "GET",
    url: "/exercises",
  });
  if (response && response.data) setExercises(response.data.exercises);
};

const Exercises: React.FC = () => {
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [exercises, setExercises] = useState<ExercisesProps>([]);
  const [currentExercise, setCurrentExercise] = useState<ExerciseProps>();

  useEffect(() => {
    fetchExercises({ setExercises });
  }, []);

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
          exercises={exercises}
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
