import { createContext } from "react";
import { RoutineProps } from "../../navigation/screens/Routines";

interface Props {
  routines: RoutineProps[];
  setRoutines: React.Dispatch<React.SetStateAction<RoutineProps[]>>;
}

export const RoutinesContext = createContext<Props>({
  routines: [],
  setRoutines: () => {},
});
