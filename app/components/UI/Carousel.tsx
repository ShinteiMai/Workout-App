import React, { useState } from "react";

import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { RoutineProps } from "../../navigation/screens/Routines";
import { Surface, Title, Paragraph, Button } from "react-native-paper";

interface Item {
  title: string;
}

interface RenderItemProps {
  item: RoutineProps;
  index: number;
}

interface Props {
  data: RoutineProps[];
  startHandler: (routineIndex: number) => void;
}
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

const CarouselComponent: React.FC<Props> = ({ data, startHandler }) => {
  let carousel: Carousel<any> | null;

  const renderItem = ({ item: routine, index }: RenderItemProps) => {
    return (
      <Surface>
        <Title>Title: {routine.title}</Title>
        <Paragraph>Description: {routine.desc}</Paragraph>
        <Surface>
          {routine.exercises.map((exercise, index) => {
            return (
              <View key={index}>
                <Paragraph>Exercise: {exercise.name}</Paragraph>
              </View>
            );
          })}
        </Surface>
        <Button
          onPress={() => {
            startHandler(index);
          }}
        >
          Select {routine.title}
        </Button>
      </Surface>
    );
  };

  return (
    <Carousel
      ref={(ref) => {
        carousel = ref;
      }}
      data={data}
      renderItem={renderItem}
      sliderWidth={width - 60}
      sliderHeight={700}
      itemWidth={width - 60}
    />
  );
};

const styles = StyleSheet.create({});

export default CarouselComponent;
