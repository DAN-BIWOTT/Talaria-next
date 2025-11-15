import { Router } from "express";
import {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from "../controllers/exerciseTemplates.controller";

const router = Router();

// --------------------------------------
// GET ALL EXERCISE TEMPLATES
// GET /api/exercise-templates
// --------------------------------------
router.get("/", getAllTemplates);

// --------------------------------------
// GET ONE TEMPLATE
// GET /api/exercise-templates/:id
// --------------------------------------
router.get("/:id", getTemplateById);

// --------------------------------------
// CREATE TEMPLATE
// POST /api/exercise-templates
// --------------------------------------
router.post("/", createTemplate);

// --------------------------------------
// UPDATE TEMPLATE
// PUT /api/exercise-templates/:id
// --------------------------------------
router.put("/:id", updateTemplate);

// --------------------------------------
// DELETE TEMPLATE
// DELETE /api/exercise-templates/:id
// --------------------------------------
router.delete("/:id", deleteTemplate);

export default router;
