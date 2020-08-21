import React, { useState, useEffect, useContext, useMemo } from "react";
import { AsyncStorage } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { UserContext } from "./components/Contexts/UserContext";
import { isAuthContext } from "./components/Contexts/isAuthContext";
import Auth from "./components/Auth/Auth";
import { CheckAuthStatus } from "./components/Auth/CheckAuth";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [isAuth, setIsAuth] = useState(isAuthContext);
  const [user, setUser] = useState(UserContext);

  const userValues = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    CheckAuthStatus({ setUser, setIsAuth });
  }, [setUser, setIsAuth]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserContext.Provider value={userValues}>
          <PaperProvider>
            {isAuth ? (
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
