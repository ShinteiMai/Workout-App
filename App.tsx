import React, { useState, useEffect, useContext, useMemo } from "react";
import { AsyncStorage } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { UserContext } from "./components/Contexts/UserContext";
import Auth from "./components/Auth/Auth";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState(UserContext);

  const userValues = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    if (AsyncStorage.getItem("Token")) {
      // setUser();
    }
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserContext.Provider value={userValues}>
          <PaperProvider>
            {user ? (
              <>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </>
            ) : (
              <Auth />
            )}
          </PaperProvider>
        </UserContext.Provider>
      </SafeAreaProvider>
    );
  }
}
