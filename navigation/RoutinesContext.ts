import { createContext } from "react";
import { RoutineProps } from "./screens/Routines";

export const RoutinesContext = createContext<RoutineProps[]>([]);
