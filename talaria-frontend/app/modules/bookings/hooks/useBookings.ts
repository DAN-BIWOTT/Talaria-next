// useBookings.ts
"use client";

import { useEffect, useState } from "react";
import {
  TrainingSessionListSchema,
  TrainingSessionType,
} from "../schema/bookings.schema";
import { getClientSessions } from "../services/bookings.services";

export function useBookings(clientId: number | null) {
  const [sessions, setSessions] = useState<TrainingSessionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    if (clientId === null) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getClientSessions(clientId);

      const rawSessions = data.map((b: any) => {
        // If the booking has NO session (your image case)
        if (!b.session) {
          return {
            id: b.id, // fallback ID
            title: "No session yet",
            notes: null,
            exercises: [],
            booking: {
              date: b.booking?.date ?? b.date,
              status: b.booking?.status ?? b.status,
            },
          };
        }

        // If booking HAS a session
        return {
          ...b.session,
          booking: {
            date: b.booking?.date ?? b.date,
            status: b.booking?.status ?? b.status,
          },
        };
      });

      console.log("normalized sessions:", rawSessions);

      const parsed = TrainingSessionListSchema.safeParse(rawSessions);
      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error("Invalid session data format");
      }

      setSessions(parsed.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setSessions([]);
    setError(null);
    if (clientId !== null) refresh();
  }, [clientId]);

  return { sessions, loading, error, setSessions, refresh };
}
