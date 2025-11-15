import { Request, Response } from "express";
import * as clientService from "../services/clients.service";

// GET /api/clients
export async function getAllClients(req: Request, res: Response) {
  try {
    const clients = await clientService.getAllClients();
    return res.json(clients);
  } catch (error) {
    console.error("❌ Error fetching clients:", error);
    return res.status(500).json({ message: "Failed to fetch clients" });
  }
}

// GET /api/clients/:id
export async function getClientById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid client ID" });

    const client = await clientService.getClientById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    return res.json(client);
  } catch (error) {
    console.error("❌ Error fetching client:", error);
    return res.status(500).json({ message: "Failed to fetch client" });
  }
}

// POST /api/clients
export async function createClient(req: Request, res: Response) {
  try {
    const { name, email, goal } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const newClient = await clientService.createClient({ name, email, goal });
    return res.status(201).json(newClient);
  } catch (error: any) {
    console.error("❌ Error creating client:", error);

    if (error.code === "P2002") {
      return res.status(409).json({ message: "Client with that email already exists" });
    }

    return res.status(500).json({ message: "Failed to create client" });
  }
}

// PUT /api/clients/:id
export async function updateClient(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { name, email, goal } = req.body;

    if (isNaN(id)) return res.status(400).json({ message: "Invalid client ID" });

    const updated = await clientService.updateClient(id, { name, email, goal });

    return res.json(updated);
  } catch (error) {
    console.error("❌ Error updating client:", error);
    return res.status(500).json({ message: "Failed to update client" });
  }
}

// DELETE /api/clients/:id
export async function deleteClient(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid client ID" });

    await clientService.deleteClient(id);
    return res.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting client:", error);
    return res.status(500).json({ message: "Failed to delete client" });
  }
}
