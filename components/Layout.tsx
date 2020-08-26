import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { Modal, Provider, Portal, Text, Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { isLoadingContext } from "../Contexts/isLoadingContext";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

interface Props {

}

const calculateCurrentIndex = (position: number) => {
  return Math.ceil(position);
};

const MessageModal: React.FC<Props> = ({ }) => {
  const { isLoading, isLoadingMessage } = useContext(isLoadingContext);
  const [visible, setVisible] = useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  let message;
  useEffect(() => {
    if (isLoading) {
      showModal();
    }
    message = <Text style={styles.message}>{isLoadingMessage + " "}</Text>
  }, [])

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          {isLoading ?
            <ActivityIndicator
              animating={isLoading}
              color="#FFFFFF"
              size="large"
              style={styles.activityIndicator}
            />
            :
            null}
          {message}
        </Modal>
      </Portal>
    </Provider>
  );
};

const Layout: React.FC = ({ children }) => {
  const { isLoading } = useContext(isLoadingContext);
  return (

    <SafeAreaView>
      <ScrollView
        // horizontal
        decelerationRate={0}
        snapToInterval={width}
        snapToAlignment={"center"}
        style={{ height: height }}
        onMomentumScrollEnd={(event) =>
          calculateCurrentIndex(event.nativeEvent.contentOffset.x / width)
        }
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={styles.container}
        // contentContainerStyle={styles.contentContainer}
        >
          <View>

            {children}
            <MessageModal />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // minHeight: 750,
  },
  contentContainer: {
    // flex: 1,
    // justifyContent: "center",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  message: {
    textAlign: "center",
  }
});
export default Layout;
