import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";

import Login from "./Login";
import Register from "./Register";

interface Props {}

const Auth: React.FC<Props> = ({}) => {
  const [displays, setDisplays] = useState([<Login />, <Register />]);
  const [currentDisplay, setCurrentDisplay] = useState(0);

  return (
    <Surface>
      {displays[currentDisplay]}
      <Button
        onPress={() => {
          setCurrentDisplay(currentDisplay === 0 ? 1 : 0);
        }}
      >
        <Text>
          {currentDisplay === 0
            ? "Don't have an account?\nRegister here"
            : "Already have an account? Login"}
        </Text>
      </Button>
    </Surface>
  );
};

export default Auth;
