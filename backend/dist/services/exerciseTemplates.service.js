"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTemplates = getAllTemplates;
exports.getTemplateById = getTemplateById;
exports.createTemplate = createTemplate;
exports.updateTemplate = updateTemplate;
exports.deleteTemplate = deleteTemplate;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// --------------------------------------------------
// GET ALL EXERCISE TEMPLATES
// --------------------------------------------------
async function getAllTemplates() {
    return prisma.exerciseTemplate.findMany({
        orderBy: { name: "asc" },
    });
}
// --------------------------------------------------
// GET ONE TEMPLATE BY ID
// --------------------------------------------------
async function getTemplateById(id) {
    return prisma.exerciseTemplate.findUnique({
        where: { id },
    });
}
// --------------------------------------------------
// CREATE NEW TEMPLATE
// --------------------------------------------------
async function createTemplate(data) {
    return prisma.exerciseTemplate.create({
        data,
    });
}
// --------------------------------------------------
// UPDATE TEMPLATE
// --------------------------------------------------
async function updateTemplate(id, data) {
    return prisma.exerciseTemplate.update({
        where: { id },
        data,
    });
}
// --------------------------------------------------
// DELETE TEMPLATE
// --------------------------------------------------
async function deleteTemplate(id) {
    return prisma.exerciseTemplate.delete({
        where: { id },
    });
}
