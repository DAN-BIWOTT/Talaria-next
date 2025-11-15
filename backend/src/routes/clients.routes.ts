import { Router } from "express";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller";

const router = Router();

// GET /api/clients
router.get("/", getAllClients);

// GET /api/clients/:id
router.get("/:id", getClientById);

// POST /api/clients
router.post("/", createClient);

// PUT /api/clients/:id
router.put("/:id", updateClient);

// DELETE /api/clients/:id
router.delete("/:id", deleteClient);

export default router;
