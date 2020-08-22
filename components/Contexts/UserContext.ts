import React, { createContext } from "react";

interface Props {
  id: string;
  email: string;
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      email: string;
    }>
  >;
}

export const UserContext = createContext<Props>({
  id: "",
  email: "",
  setUser: () => {},
});

// export const UserContext = createContext<Props>(null);
