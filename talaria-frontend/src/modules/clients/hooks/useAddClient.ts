"use client";

import { useMutation } from "@tanstack/react-query";
import { createClient } from "../services/client.services";
import { NewClientInput, ClientType } from "../schema/client.schema";

export function useAddClient() {
  const mutation = useMutation<ClientType, Error, NewClientInput>({
    mutationFn: async (payload: NewClientInput) => {
      return await createClient(payload);
    },
  });

  return {
    addClient: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error?.message ?? null,
    data: mutation.data,
  };
}
