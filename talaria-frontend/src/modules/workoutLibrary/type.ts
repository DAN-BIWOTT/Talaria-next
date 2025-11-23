// types/workout.types.ts

export type MuscleGroup =
  | "chest"
  | "back"
  | "legs"
  | "shoulders"
  | "arms"
  | "core"
  | "glutes"
  | "full-body";

export interface Exercise {
  id: number;
  name: string;
  muscleGroups: MuscleGroup[];
  equipment: string;
  mode: string;
  video?: string;
  notes?: string;
}

export interface WorkoutExercise {
  id: number;
  workoutId: number;
  exerciseId: number;
  sets: number;
  reps: number;
  rest: string;
}

export interface Workout {
  id: number;
  trainerId: number;
  clientId: number | null;
  title: string;
  shared: boolean;
  notes?: string;
  date: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutWithDetails extends Workout {
  exerciseDetails: (WorkoutExercise & { info: Exercise })[];
}

export interface WorkoutFilters {
  search?: string;
  type?: "all" | "shared" | "private";
  muscle?: MuscleGroup | "all";
  sortBy?: "recent" | "az" | "exercises";
}

export interface CreateWorkoutPayload {
  trainerId: number;
  clientId: number | null;
  title: string;
  shared: boolean;
  notes?: string;
  exercises: {
    exerciseId: number;
    sets: number;
    reps: number;
    rest: string;
  }[];
}

export interface UpdateWorkoutPayload {
  id: number;
  trainerId: number;
  clientId: number | null;
  title: string;
  shared: boolean;
  notes?: string;
  exercises: {
    id: number;           // existing row ID
    exerciseId: number;
    sets: number;
    reps: number;
    rest: string;
  }[];
}
