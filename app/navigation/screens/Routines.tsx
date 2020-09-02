import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from 'react-native-paper';
import { View, Text } from "../../components/Themed";
import Layout from "../../components/Layout";
import { fetchRoutines, reduxStatus, routinesStatus } from "../../features/routinesSlice";

import { RoutineProps } from '../../types';
import RoutineList from "../../components/Routines/RoutineList";
import AddRoutine from '../../components/Routines/AddRoutines';
import UpdateRoutine from '../../components/Routines/UpdateRoutine';

const Routines: React.FC = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(routinesStatus);
  const stat = String(status);

  const [currentRoutine, setCurrentRoutine] = useState<RoutineProps>();
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);


  let display = (
    <RoutineList
      setCurrentRoutine={setCurrentRoutine}
      setIsUpdating={setIsUpdating}
    />
  );
  if (isUpdating) {
    display = <UpdateRoutine routine={currentRoutine} setIsUpdating={setIsUpdating} />
  } else if (isAdding) {
    display = <AddRoutine setIsAdding={setIsAdding} />
  }

  useEffect(() => {
    if (stat === 'idle') {
      dispatch(fetchRoutines());
    }
  }, []);

  return (
    <Layout>
      <View>
        {stat === 'loading' ? (
          <View>
            <Text>asd</Text>
          </View>
        ) : (
            <View>
              <Button onPress={() => { setIsAdding(true); }}>Add a new routine</Button>
              {display}
            </View>

          )}
      </View>
    </Layout>
  );
};

export default Routines;
