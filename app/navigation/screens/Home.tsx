import React, { useState, useContext, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RoutinesContext } from "../../Contexts/RoutinesContext";
import { UserContext } from "../../Contexts/UserContext";
import {
  Text,
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

import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import Logout from "../../components/Auth/Logout";
import { axios } from "../../axios";
import { RoutineProps } from "./Routines";

type HomeScreenProp = StackNavigationProp<RootStackParamList>;

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

interface Props {
  navigation: HomeScreenProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const user = useContext(UserContext);
  const { routines } = useContext(RoutinesContext);

  const [hasWorkoutStarted, setHasWorkoutStarted] = useState<boolean>(false);
  // const [selectedRoutine, setSelectedRoutine] = useState<number>(0);

  const [selectedRoutine, setSelectedRoutine] = useState<number>(0);

  return (
    <Layout>
      <Surface style={styles.container}>
        <Title>Stronk - Chad Academy</Title>
        <Surface style={styles.profile}>
          <Text style={{ marginBottom: 10 }}>
            Your email is: {user ? user.email : "chad"}
          </Text>
          <View style={{ marginBottom: 10 }}>
            <Logout navigation={navigation} />
          </View>
        </Surface>
        {!hasWorkoutStarted ? (
          <Surface style={styles.dashboard}>
            <Title style={styles.title}>Dashboard</Title>
            {/* <Divider style={styles.separator} /> */}
            <View>
              <View>
                <Paragraph> - Workout Summary</Paragraph>
                <Card>
                  <Card.Title title="25" />
                </Card>
              </View>
              <View>
                <Paragraph> - Previous Workout Session</Paragraph>
              </View>
              <View>
                <SelectRoutine
                  routines={routines}
                  startHandler={(routineIndex: number) => {
                    setSelectedRoutine(routineIndex);
                    setHasWorkoutStarted(true);
                  }}
                />
              </View>
            </View>
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
  container: {
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: height / 2,
  },
  profile: {
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  dashboard: {
    marginTop: 20,
    padding: 5,
  },
});

export default Home;
