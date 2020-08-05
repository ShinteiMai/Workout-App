import React, { useState, useCallback, useRef, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

interface Props {
  countdown: number;
  finishHandler(): void;
}

const Timer: React.FC<Props> = (props) => {
  const [counter, setCounter] = useState(props.countdown + 1);
  const [running, setRunning] = useState(false);

  const counterRef = useRef(counter);
  counterRef.current = counter;

  const runningRef = useRef(running);
  runningRef.current = running;

  useEffect(() => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runTimer();
    }
  }, []);

  const runTimer = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setCounter((previousValue) => {
      counterRef.current = previousValue - 1;
      return previousValue - 1;
    });
    if (counterRef.current === 0) return props.finishHandler();

    setTimeout(runTimer, 1000);
  }, []);

  let buttonTitle = "Pause timer";
  if (!running) buttonTitle = "Start timer";

  return (
    <View>
      <Text style={styles.text}>Timer</Text>

      <Text style={styles.counter}>Counter: {counter}</Text>
      <Button
        title={buttonTitle}
        onPress={() => {
          setRunning(!running);
          if (!running) {
            setCounter(counter + 1);
            runningRef.current = true;
            runTimer();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
  },
  counter: {
    marginVertical: 10,
  },
});

export default Timer;
