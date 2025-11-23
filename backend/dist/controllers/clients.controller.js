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
exports.getAllClients = getAllClients;
exports.getClientById = getClientById;
exports.createClient = createClient;
exports.updateClient = updateClient;
exports.deleteClient = deleteClient;
const clientService = __importStar(require("../services/clients.service"));
// GET /api/clients
async function getAllClients(req, res) {
    try {
        const clients = await clientService.getAllClients();
        return res.json(clients);
    }
    catch (error) {
        console.error("❌ Error fetching clients:", error);
        return res.status(500).json({ message: "Failed to fetch clients" });
    }
}
// GET /api/clients/:id
async function getClientById(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ message: "Invalid client ID" });
        const client = await clientService.getClientById(id);
        if (!client)
            return res.status(404).json({ message: "Client not found" });
        return res.json(client);
    }
    catch (error) {
        console.error("❌ Error fetching client:", error);
        return res.status(500).json({ message: "Failed to fetch client" });
    }
}
// POST /api/clients
async function createClient(req, res) {
    try {
        const { name, email, goal } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        const newClient = await clientService.createClient({ name, email, goal });
        return res.status(201).json(newClient);
    }
    catch (error) {
        console.error("❌ Error creating client:", error);
        if (error.code === "P2002") {
            return res.status(409).json({ message: "Client with that email already exists" });
        }
        return res.status(500).json({ message: "Failed to create client" });
    }
}
// PUT /api/clients/:id
async function updateClient(req, res) {
    try {
        const id = Number(req.params.id);
        const { name, email, goal } = req.body;
        if (isNaN(id))
            return res.status(400).json({ message: "Invalid client ID" });
        const updated = await clientService.updateClient(id, { name, email, goal });
        return res.json(updated);
    }
    catch (error) {
        console.error("❌ Error updating client:", error);
        return res.status(500).json({ message: "Failed to update client" });
    }
}
// DELETE /api/clients/:id
async function deleteClient(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ message: "Invalid client ID" });
        await clientService.deleteClient(id);
        return res.json({ message: "Client deleted successfully" });
    }
    catch (error) {
        console.error("❌ Error deleting client:", error);
        return res.status(500).json({ message: "Failed to delete client" });
    }
}
