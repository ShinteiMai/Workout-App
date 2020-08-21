import React, { createContext } from "react";

interface Props {
  id: string;
  username: string;
  email: string;
  password: string;
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      username: string;
      email: string;
      password: string;
    }>
  >;
}

export const UserContext = createContext<Props>({
  id: "",
  username: "",
  email: "",
  password: "",
  setUser: () => {},
});

// export const UserContext = createContext<Props>(null);
