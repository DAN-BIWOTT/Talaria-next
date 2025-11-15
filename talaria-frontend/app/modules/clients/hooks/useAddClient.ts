"use client";

import { useState } from "react";
import { createClient } from "../services/client.services";
import { NewClientInput, ClientType } from "../schema/client.schema";

export function useAddClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addClient(data: NewClientInput): Promise<ClientType | null> {
    setLoading(true);
    setError(null);

    try {
      const created = await createClient(data);
      return created; // component decides what to do with it
    } catch (err: any) {
      setError(err.message ?? "Failed to create client");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { addClient, loading, error };
}
