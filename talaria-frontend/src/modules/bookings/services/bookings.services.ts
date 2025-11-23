import { API_URL } from "../../../utils/api";
import { NewTrainingSessionInput } from "../schema/bookings.schema";

//
// ───────────────────────────────────────────
// FETCH ALL SESSIONS FOR A CLIENT
// (FROM BOOKINGS + EMBEDDED SESSION)
// ───────────────────────────────────────────
//
export async function getClientSessions(clientId: number) {
  const res = await fetch(`${API_URL}/api/bookings/client/${clientId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sessions");
  }

  return res.json(); // raw bookings containing session object
}

//
// ───────────────────────────────────────────
// CREATE BOOKING + TRAINING SESSION (ONE STEP)
// ClientId + date + title + notes
// BACKEND ROUTE: POST /api/bookings
// RETURNS: TrainingSession
// ───────────────────────────────────────────
//
export async function createSessionForClient(
  data: NewTrainingSessionInput
) {
  const res = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create session");
  }

  return res.json(); // expected: TrainingSession
}

//
// ───────────────────────────────────────────
// UPDATE SESSION TITLE / NOTES
// ROUTE: PUT /api/sessions/:id
// ───────────────────────────────────────────
//
export async function updateTrainingSession(
  sessionId: number,
  data: { title?: string; notes?: string | null }
) {
  const res = await fetch(`${API_URL}/api/sessions/${sessionId}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update training session");
  }

  return res.json();
}

//
// ───────────────────────────────────────────
// DELETE A TRAINING SESSION
// ROUTE: DELETE /api/sessions/:id
// ───────────────────────────────────────────
//
export async function deleteTrainingSession(sessionId: number) {
  const res = await fetch(`${API_URL}/api/sessions/${sessionId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete training session");
  }

  return true;
}
