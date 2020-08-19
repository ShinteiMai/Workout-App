import React from "react";
import { View } from "./Themed";
import { Paragraph, List, Button } from "react-native-paper";
import { RoutineProps } from "../navigation/screens/Routines";
import CarouselComponent from "./UI/Carousel";

type Props = {
  routines: RoutineProps[];
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
