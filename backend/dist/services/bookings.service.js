"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = createBooking;
exports.getBookingsForClient = getBookingsForClient;
exports.getSingleBooking = getSingleBooking;
exports.updateBookingStatus = updateBookingStatus;
exports.rescheduleBooking = rescheduleBooking;
exports.deleteBooking = deleteBooking;
exports.createDefaultSessionForBooking = createDefaultSessionForBooking;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ------------------------------------
// CREATE BOOKING
// ------------------------------------
async function createBooking(data) {
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
async function getBookingsForClient(clientId) {
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
async function getSingleBooking(id) {
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
async function updateBookingStatus(id, status) {
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
async function rescheduleBooking(id, date) {
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
async function deleteBooking(id) {
    return prisma.booking.delete({
        where: { id },
    });
}
// ------------------------------------
// DEFAULT BOOKING
// ------------------------------------
async function createDefaultSessionForBooking(bookingId) {
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
