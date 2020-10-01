export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  LoginAndRegister: undefined;
  Login: undefined;
  Register: undefined;
  EmailVerification: undefined;
  Splash: undefined;
  NotFound: undefined;
};

/* Bottom Navigation List */

export type BottomTabParamList = {
  Routines: undefined;
  Home: undefined;
  Dashboard: undefined;
  Exercises: undefined;
  TabTwo: undefined;
};

/* Screen Props/Params List */

export type HomeParamList = {
  HomeScreen: undefined;
};

export type RoutinesParamList = {
  RoutinesScreen: undefined;
};

export type ExercisesParamList = {
  ExercisesScreen: undefined;
};

export type TabOneParamList = {
  DashboardScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

/* Routines */
export interface RoutineProps {
  id?: string;
  title: string;
  description: string;
  duration: number;
  exercises: ExerciseProps[];
}

/* Exercises */
export interface ExerciseProps {
  id?: string;
  name: string;
  sets: number;
  reps: number;
}
