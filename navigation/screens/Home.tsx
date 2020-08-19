import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { RoutinesContext } from "../RoutinesContext";
import {
  Title,
  Paragraph,
  Surface,
  Divider,
  Card,
  Button,
} from "react-native-paper";
import SelectRoutine from "../../components/SelectRoutine";
import Workout from "../../components/Workout/Workout";
import CarouselComponent from "../../components/UI/Carousel";
import Layout from "../../components/Layout";

const Home = () => {
  const routines = useContext(RoutinesContext);

  const [hasWorkoutStarted, setHasWorkoutStarted] = useState<boolean>(false);
  const [selectedRoutine, setSelectedRoutine] = useState<number>(0);

  return (
    <Layout>
      <Surface style={styles.container}>
        <Title>Stronk - Chad Academy</Title>

        {!hasWorkoutStarted ? (
          <Surface style={styles.dashboard}>
            <Title style={styles.title}>Dashboard</Title>
            <Divider style={styles.separator} />
            <Surface>
              <Surface>
                <Paragraph> - Workout Summary Component Here asd</Paragraph>
                <Card>
                  <Card.Title title="25" />
                </Card>
              </Surface>
              <Surface>
                <Paragraph>- Previous Workout Session Component Here</Paragraph>
              </Surface>
              <Surface>
                <SelectRoutine
                  routines={routines}
                  startHandler={(routineIndex: number) => {
                    setSelectedRoutine(routineIndex);
                    setHasWorkoutStarted(true);
                  }}
                />
              </Surface>
            </Surface>
          </Surface>
        ) : (
          <Surface>
            <Workout
              routine={routines[selectedRoutine]}
              finishHandler={() => {
                setHasWorkoutStarted(false);
              }}
            />
            <Button
              onPress={() => {
                setHasWorkoutStarted(false);
              }}
            >
              Back to Home
            </Button>
          </Surface>
        )}
      </Surface>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  container: {
    padding: 25,
  },
  dashboard: {
    marginTop: 20,
    padding: 5,
  },
});

export default Home;
