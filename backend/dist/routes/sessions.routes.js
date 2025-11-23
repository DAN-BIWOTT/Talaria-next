"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessions_controller_1 = require("../controllers/sessions.controller");
const router = (0, express_1.Router)();
// -------------------------------
// TRAINING SESSION CORE ROUTES
// -------------------------------
// Create a session (normally after booking)
router.post("/", sessions_controller_1.createSession);
// Get a full session with exercises
router.get("/:id", sessions_controller_1.getSessionById);
// Update session title/notes
router.put("/:id", sessions_controller_1.updateSession);
// Delete a session
router.delete("/:id", sessions_controller_1.deleteSession);
// -------------------------------
// SESSION EXERCISES ROUTES
// -------------------------------
// Add an exercise to the session
router.post("/:id/exercises", sessions_controller_1.addExerciseToSession);
// Update sets/reps/rest for a specific exercise
router.put("/exercise/:exerciseId", sessions_controller_1.updateSessionExercise);
// Remove exercise from session
router.delete("/exercise/:exerciseId", sessions_controller_1.removeSessionExercise);
// Get sets/reps/rest for a specific exercise
router.get("/exercise/:exerciseId", sessions_controller_1.getSingleSessionExercise);
exports.default = router;
