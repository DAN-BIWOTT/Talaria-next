import { z } from "zod";

export const ExerciseTemplateSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string().nullable(),
  primaryMuscle: z.string().nullable(),
  secondaryMuscle: z.string().nullable(),
  equipment: z.string().nullable(),
  videoURL: z.string().nullable(),
  description: z.string().nullable(),
});

export const ExerciseTemplateListSchema = z.array(ExerciseTemplateSchema);

export type ExerciseTemplateSchemaType = z.infer<
  typeof ExerciseTemplateSchema
>;
