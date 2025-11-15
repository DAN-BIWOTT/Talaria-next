import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET ALL CLIENTS
export async function getAllClients() {
  return prisma.client.findMany({
    orderBy: { id: "asc" },
  });
}

// GET CLIENT BY ID
export async function getClientById(id: number) {
  return prisma.client.findUnique({
    where: { id },
    include: {
      bookings: {
        include: {
          session: true,  // includes TrainingSession if needed
        },
      },
    },
  });
}

// CREATE CLIENT
export async function createClient(data: { name: string; email: string; goal?: string }) {
  return prisma.client.create({
    data,
  });
}

// UPDATE CLIENT
export async function updateClient(
  id: number,
  data: { name?: string; email?: string; goal?: string }
) {
  return prisma.client.update({
    where: { id },
    data,
  });
}

// DELETE CLIENT
export async function deleteClient(id: number) {
  return prisma.client.delete({
    where: { id },
  });
}
