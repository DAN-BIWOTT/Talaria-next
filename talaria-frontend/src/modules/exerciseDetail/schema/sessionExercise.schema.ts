import { z } from "zod";

export const SessionExerciseSchema = z.object({
  id: z.number(),
  sets: z.number(),
  reps: z.string(),
  rest: z.string().nullable(),

  template: z.object({
    id: z.number(),
    name: z.string(),
    category: z.string().nullable(),
    primaryMuscle: z.string().nullable(),
    secondaryMuscle: z.string().nullable(),
    equipment: z.string().nullable(),
    videoURL: z.string().nullable(),
    description: z.string().nullable(),
  }),
});

export type SessionExerciseType = z.infer<typeof SessionExerciseSchema>;
