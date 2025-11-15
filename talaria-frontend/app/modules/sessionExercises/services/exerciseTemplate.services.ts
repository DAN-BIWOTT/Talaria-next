"use client";

import { API_URL } from "@/utils/api";
import {
  ExerciseTemplateListSchema,
  ExerciseTemplateSchemaType,
} from "../schema/exerciseTemplate.schema";

// -------------------------------
// Fetch all exercise templates
// -------------------------------
export async function fetchExerciseTemplates(): Promise<
  ExerciseTemplateSchemaType[]
> {
  const res = await fetch(`${API_URL}/api/exercise-templates`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch exercise templates");
  }

  const json = await res.json();

  // Validate with Zod
  const parsed = ExerciseTemplateListSchema.safeParse(json);

  if (!parsed.success) {
    console.error("Template validation error:", parsed.error);
    throw new Error("Invalid template data from server");
  }

  return parsed.data; // array of ExerciseTemplateSchemaType
}
