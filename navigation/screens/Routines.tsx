import React, { useState, useContext } from "react";
import { View, Text } from "../../components/Themed";
import { Button } from "react-native";
import { RoutinesContext } from "../RoutinesContext";

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
  // * 1. State
  // const [routines, setRoutines] = useState<RoutineProps[]>([
  //   {
  //     title: "Noob",
  //     desc: "soys only",
  //     exercises: [
  //       {
  //         name: "Burpees",
  //         sets: 2,
  //         reps: 5,
  //       },
  //       {
  //         name: "Crunches",
  //         sets: 2,
  //         reps: 10,
  //       },
  //       {
  //         name: "Bench Press",
  //         sets: 3,
  //         reps: 12,
  //       },
  //     ],
  //   },
  //   {
  //     title: "Actually Zyzz",
  //     desc: "motherfuckin jacked",
  //     exercises: [
  //       {
  //         name: "literally lifting 69 women at the same time",
  //         sets: 6,
  //         reps: 9,
  //       },
  //     ],
  //   },
  // ]);
  const routines = useContext(RoutinesContext);
  // * 2. Logic (isinya fungsi)

  // *  3. render html / jsx

  // let routineElements = routines.map((routine) => (
  //   <View>
  //     <Text>{routine.title}</Text>
  //     <Text>{routine.desc}</Text>
  //     <Button title={"Select " + routine.title} onPress={() => {}} />
  //   </View>
  //   routines.map((routine, index) => {
  //       <View>
  //         <Text>{routine.title}</Text>
  //         <Text>{routine.desc}</Text>

  //         {routine.exercises.map((exercise, index) => {
  //           return (
  //             <View>
  //               <Text>{"Exercise : " + (index + 1) + " " + exercise.name}</Text>
  //               <Text>{"Sets: " + exercise.sets}</Text>
  //               <Text>{"Reps: " + exercise.reps}</Text>
  //             </View>
  //           );
  //         })}

  //         <Button title={"Select " + routine.title} onPress={() => {}} />
  //         {/* {for (let i = 0; i < routines[i].exercises[i].length; i++) {
  //             <Text>{"Exercise 1: " + routines[i].exercises[0].name}</Text>
  //             <Text>{"Sets: " + routines[i].exercises[0].sets}</Text>
  //             <Text>{"Reps: " + routines[i].exercises[0].reps}</Text>
  //         }} */}
  //       </View>
  // });
  // ));

  return (
    <View>
      {routines.map((routine, index) => (
        <View>
          <Text>{routine.title}</Text>
          <Text>{routine.desc}</Text>

          {routine.exercises.map((exercise, index) => {
            return (
              <View>
                <Text>{"Exercise : " + (index + 1) + " " + exercise.name}</Text>
                <Text>{"Sets: " + exercise.sets}</Text>
                <Text>{"Reps: " + exercise.reps}</Text>
              </View>
            );
          })}

          <Button title={"Select " + routine.title} onPress={() => {}} />
        </View>
      ))}
    </View>
  );
};

export default Routines;
