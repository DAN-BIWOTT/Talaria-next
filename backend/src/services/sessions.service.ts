import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// --------------------------------------------------
// CREATE SESSION
// --------------------------------------------------
export async function createSession(data: {
  bookingId: number;
  title: string;
  notes?: string;
}) {
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
export async function getSessionById(id: number) {
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
export async function updateSession(
  id: number,
  data: { title?: string; notes?: string }
) {
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
export async function deleteSession(id: number) {
  return prisma.trainingSession.delete({
    where: { id },
  });
}

// --------------------------------------------------
// ADD EXERCISE TO SESSION
// --------------------------------------------------
export async function addExerciseToSession(
  sessionId: number,
  data: {
    templateId: number;
    sets: number;
    reps: string;
    rest: string;
  }
) {
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
export async function updateSessionExercise(
  exerciseId: number,
  data: { sets?: number; reps?: string; rest?: string }
) {
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
export async function removeSessionExercise(exerciseId: number) {
  return prisma.trainingSessionExercise.delete({
    where: { id: exerciseId },
  });
}

// --------------------------------------------------
// SELECT ONE EXERCISE FROM SESSION
// --------------------------------------------------
export async function getSingleSessionExercise(exerciseId: number) {
  return prisma.trainingSessionExercise.findUnique({
    where: { id: exerciseId },
    include: {
      template: true,
      session: true,
    },
  });
}

