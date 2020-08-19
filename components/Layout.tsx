import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const Layout: React.FC = ({ children }) => (
  <SafeAreaView>
    <ScrollView>{children}</ScrollView>
  </SafeAreaView>
);

export default Layout;
