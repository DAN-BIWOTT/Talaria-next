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

export const NewSessionExerciseSchema = z.object({
  templateId: z.number(),
  sets: z.number(),
  reps: z.string(),
  rest: z.string(),
});


// List of session exercises
export const SessionExerciseListSchema = z.array(SessionExerciseSchema);

// Type inference from Zod
export type SessionExerciseSchemaType = z.infer<typeof SessionExerciseSchema>;
