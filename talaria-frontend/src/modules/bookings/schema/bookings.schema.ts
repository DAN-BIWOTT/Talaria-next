import { z } from "zod";

export const TrainingSessionExerciseSchema = z.object({
  id: z.number(),
  sets: z.number(),
  reps: z.string(),
  rest: z.string().nullable(),

  template: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export const TrainingSessionSchema = z.object({
  id: z.number(),
  title: z.string(),
  notes: z.string().nullable().optional(),

  booking: z.object({
    date: z.string(),
    status: z.string(),
  }),

  exercises: z.array(TrainingSessionExerciseSchema),
});

export const TrainingSessionListSchema = z.array(TrainingSessionSchema);

// -----------------------------------------
// ✅ NEW: Create-Session Schema (matches backend)
// -----------------------------------------
export const NewTrainingSessionSchema = z.object({
  clientId: z.number(),
  date: z.string(),       // YYYY-MM-DD
  title: z.string(),
  notes: z.string().nullable(),
});

export const BookingSchema = z.object({
  id: z.number(),
  clientId: z.number(),
  date: z.string(),
  status: z.string(),
  client: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    goal: z.string().nullable(),
    joinedAt: z.string(),
  }),
  session: TrainingSessionSchema.nullable(), // session may be null initially
});

export type TrainingSessionType = z.infer<typeof TrainingSessionSchema>;
export type NewTrainingSessionInput = z.infer<typeof NewTrainingSessionSchema>;
