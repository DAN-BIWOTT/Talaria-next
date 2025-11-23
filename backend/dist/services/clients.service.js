"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClients = getAllClients;
exports.getClientById = getClientById;
exports.createClient = createClient;
exports.updateClient = updateClient;
exports.deleteClient = deleteClient;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// GET ALL CLIENTS
async function getAllClients() {
    return prisma.client.findMany({
        orderBy: { id: "asc" },
    });
}
// GET CLIENT BY ID
async function getClientById(id) {
    return prisma.client.findUnique({
        where: { id },
        include: {
            bookings: {
                include: {
                    session: true, // includes TrainingSession if needed
                },
            },
        },
    });
}
// CREATE CLIENT
async function createClient(data) {
    return prisma.client.create({
        data,
    });
}
// UPDATE CLIENT
async function updateClient(id, data) {
    return prisma.client.update({
        where: { id },
        data,
    });
}
// DELETE CLIENT
async function deleteClient(id) {
    return prisma.client.delete({
        where: { id },
    });
}
