export interface SessionExercise {
  id: number;
  sets: number;
  reps: string;
  rest: string | null;

  template: {
    id: number;
    name: string;
    category: string | null;
    primaryMuscle: string | null;
    secondaryMuscle: string | null;
    equipment: string | null;
    videoURL: string | null;
    description: string | null;
  };
}
