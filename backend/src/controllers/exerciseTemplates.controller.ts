import { Request, Response } from "express";
import * as templateService from "../services/exerciseTemplates.service";

// --------------------------------------------------
// GET ALL EXERCISE TEMPLATES
// GET /api/exercise-templates
// --------------------------------------------------
export async function getAllTemplates(req: Request, res: Response) {
  try {
    const templates = await templateService.getAllTemplates();
    return res.json(templates);
  } catch (error) {
    console.error("❌ Error fetching templates:", error);
    return res.status(500).json({ message: "Failed to fetch exercise templates" });
  }
}

// --------------------------------------------------
// GET ONE TEMPLATE
// GET /api/exercise-templates/:id
// --------------------------------------------------
export async function getTemplateById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid template ID" });

    const template = await templateService.getTemplateById(id);
    if (!template) return res.status(404).json({ message: "Template not found" });

    return res.json(template);
  } catch (error) {
    console.error("❌ Error fetching template:", error);
    return res.status(500).json({ message: "Failed to fetch template" });
  }
}

// --------------------------------------------------
// CREATE TEMPLATE
// POST /api/exercise-templates
// --------------------------------------------------
export async function createTemplate(req: Request, res: Response) {
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
  } catch (error: any) {
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
export async function updateTemplate(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    if (isNaN(id)) return res.status(400).json({ message: "Invalid template ID" });

    const updated = await templateService.updateTemplate(id, data);
    return res.json(updated);
  } catch (error) {
    console.error("❌ Error updating template:", error);
    return res.status(500).json({ message: "Failed to update exercise template" });
  }
}

// --------------------------------------------------
// DELETE TEMPLATE
// DELETE /api/exercise-templates/:id
// --------------------------------------------------
export async function deleteTemplate(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ message: "Invalid template ID" });

    await templateService.deleteTemplate(id);

    return res.json({ message: "Template deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting template:", error);
    return res.status(500).json({ message: "Failed to delete exercise template" });
  }
}
