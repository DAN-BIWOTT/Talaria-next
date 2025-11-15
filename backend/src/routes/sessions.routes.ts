import { Router } from "express";
import {
  createSession,
  getSessionById,
  updateSession,
  deleteSession,
  addExerciseToSession,
  updateSessionExercise,
  removeSessionExercise,
  getSingleSessionExercise,
} from "../controllers/sessions.controller";

const router = Router();

// -------------------------------
// TRAINING SESSION CORE ROUTES
// -------------------------------

// Create a session (normally after booking)
router.post("/", createSession);

// Get a full session with exercises
router.get("/:id", getSessionById);

// Update session title/notes
router.put("/:id", updateSession);

// Delete a session
router.delete("/:id", deleteSession);

// -------------------------------
// SESSION EXERCISES ROUTES
// -------------------------------

// Add an exercise to the session
router.post("/:id/exercises", addExerciseToSession);

// Update sets/reps/rest for a specific exercise
router.put("/exercise/:exerciseId", updateSessionExercise);

// Remove exercise from session
router.delete("/exercise/:exerciseId", removeSessionExercise);

// Get sets/reps/rest for a specific exercise
router.get("/exercise/:exerciseId", getSingleSessionExercise);

export default router;
