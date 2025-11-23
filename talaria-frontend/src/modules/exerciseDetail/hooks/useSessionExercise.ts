"use client";

import { useEffect, useState } from "react";
import { SessionExerciseSchema, SessionExerciseType } from "../schema/sessionExercise.schema";

export function useSessionExercise(exerciseId: number | null) {
  const [exercise, setExercise] = useState<SessionExerciseType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!exerciseId) return;

    async function loadExercise() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/api/sessions/exercise/${exerciseId}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exercise details");
        }

        const json = await response.json();

        const parsed = SessionExerciseSchema.safeParse(json);
        if (!parsed.success) {
          console.error(parsed.error);
          throw new Error("Invalid exercise format");
        }

        setExercise(parsed.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadExercise();
  }, [exerciseId]);

  return { exercise, loading, error };
}
