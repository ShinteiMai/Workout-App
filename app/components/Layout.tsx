import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { Modal, Provider, Portal, Text, Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

interface Props {

}

const calculateCurrentIndex = (position: number) => {
  return Math.ceil(position);
};

const MessageModal: React.FC<Props> = ({ }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <Portal>
        <Modal visible={visible && false} onDismiss={hideModal}>
          <ActivityIndicator
            animating={false}
            color="#FFFFFF"
            size="large"
            style={styles.activityIndicator}
          />
          <Text style={styles.message}>{" "}</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

const Layout: React.FC = ({ children }) => {
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
