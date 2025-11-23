"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.getSessionById = getSessionById;
exports.updateSession = updateSession;
exports.deleteSession = deleteSession;
exports.addExerciseToSession = addExerciseToSession;
exports.updateSessionExercise = updateSessionExercise;
exports.removeSessionExercise = removeSessionExercise;
exports.getSingleSessionExercise = getSingleSessionExercise;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// --------------------------------------------------
// CREATE SESSION
// --------------------------------------------------
async function createSession(data) {
    return prisma.trainingSession.create({
        data,
        include: {
            booking: true,
            exercises: {
                include: { template: true },
            },
        },
    });
}
// --------------------------------------------------
// GET SESSION BY ID (with exercises + templates)
// --------------------------------------------------
async function getSessionById(id) {
    return prisma.trainingSession.findUnique({
        where: { id },
        include: {
            booking: {
                include: {
                    client: true,
                },
            },
            exercises: {
                include: { template: true },
            },
        },
    });
}
// --------------------------------------------------
// UPDATE SESSION
// --------------------------------------------------
async function updateSession(id, data) {
    return prisma.trainingSession.update({
        where: { id },
        data,
        include: {
            exercises: { include: { template: true } },
        },
    });
}
// --------------------------------------------------
// DELETE SESSION
// --------------------------------------------------
async function deleteSession(id) {
    return prisma.trainingSession.delete({
        where: { id },
    });
}
// --------------------------------------------------
// ADD EXERCISE TO SESSION
// --------------------------------------------------
async function addExerciseToSession(sessionId, data) {
    return prisma.trainingSessionExercise.create({
        data: {
            sessionId,
            templateId: data.templateId,
            sets: data.sets,
            reps: data.reps,
            rest: data.rest,
        },
        include: {
            template: true,
        },
    });
}
// --------------------------------------------------
// UPDATE EXISTING SESSION EXERCISE
// --------------------------------------------------
async function updateSessionExercise(exerciseId, data) {
    return prisma.trainingSessionExercise.update({
        where: { id: exerciseId },
        data,
        include: {
            template: true,
        },
    });
}
// --------------------------------------------------
// REMOVE EXERCISE FROM SESSION
// --------------------------------------------------
async function removeSessionExercise(exerciseId) {
    return prisma.trainingSessionExercise.delete({
        where: { id: exerciseId },
    });
}
// --------------------------------------------------
// SELECT ONE EXERCISE FROM SESSION
// --------------------------------------------------
async function getSingleSessionExercise(exerciseId) {
    return prisma.trainingSessionExercise.findUnique({
        where: { id: exerciseId },
        include: {
            template: true,
            session: true,
        },
    });
}
