"use client";

import { useEffect, useState } from "react";
import {
  SessionExerciseListSchema,
  SessionExerciseSchemaType,
} from "../schema/sessionExercises.schema";

import {
  fetchSessionExercises,
  deleteSessionExercise,
} from "../services/sessionExercises.services";

export function useSessionExercises(sessionId: number | null) {
  const [exercises, setExercises] = useState<SessionExerciseSchemaType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ------------------------------------------------------------
  // REFRESH FUNCTION (load exercises on demand)
  // ------------------------------------------------------------
  async function refresh() {
    if (!sessionId) return;

    setLoading(true);
    setError(null);

    try {
      const raw = await fetchSessionExercises(sessionId);
      const parsed = SessionExerciseListSchema.safeParse(raw);

      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error("Invalid session exercise format");
      }

      setExercises(parsed.data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load session exercises");
    } finally {
      setLoading(false);
    }
  }

  // ------------------------------------------------------------
  // LOAD ON SESSION CHANGE
  // ------------------------------------------------------------
  useEffect(() => {
    setExercises([]);
    if (sessionId) refresh();
  }, [sessionId]);

  // ------------------------------------------------------------
  // DELETE EXERCISE
  // ------------------------------------------------------------
  async function removeExercise(exerciseId: number) {
    await deleteSessionExercise(exerciseId);
    setExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
  }

  return {
    exercises,
    loading,
    error,
    refresh,
    removeExercise,
    setExercises
  };
}
