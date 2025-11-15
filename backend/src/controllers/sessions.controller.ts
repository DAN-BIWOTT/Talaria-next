import { Request, Response } from "express";
import * as sessionService from "../services/sessions.service";

// --------------------------------------------------
// CREATE SESSION
// POST /api/sessions
// --------------------------------------------------
export async function createSession(req: Request, res: Response) {
  try {
    const { bookingId, title, notes } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: "bookingId is required" });
    }

    const session = await sessionService.createSession({
      bookingId: Number(bookingId),
      title: title ?? "Training Session",
      notes: notes ?? "",
    });

    return res.status(201).json(session);
  } catch (error) {
    console.error("❌ Error creating session:", error);
    return res.status(500).json({ message: "Failed to create session" });
  }
}

// --------------------------------------------------
// GET SESSION BY ID
// GET /api/sessions/:id
// --------------------------------------------------
export async function getSessionById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid session ID" });

    const session = await sessionService.getSessionById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    return res.json(session);
  } catch (error) {
    console.error("❌ Error fetching session:", error);
    return res.status(500).json({ message: "Failed to fetch session" });
  }
}

// --------------------------------------------------
// UPDATE SESSION
// PUT /api/sessions/:id
// --------------------------------------------------
export async function updateSession(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { title, notes } = req.body;

    if (isNaN(id)) return res.status(400).json({ message: "Invalid session ID" });

    const updated = await sessionService.updateSession(id, { title, notes });
    return res.json(updated);
  } catch (error) {
    console.error("❌ Error updating session:", error);
    return res.status(500).json({ message: "Failed to update session" });
  }
}

// --------------------------------------------------
// DELETE SESSION
// DELETE /api/sessions/:id
// --------------------------------------------------
export async function deleteSession(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid session ID" });

    await sessionService.deleteSession(id);

    return res.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting session:", error);
    return res.status(500).json({ message: "Failed to delete session" });
  }
}

// --------------------------------------------------
// ADD EXERCISE TO SESSION
// POST /api/sessions/:id/exercises
// --------------------------------------------------
export async function addExerciseToSession(req: Request, res: Response) {
  try {
    const sessionId = Number(req.params.id);
    const { templateId, sets, reps, rest } = req.body;

    if (isNaN(sessionId)) return res.status(400).json({ message: "Invalid session ID" });
    if (!templateId) return res.status(400).json({ message: "templateId is required" });

    const created = await sessionService.addExerciseToSession(sessionId, {
      templateId: Number(templateId),
      sets: Number(sets) ?? 3,
      reps: reps ?? "10",
      rest: rest ?? "90s",
    });

    return res.status(201).json(created);
  } catch (error) {
    console.error("❌ Error adding exercise:", error);
    return res.status(500).json({ message: "Failed to add exercise" });
  }
}

// --------------------------------------------------
// UPDATE EXERCISE IN SESSION
// PUT /api/sessions/exercise/:exerciseId
// --------------------------------------------------
export async function updateSessionExercise(req: Request, res: Response) {
  try {
    const exerciseId = Number(req.params.exerciseId);
    const { sets, reps, rest } = req.body;

    if (isNaN(exerciseId)) return res.status(400).json({ message: "Invalid exercise ID" });

    const updated = await sessionService.updateSessionExercise(exerciseId, {
      sets: sets ? Number(sets) : undefined,
      reps,
      rest,
    });

    return res.json(updated);
  } catch (error) {
    console.error("❌ Error updating session exercise:", error);
    return res.status(500).json({ message: "Failed to update exercise" });
  }
}

// --------------------------------------------------
// REMOVE EXERCISE FROM SESSION
// DELETE /api/sessions/exercise/:exerciseId
// --------------------------------------------------
export async function removeSessionExercise(req: Request, res: Response) {
  try {
    const exerciseId = Number(req.params.exerciseId);
    if (isNaN(exerciseId)) return res.status(400).json({ message: "Invalid exercise ID" });

    await sessionService.removeSessionExercise(exerciseId);

    return res.json({ message: "Exercise removed from session" });
  } catch (error) {
    console.error("❌ Error removing exercise:", error);
    return res.status(500).json({ message: "Failed to remove exercise" });
  }
}

// --------------------------------------------------
// GET A SINGLE EXERCISE FROM SESSION
// GET /api/sessions/exercise/:exerciseId
// --------------------------------------------------
export async function getSingleSessionExercise(req: Request, res: Response) {
  try {
    const id = Number(req.params.exerciseId);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid exercise ID" });
    }

    const exercise = await sessionService.getSingleSessionExercise(id);

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    return res.json(exercise);
  } catch (error) {
    console.error("❌ Error fetching exercise:", error);
    return res.status(500).json({ message: "Failed to fetch exercise" });
  }
}
