// schema/workout.schema.ts

import { z } from "zod";

export const WorkoutExerciseCreateSchema = z.object({
  exerciseId: z.number(),
  sets: z.number().min(1),
  reps: z.number().min(1),
  rest: z.string(),
});

export const WorkoutExerciseUpdateSchema = WorkoutExerciseCreateSchema.extend({
  id: z.number(), // row ID
});

export const CreateWorkoutSchema = z.object({
  trainerId: z.number(),
  clientId: z.number().nullable(),
  title: z.string(),
  shared: z.boolean(),
  notes: z.string().optional(),
  exercises: z.array(WorkoutExerciseCreateSchema),
});

export const UpdateWorkoutSchema = z.object({
  id: z.number(),
  trainerId: z.number(),
  clientId: z.number().nullable(),
  title: z.string(),
  shared: z.boolean(),
  notes: z.string().optional(),
  exercises: z.array(WorkoutExerciseUpdateSchema),
});

// Types
export type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>;
export type UpdateWorkoutInput = z.infer<typeof UpdateWorkoutSchema>;
