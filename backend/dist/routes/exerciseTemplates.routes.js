"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exerciseTemplates_controller_1 = require("../controllers/exerciseTemplates.controller");
const router = (0, express_1.Router)();
// --------------------------------------
// GET ALL EXERCISE TEMPLATES
// GET /api/exercise-templates
// --------------------------------------
router.get("/", exerciseTemplates_controller_1.getAllTemplates);
// --------------------------------------
// GET ONE TEMPLATE
// GET /api/exercise-templates/:id
// --------------------------------------
router.get("/:id", exerciseTemplates_controller_1.getTemplateById);
// --------------------------------------
// CREATE TEMPLATE
// POST /api/exercise-templates
// --------------------------------------
router.post("/", exerciseTemplates_controller_1.createTemplate);
// --------------------------------------
// UPDATE TEMPLATE
// PUT /api/exercise-templates/:id
// --------------------------------------
router.put("/:id", exerciseTemplates_controller_1.updateTemplate);
// --------------------------------------
// DELETE TEMPLATE
// DELETE /api/exercise-templates/:id
// --------------------------------------
router.delete("/:id", exerciseTemplates_controller_1.deleteTemplate);
exports.default = router;
