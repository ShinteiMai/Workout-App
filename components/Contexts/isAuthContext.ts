import React, { createContext } from "react";

interface Props {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const isAuth = createContext<Props>({
  isAuth: false,
  setIsAuth: () => {},
});
