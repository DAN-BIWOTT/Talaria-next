"use client";

import { useState } from "react";
import { deleteTrainingSession } from "../services/bookings.services";

export function useDeleteSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function remove(sessionId: number) {
    setLoading(true);
    setError(null);

    try {
      await deleteTrainingSession(sessionId);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { remove, loading, error };
}
