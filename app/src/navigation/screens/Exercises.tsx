import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Button, Surface, Title, Paragraph } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchExercises,
  selectExercisesStatus,
} from "../../features/exercisesSlice";
import { reduxStatus } from "../../features/types";

const Exercises: React.FC = () => {
  const dispatch = useDispatch();

  const [isAdding, setIsAdding] = useState<boolean>(false);
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

  // let display: JSX.Element;
  // if (isUpdating) {
  //   display = (
  //     <UpdateExercise
  //       exercise={currentExercise}
  //       setIsUpdating={setIsUpdating}
  //     />
  //   );
  // } else if (isAdding) {
  //   display = <AddExercise setIsAdding={setIsAdding} />;
  // }

  return (
    <Layout>
      <Title>Exercises WIP (WORK IN PROGRESS)</Title>
      <Button
        onPress={() => {
          setIsAdding(true);
        }}
      >
        Add a new exercise
      </Button>
      {/* {!isUpdating && !isAdding ? (
        <ExerciseList
          setIsUpdating={setIsUpdating}
          setCurrentExercise={setCurrentExercise}
        />
      ) : (
        display
      )} */}
    </Layout>
  );
};

export default Exercises;
