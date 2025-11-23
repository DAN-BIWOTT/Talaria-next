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
exports.getAllTemplates = getAllTemplates;
exports.getTemplateById = getTemplateById;
exports.createTemplate = createTemplate;
exports.updateTemplate = updateTemplate;
exports.deleteTemplate = deleteTemplate;
const templateService = __importStar(require("../services/exerciseTemplates.service"));
// --------------------------------------------------
// GET ALL EXERCISE TEMPLATES
// GET /api/exercise-templates
// --------------------------------------------------
async function getAllTemplates(req, res) {
    try {
        const templates = await templateService.getAllTemplates();
        return res.json(templates);
    }
    catch (error) {
        console.error("❌ Error fetching templates:", error);
        return res.status(500).json({ message: "Failed to fetch exercise templates" });
    }
}
// --------------------------------------------------
// GET ONE TEMPLATE
// GET /api/exercise-templates/:id
// --------------------------------------------------
async function getTemplateById(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ message: "Invalid template ID" });
        const template = await templateService.getTemplateById(id);
        if (!template)
            return res.status(404).json({ message: "Template not found" });
        return res.json(template);
    }
    catch (error) {
        console.error("❌ Error fetching template:", error);
        return res.status(500).json({ message: "Failed to fetch template" });
    }
}
// --------------------------------------------------
// CREATE TEMPLATE
// POST /api/exercise-templates
// --------------------------------------------------
async function createTemplate(req, res) {
    try {
        const { name, category, primaryMuscle, secondaryMuscle, equipment, videoURL, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const created = await templateService.createTemplate({
            name,
            category,
            primaryMuscle,
            secondaryMuscle,
            equipment,
            videoURL,
            description,
        });
        return res.status(201).json(created);
    }
    catch (error) {
        console.error("❌ Error creating template:", error);
        if (error.code === "P2002") {
            return res.status(409).json({ message: "Template with this name already exists" });
        }
        return res.status(500).json({ message: "Failed to create exercise template" });
    }
}
// --------------------------------------------------
// UPDATE TEMPLATE
// PUT /api/exercise-templates/:id
// --------------------------------------------------
async function updateTemplate(req, res) {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        if (isNaN(id))
            return res.status(400).json({ message: "Invalid template ID" });
        const updated = await templateService.updateTemplate(id, data);
        return res.json(updated);
    }
    catch (error) {
        console.error("❌ Error updating template:", error);
        return res.status(500).json({ message: "Failed to update exercise template" });
    }
}
// --------------------------------------------------
// DELETE TEMPLATE
// DELETE /api/exercise-templates/:id
// --------------------------------------------------
async function deleteTemplate(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ message: "Invalid template ID" });
        await templateService.deleteTemplate(id);
        return res.json({ message: "Template deleted successfully" });
    }
    catch (error) {
        console.error("❌ Error deleting template:", error);
        return res.status(500).json({ message: "Failed to delete exercise template" });
    }
}
