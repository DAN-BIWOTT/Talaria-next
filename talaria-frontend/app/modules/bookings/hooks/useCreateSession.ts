import { useState } from "react";
import { createSessionForClient } from "../services/bookings.services";
import { NewTrainingSessionInput, BookingSchema } from "../schema/bookings.schema";

export function useCreateSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createSession(data: NewTrainingSessionInput) {
    setLoading(true);
    setError(null);

    try {
      const res = await createSessionForClient(data);
    console.log("structur: ",res)
      const parsed = BookingSchema.safeParse(res);
      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error("Invalid session format from server");
      }

      return parsed.data; // Valid TrainingSession
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { createSession, loading, error };
}
