import { API_URL } from "../../../utils/api";
import {
  SessionExerciseSchema,
  SessionExerciseListSchema,
} from "../schema/sessionExercises.schema";
import {
  NewSessionExerciseInput,
  SessionExerciseType,
} from "../types/sessionExercises.types";

// ----------------------------
// Fetch all exercises in a session
// ----------------------------
export async function fetchSessionExercises(
  sessionId: number
): Promise<SessionExerciseType[]> {
  const res = await fetch(`${API_URL}/api/sessions/${sessionId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch session exercises");
  }

  const data = await res.json();

  // Assume backend returns: { ..., exercises: [...] }
  const parsed = SessionExerciseListSchema.safeParse(data.exercises ?? []);
  if (!parsed.success) {
    console.error("Invalid session exercises from server:", parsed.error);
    throw new Error("Invalid session exercises format from server");
  }

  return parsed.data; // SessionExerciseType[]
}

// ----------------------------
// Delete a session exercise
// ----------------------------
export async function deleteSessionExercise(
  exerciseId: number
): Promise<boolean> {
  const res = await fetch(
    `${API_URL}/api/sessions/exercise/${exerciseId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete exercise");
  }

  return true;
}

// ----------------------------
// Add new session exercise
// ----------------------------
export async function addSessionExercise(
  sessionId: number,
  data: NewSessionExerciseInput
): Promise<SessionExerciseType> {
  console.log("This: ",data)
  const res = await fetch(`${API_URL}/api/sessions/${sessionId}/exercises`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
   

  if (!res.ok) {
    throw new Error("Failed to add session exercise");
  }

  const json = await res.json();

  const parsed = SessionExerciseSchema.safeParse(json);
  if (!parsed.success) {
    console.error("Server returned invalid session exercise:", parsed.error);
    throw new Error("Invalid session exercise format from server");
  }

  return parsed.data; // SessionExerciseType
}
