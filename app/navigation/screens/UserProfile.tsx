import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import { RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, Title, Surface } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import Layout from "../../components/Layout";

import Logout from "../../components/Auth/Logout";
import { selectUser } from "../../features/userSlice";
import { selectRoutines } from "../../features/routinesSlice";
import { uploadImage } from "../../features/imageSlice";

import defaultPicture from "../../assets/images/splash2.png";

type UserProfileScreenProp = StackNavigationProp<RootStackParamList>;

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

interface Props {
  navigation: UserProfileScreenProp;
}

const UserProfile: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const [hasWorkoutStarted, setHasWorkoutStarted] = useState<boolean>(false);
  const [selectedRoutine, setSelectedRoutine] = useState<number>(0);

  const [imageSource, setImageSource] = useState<any>(defaultPicture);

  const selectImage = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      quality: 0.1,
    });
    // console.log(pickerResult);

    if (pickerResult.cancelled) {

    } else {
      let localUri = pickerResult.uri;
      let filename = localUri.split('/').pop();
      let base64 = pickerResult.base64;

      // Infer the type of the image      
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      setImageSource(`data:${type};base64,${base64}`);

      // let imageBlob = base64toBlob(base64, type);

      // Upload the image using fetch and formData APIs
      let formData = new FormData();

      formData.append("photo", {
        "picture": base64,
        // "picture": localUri,
        "name": filename,
        "type": type,
      });
      // const formData = {
      //   "picture": String(base64)
      // }
      // console.log(formData);

      try {
        const res = await dispatch(uploadImage(formData));
        // const res = await dispatch(uploadImage(localUri));
        // const res = await dispatch(uploadImage(formData));
        // console.log(res);
      } catch (err) {
        // console.log(err);

      }
    }

  };

  return (
    <Layout>

      <Surface style={styles.container}>

        <View style={styles.profile}>

          <Image
            style={styles.profilePicture}
            source={imageSource}
          />
          <Title>Name Name</Title>

          <View style={styles.levelStatus}>
            <Title>Level X</Title>
            <Title>[Progress bar here]</Title>
            <Text>xxx exp to go</Text>
          </View>

        </View>

        <View style={styles.profile}>

          <Text style={{ marginBottom: 10 }}>ID: {user.id}</Text>
          <Text style={{ marginBottom: 10 }}>Email: {user.email}</Text>
          <View style={{ marginBottom: 10 }}>
            <Logout navigation={navigation} />
          </View>

        </View>


        <View>
          <Button
            contentStyle={styles.buttonBody}
            labelStyle={styles.buttonText2}
            onPress={() => selectImage()}
          >
            Select Image
          </Button>
        </View>

        <View>
          <Title>Statistics</Title>
          <Title>[Statistics here]</Title>
        </View>

        <View>
          <Title>Achievements</Title>
          <Title>[Achievements here]</Title>
        </View>

        <View>
          <Title>Routines</Title>
          <Title>[Routines here]</Title>
        </View>

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  profilePicture: {
    height: 150,
    width: 150,
    borderRadius: 150,
    resizeMode: 'cover',
  },
  levelStatus: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  buttonBody: {
    // marginHorizontal: 0,
    // paddingVertical: 10
  },
  buttonText1: {
    // marginVertical: 10,
    color: "#ffffff",
    fontSize: 12,
  },
  buttonText2: {
    color: "#000000",
    fontSize: 12,
  },
});

export default UserProfile;
