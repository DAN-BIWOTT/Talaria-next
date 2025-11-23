"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_controller_1 = require("../controllers/clients.controller");
const router = (0, express_1.Router)();
// GET /api/clients
router.get("/", clients_controller_1.getAllClients);
// GET /api/clients/:id
router.get("/:id", clients_controller_1.getClientById);
// POST /api/clients
router.post("/", clients_controller_1.createClient);
// PUT /api/clients/:id
router.put("/:id", clients_controller_1.updateClient);
// DELETE /api/clients/:id
router.delete("/:id", clients_controller_1.deleteClient);
exports.default = router;
