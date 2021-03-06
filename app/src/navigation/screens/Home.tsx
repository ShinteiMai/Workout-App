import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { Text, Title, Surface } from "react-native-paper";
import Layout from "../../components/Layout";

import Logout from "../../components/Auth/Logout";
import { selectUser } from "../../features/userSlice";

type HomeScreenProp = StackNavigationProp<RootStackParamList>;

let height = Dimensions.get("window").height;

interface Props {
  navigation: HomeScreenProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const user = useSelector(selectUser);

  return (
    <Layout>
      <Surface style={styles.container}>
        <Title>Stronk - Chad Academy</Title>
        <Surface style={styles.profile}>
          <Text style={{ marginBottom: 10 }}>ID: {user.id}</Text>
          <Text style={{ marginBottom: 10 }}>Email: {user.email}</Text>
          <View style={{ marginBottom: 10 }}>
            <Logout navigation={navigation} />
          </View>
        </Surface>
        {/* {!hasWorkoutStarted ? (
          <Surface style={styles.dashboard}>
            <Title style={styles.title}>Dashboard</Title>
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
          )} */}
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
