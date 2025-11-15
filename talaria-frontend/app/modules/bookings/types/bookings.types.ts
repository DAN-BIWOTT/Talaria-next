// An exercise inside a training session
export interface TrainingSessionExercise {
  id: number;
  sets: number;
  reps: string;
  rest: string | null;

  template: {
    id: number;
    name: string;
  };
}

// A full training session returned from the backend
export interface TrainingSession {
  id: number;
  title: string;
  notes?: string | null;

  booking: {
    date: string;   // ISO date
    status: string; // scheduled | completed | cancelled
  };

  exercises: TrainingSessionExercise[];
}

// Data required to CREATE a new session
export interface NewTrainingSessionInput {
  bookingId: number;
  title: string;
  notes?: string | null;
}
