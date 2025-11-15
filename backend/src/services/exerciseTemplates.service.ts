import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --------------------------------------------------
// GET ALL EXERCISE TEMPLATES
// --------------------------------------------------
export async function getAllTemplates() {
  return prisma.exerciseTemplate.findMany({
    orderBy: { name: "asc" },
  });
}

// --------------------------------------------------
// GET ONE TEMPLATE BY ID
// --------------------------------------------------
export async function getTemplateById(id: number) {
  return prisma.exerciseTemplate.findUnique({
    where: { id },
  });
}

// --------------------------------------------------
// CREATE NEW TEMPLATE
// --------------------------------------------------
export async function createTemplate(data: {
  name: string;
  category?: string;
  primaryMuscle?: string;
  secondaryMuscle?: string;
  equipment?: string;
  videoURL?: string;
  description?: string;
}) {
  return prisma.exerciseTemplate.create({
    data,
  });
}

// --------------------------------------------------
// UPDATE TEMPLATE
// --------------------------------------------------
export async function updateTemplate(
  id: number,
  data: {
    name?: string;
    category?: string;
    primaryMuscle?: string;
    secondaryMuscle?: string;
    equipment?: string;
    videoURL?: string;
    description?: string;
  }
) {
  return prisma.exerciseTemplate.update({
    where: { id },
    data,
  });
}

// --------------------------------------------------
// DELETE TEMPLATE
// --------------------------------------------------
export async function deleteTemplate(id: number) {
  return prisma.exerciseTemplate.delete({
    where: { id },
  });
}
