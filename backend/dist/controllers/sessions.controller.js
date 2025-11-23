"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.getSessionById = getSessionById;
exports.updateSession = updateSession;
exports.deleteSession = deleteSession;
exports.addExerciseToSession = addExerciseToSession;
exports.updateSessionExercise = updateSessionExercise;
exports.removeSessionExercise = removeSessionExercise;
exports.getSingleSessionExercise = getSingleSessionExercise;
const sessionService = __importStar(require("../services/sessions.service"));
// --------------------------------------------------
// CREATE SESSION
// POST /api/sessions
// --------------------------------------------------
async function createSession(req, res) {
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
    }
    catch (error) {
        console.error("❌ Error creating session:", error);
        return res.status(500).json({ message: "Failed to create session" });
    }
}
// --------------------------------------------------
// GET SESSION BY ID
// GET /api/sessions/:id
// --------------------------------------------------
async function getSessionById(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ message: "Invalid session ID" });
        const session = await sessionService.getSessionById(id);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        return res.json(session);
    }
    catch (error) {
        console.error("❌ Error fetching session:", error);
        return res.status(500).json({ message: "Failed to fetch session" });
    }
}
// --------------------------------------------------
// UPDATE SESSION
// PUT /api/sessions/:id
// --------------------------------------------------
async function updateSession(req, res) {
    try {
        const id = Number(req.params.id);
        const { title, notes } = req.body;
        if (isNaN(id))
            return res.status(400).json({ message: "Invalid session ID" });
        const updated = await sessionService.updateSession(id, { title, notes });
        return res.json(updated);
    }
    catch (error) {
        console.error("❌ Error updating session:", error);
        return res.status(500).json({ message: "Failed to update session" });
    }
}
// --------------------------------------------------
// DELETE SESSION
// DELETE /api/sessions/:id
// --------------------------------------------------
async function deleteSession(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ message: "Invalid session ID" });
        await sessionService.deleteSession(id);
        return res.json({ message: "Session deleted successfully" });
    }
    catch (error) {
        console.error("❌ Error deleting session:", error);
        return res.status(500).json({ message: "Failed to delete session" });
    }
}
// --------------------------------------------------
// ADD EXERCISE TO SESSION
// POST /api/sessions/:id/exercises
// --------------------------------------------------
async function addExerciseToSession(req, res) {
    try {
        const sessionId = Number(req.params.id);
        const { templateId, sets, reps, rest } = req.body;
        if (isNaN(sessionId))
            return res.status(400).json({ message: "Invalid session ID" });
        if (!templateId)
            return res.status(400).json({ message: "templateId is required" });
        const created = await sessionService.addExerciseToSession(sessionId, {
            templateId: Number(templateId),
            sets: Number(sets) ?? 3,
            reps: reps ?? "10",
            rest: rest ?? "90s",
        });
        return res.status(201).json(created);
    }
    catch (error) {
        console.error("❌ Error adding exercise:", error);
        return res.status(500).json({ message: "Failed to add exercise" });
    }
}
// --------------------------------------------------
// UPDATE EXERCISE IN SESSION
// PUT /api/sessions/exercise/:exerciseId
// --------------------------------------------------
async function updateSessionExercise(req, res) {
    try {
        const exerciseId = Number(req.params.exerciseId);
        const { sets, reps, rest } = req.body;
        if (isNaN(exerciseId))
            return res.status(400).json({ message: "Invalid exercise ID" });
        const updated = await sessionService.updateSessionExercise(exerciseId, {
            sets: sets ? Number(sets) : undefined,
            reps,
            rest,
        });
        return res.json(updated);
    }
    catch (error) {
        console.error("❌ Error updating session exercise:", error);
        return res.status(500).json({ message: "Failed to update exercise" });
    }
}
// --------------------------------------------------
// REMOVE EXERCISE FROM SESSION
// DELETE /api/sessions/exercise/:exerciseId
// --------------------------------------------------
async function removeSessionExercise(req, res) {
    try {
        const exerciseId = Number(req.params.exerciseId);
        if (isNaN(exerciseId))
            return res.status(400).json({ message: "Invalid exercise ID" });
        await sessionService.removeSessionExercise(exerciseId);
        return res.json({ message: "Exercise removed from session" });
    }
    catch (error) {
        console.error("❌ Error removing exercise:", error);
        return res.status(500).json({ message: "Failed to remove exercise" });
    }
}
// --------------------------------------------------
// GET A SINGLE EXERCISE FROM SESSION
// GET /api/sessions/exercise/:exerciseId
// --------------------------------------------------
async function getSingleSessionExercise(req, res) {
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
    }
    catch (error) {
        console.error("❌ Error fetching exercise:", error);
        return res.status(500).json({ message: "Failed to fetch exercise" });
    }
}
