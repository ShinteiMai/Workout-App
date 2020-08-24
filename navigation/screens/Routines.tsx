import React, { useContext, useEffect, useState } from "react";
import { View } from "../../components/Themed";
import { RoutinesContext } from "../../components/Contexts/RoutinesContext";
import Layout from "../../components/Layout";
import RoutineList from "../../components/Routines/RoutineList";
import { Surface, Button } from "react-native-paper";
import AddRoutine from "../../components/Routines/AddRoutine";
import { fetchRoutines } from "../BottomTabNavigator";
import UpdateRoutine from "../../components/Routines/UpdateRoutine";

export interface WorkoutProps {
  id: string;
  name: string;
  sets: number;
  reps: number;
}

export interface RoutineProps {
  id: string;
  title: string;
  description: string;
  exercises: WorkoutProps[];
}

const Routines: React.FC = () => {
  const { setRoutines } = useContext(RoutinesContext);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [currentRoutine, setCurrentRoutine] = useState<RoutineProps>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    fetchRoutines(setRoutines);
  }, [isAdding, isUpdating, isDeleting]);

  let display: JSX.Element = (
    <View>
      <RoutineList
        setCurrentRoutine={setCurrentRoutine}
        setIsUpdating={setIsUpdating}
        setIsDeleting={setIsDeleting}
      />
      <Surface>
        <Button
          onPress={() => {
            setIsAdding(true);
          }}
        >
          Add a new Routine
        </Button>
      </Surface>
    </View>
  );

  if (isAdding) {
    display = <AddRoutine setIsAdding={setIsAdding} />;
  } else if (isUpdating) {
    display = (
      <UpdateRoutine routine={currentRoutine} setIsUpdating={setIsUpdating} />
    );
  }

  return <Layout>{display}</Layout>;
};

export default Routines;
