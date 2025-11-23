// modules/clients/services/client.services.ts

import { API_URL } from "../../../utils/api";
import {
  ClientSchema,
  ClientListSchema,
  NewClientInput,
  UpdateClientInput,
} from "../schema/client.schema";

// -------------------------------------------
// Fetch ALL clients
// -------------------------------------------
export async function fetchClients() {
  const res = await fetch(`${API_URL}/api/clients`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to load clients");

  const json = await res.json();

  const parsed = ClientListSchema.safeParse(json);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid client response format");
  }

  return parsed.data;
}

// -------------------------------------------
// Fetch one client by ID
// -------------------------------------------
export async function fetchClientById(id: number) {
  const res = await fetch(`${API_URL}/api/clients/${id}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Client not found");

  const json = await res.json();

  const parsed = ClientSchema.safeParse(json);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid client format");
  }

  return parsed.data;
}

// -------------------------------------------
// Create new client
// -------------------------------------------
export async function createClient(data: NewClientInput) {
  const res = await fetch(`${API_URL}/api/clients`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create client");

  const json = await res.json();

  const parsed = ClientSchema.safeParse(json);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid client format");
  }

  return parsed.data;
}

// -------------------------------------------
// Update client
// -------------------------------------------
export async function updateClient(id: number, data: UpdateClientInput) {
  const res = await fetch(`${API_URL}/api/clients/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update client");

  const json = await res.json();

  const parsed = ClientSchema.safeParse(json);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid client format");
  }

  return parsed.data;
}

// -------------------------------------------
// Delete client
// -------------------------------------------
export async function deleteClient(id: number) {
  const res = await fetch(`${API_URL}/api/clients/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete client");

  return true;
}
