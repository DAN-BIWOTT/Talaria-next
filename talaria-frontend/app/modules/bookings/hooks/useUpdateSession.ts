"use client";

import { useState } from "react";
import { updateTrainingSession } from "../services/bookings.services";

export function useUpdateSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateSession(sessionId: number, data: any) {
    setLoading(true);
    setError(null);

    try {
      return await updateTrainingSession(sessionId, data);
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { updateSession, loading, error };
}
