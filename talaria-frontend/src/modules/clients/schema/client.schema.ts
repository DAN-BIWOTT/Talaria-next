import { z } from "zod";

export const ClientSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  goal: z.string().nullable().optional(),
  joinedAt: z.string(), // ISO timestamp
});

export const NewClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  goal: z.string().optional(),
});

export const UpdateClientSchema = NewClientSchema.partial();

export const ClientListSchema = z.array(ClientSchema);

export type ClientType = z.infer<typeof ClientSchema>;
export type NewClientInput = z.infer<typeof NewClientSchema>;
export type UpdateClientInput = z.infer<typeof UpdateClientSchema>;
