import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ------------------------------------
// CREATE BOOKING
// ------------------------------------
export async function createBooking(data: {
  clientId: number;
  date: Date;
  status: string;
}) {
  return prisma.booking.create({
    data,
    include: {
      client: true,
      session: true,
    },
  });
}

// ------------------------------------
// GET BOOKINGS FOR A CLIENT
// ------------------------------------
export async function getBookingsForClient(clientId: number) {
  return prisma.booking.findMany({
    where: { clientId },
    orderBy: { date: "asc" },
    include: {
      session: {
        include: {
          exercises: {
            include: { template: true },
          },
        },
      },
    },
  });
}

// ------------------------------------
// GET SINGLE BOOKING
// ------------------------------------
export async function getSingleBooking(id: number) {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      client: true,
      session: {
        include: {
          exercises: {
            include: { template: true },
          },
        },
      },
    },
  });
}

// ------------------------------------
// UPDATE BOOKING STATUS
// ------------------------------------
export async function updateBookingStatus(id: number, status: string) {
  return prisma.booking.update({
    where: { id },
    data: { status },
    include: {
      session: true,
    },
  });
}

// ------------------------------------
// RESCHEDULE BOOKING
// ------------------------------------
export async function rescheduleBooking(id: number, date: Date) {
  return prisma.booking.update({
    where: { id },
    data: { date },
    include: {
      session: true,
    },
  });
}

// ------------------------------------
// DELETE BOOKING
// ------------------------------------
export async function deleteBooking(id: number) {
  return prisma.booking.delete({
    where: { id },
  });
}

// ------------------------------------
// DEFAULT BOOKING
// ------------------------------------
export async function createDefaultSessionForBooking(bookingId: number) {
  return prisma.trainingSession.create({
    data: {
      bookingId,
      title: "New Session",
      notes: null,
    },
    include: {
      booking: true, 
      exercises: {
        include: { template: true }
      }
    }
  });
}

