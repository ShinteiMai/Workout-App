import React from "react";
import { View } from "./Themed";
import { Paragraph, List, Button } from "react-native-paper";
import { RoutineProps } from "../navigation/screens/Routines";

type Props = {
  routines: RoutineProps[];
  startHandler: (routineIndex: number) => void;
};

const SelectRoutine: React.FC<Props> = (props) => {
  return (
    <View>
      <Paragraph>Select ur damn routine nigga</Paragraph>
      {props.routines.map((routine, index) => {
        return (
          <>
            <List.Item
              title={routine.title}
              description={routine.desc}
              left={() => <List.Icon icon="folder" />}
            />
            <Button
              onPress={() => {
                props.startHandler(index);
              }}
            >
              Select {routine.title}
            </Button>
          </>
        );
      })}
    </View>
  );
};

export default SelectRoutine;
