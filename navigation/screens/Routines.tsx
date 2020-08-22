import React, { useContext, useEffect } from "react";
import { View } from "../../components/Themed";
import { RoutinesContext } from "../../components/Contexts/RoutinesContext";
import Layout from "../../components/Layout";
import { fetchRoutines } from "./Home";
import RoutineList from "../../components/Routines/RoutineList";

export interface WorkoutProps {
  name: string;
  sets: number;
  reps: number;
}

export interface RoutineProps {
  title: string;
  desc: string;
  exercises: WorkoutProps[];
}

const Routines: React.FC = () => {
  const { routines, setRoutines } = useContext(RoutinesContext);

  useEffect(() => {
    fetchRoutines(setRoutines);
  }, [routines]);

  return (
    <Layout>
      <View>
        <RoutineList />
      </View>
    </Layout>
  );
};

export default Routines;
