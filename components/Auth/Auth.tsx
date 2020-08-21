import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";

import Login from "./Login";
import Register from "./Register";
import Layout from "../Layout";

interface Props {}

const Auth: React.FC<Props> = ({}) => {
  const [currentDisplay, setCurrentDisplay] = useState(0);

  return (
    <Layout>
      <Surface>
        {currentDisplay === 0 ? <Login /> : <Register />}
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
    </Layout>
  );
};

export default Auth;
