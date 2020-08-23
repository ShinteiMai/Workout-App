import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

const calculateCurrentIndex = (position: number) => {
  return Math.ceil(position);
};

const Layout: React.FC = ({ children }) => (
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
        {children}
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: 750,
  },
  contentContainer: {
    // flex: 1,
    // justifyContent: "center",
  },
});
export default Layout;
