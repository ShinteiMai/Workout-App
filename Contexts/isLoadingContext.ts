import React, { createContext } from "react";

interface Props {
  isLoading: boolean;
  isLoadingMessage: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const isLoadingContext = createContext<Props>({
  isLoading: false,
  isLoadingMessage: " ",
  setIsLoading: () => { },
  setIsLoadingMessage: () => { },
});
