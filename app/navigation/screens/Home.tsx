import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import { RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { Button, Card, Paragraph, Text, Title, Surface } from "react-native-paper";

import Layout from "../../components/Layout";

import HamburgerSvg from "../../assets/images/hamburger_icon.svg";
import FireSvg from "../../assets/images/crown_logo.svg";
import CrownSvg from "../../assets/images/fire_logo.svg";
import LineSvg from "../../assets/images/line.svg";
import profilePicture from "../../assets/images/splash2.png";

import SelectRoutine from "../../components/SelectRoutine";
import Workout from "../../components/Workout/Workout";

import Logout from "../../components/Auth/Logout";
import { selectUser } from "../../features/userSlice";
import { selectRoutines } from "../../features/routinesSlice";

type HomeScreenProp = StackNavigationProp<RootStackParamList>;

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

interface Props {
  navigation: HomeScreenProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const user = useSelector(selectUser);
  const routines = useSelector(selectRoutines);
  const [hasWorkoutStarted, setHasWorkoutStarted] = useState<boolean>(false);
  const [selectedRoutine, setSelectedRoutine] = useState<number>(0);

  return (
    <Layout>
      <Surface style={styles.container}>

        <HamburgerSvg />

        <View style={styles.profileInfo}>

          <View style={styles.profileStreak}>
            <FireSvg />
            <Text style={styles.point}> 0 </Text>
            <CrownSvg />
            <Text style={styles.point}> 0 </Text>

          </View>
          <Image source={profilePicture} style={styles.profilePicture} />

          <Text style={styles.title}>Welcome Back, Jovan</Text>
          <Text>Ready to crush your day?</Text>

        </View>

        <View style={styles.statistic}>
          <LineSvg />
          <Text>Statistics ToDoList</Text>
          <LineSvg />
        </View>

        {!hasWorkoutStarted ? (
          <Surface style={styles.dashboard}>
            <Title style={styles.title}>Your Routines</Title>
            <View>
              <View>
                <Card>
                  <Card.Title title="25" />
                </Card>
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
  profileInfo: {

  },
  profileStreak: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
  },
  profilePicture: {
    position: "absolute",
    right: 0,
    height: 75,
    width: 75,
    borderRadius: 75,
  },
  statistic: {
    flex: 1,
    justifyContent: "space-between",
    height: 300,
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
  },
  point: {
    fontSize: 20,
    marginLeft: 5,
    marginRight: 10
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
