import React from "react";
// import { useSelector } from 'react-redux';
import { View } from "./Themed";
import { Paragraph, List, Button } from "react-native-paper";
import { RoutineProps } from "../types";
import CarouselComponent from "./UI/Carousel";
// import { selectRoutines } from "../features/routinesSlice";

type Props = {
  routines: any;
  // routines: RoutineProps[];
  startHandler: (routineIndex: number) => void;
};

const SelectRoutine: React.FC<Props> = ({ routines, startHandler }) => {

  return (
    <View>
      <Paragraph>Select your routine</Paragraph>
      {/* {props.routines.map((routine, index) => {
        return (
          <List.Section key={index}>
            <List.Item
              title={routine.title}
              description={routine.desc}
              left={() => <List.Icon icon="folder" />}
            />
            <Button
              key={index}
              onPress={() => {
                props.startHandler(index);
              }}
            >
              Select {routine.title}
            </Button>
          </List.Section>
        );
      })} */}
      <CarouselComponent data={routines} startHandler={startHandler} />
    </View>
  );
};

export default SelectRoutine;
