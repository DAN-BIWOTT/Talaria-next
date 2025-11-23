export interface SessionExerciseType {
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

export interface NewSessionExerciseInput {
  templateId: number;
  sets: number;
  reps: string;
  rest: string;
}

export interface ExerciseTemplateType {
  id: number;
  name: string;
  category: string | null;
  primaryMuscle: string | null;
  secondaryMuscle: string | null;
  equipment: string | null;
  videoURL: string | null;
  description: string | null;
}

export interface NewTrainingSessionInput {
  bookingId: number;
  title: string;
  notes?: string | null;
}

