import React, { useEffect, useState, useContext } from "react";
import { Surface, Title, Button, List, Paragraph } from "react-native-paper";
import { RoutinesContext } from "../Contexts/RoutinesContext";
import { axios } from "../../axios";
import { RoutineProps } from "../../navigation/screens/Routines";

interface Props {
  setCurrentRoutine: React.Dispatch<React.SetStateAction<RoutineProps>>;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoutineList: React.FC<Props> = ({
  setIsDeleting,
  setCurrentRoutine,
  setIsUpdating,
}) => {
  const { routines } = useContext(RoutinesContext);

  return (
    <Surface>
      <Title>Routines</Title>
      <List.Section>
        {routines.map((routine, index) => (
          <List.Accordion title={routine.title} key={`routine-${index}`}>
            <Paragraph>{routine.description}</Paragraph>
            {routine.exercises.map((exercise, index) => {
              return (
                <List.Item
                  key={`item-${exercise}-${index}`}
                  title={`Exercise ${index + 1}: ${exercise.name}`}
                  description={`Reps x Sets: ${exercise.reps}x${exercise.sets}`}
                />
              );
            })}
            <Surface>
              <Button
                onPress={() => {
                  setCurrentRoutine(routine);
                  setIsUpdating(true);
                }}
              >
                Update Routine
              </Button>
              <Button
                onPress={async () => {
                  try {
                    setIsDeleting(true);
                    const response = await axios({
                      method: "DELETE",
                      url: "/routine",
                      data: {
                        id: routine.id,
                      },
                    });

                    if (response && response.data) {
                      setIsDeleting(false);
                      console.log(response.data.message);
                    }
                  } catch (err) {
                    setIsDeleting(false);
                    console.log(err);
                  }
                }}
              >
                Delete Routine
              </Button>
            </Surface>
            <Button onPress={() => {}}>Select {routine.title}</Button>
          </List.Accordion>
        ))}
      </List.Section>
    </Surface>
  );
};

export default RoutineList;
