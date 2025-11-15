"use client";

import { useEffect, useState } from "react";
import { ClientType } from "../schema/client.schema";
import { fetchClients } from "../services/client.services";

export function useClients() {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchClients();
      setClients(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load clients");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return { clients, loading, error, refresh };
}
