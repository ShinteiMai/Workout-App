import React, { useState, useEffect, useContext } from "react";
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

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({
    id: "",
    email: "",
  });
  // const userValues = useMemo(() => ({ user, setUser }), [user, setUser]);
  const userValues = {
    ...user,
    setUser,
  };

  const isAuthValues = {
    isAuth,
    setIsAuth,
  };

  useEffect(() => {
    const checkAuth = async () => await CheckAuthStatus({ setUser, setIsAuth });
    checkAuth();
  }, [isAuth]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserContext.Provider value={userValues}>
          <isAuthContext.Provider value={isAuthValues}>
            <PaperProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </PaperProvider>
          </isAuthContext.Provider>
        </UserContext.Provider>
      </SafeAreaProvider>
    );
  }
}
