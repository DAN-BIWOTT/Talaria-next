export interface Client {
  id: number;
  name: string;
  email: string;
  goal?: string;
  joinedAt: string;
}
export interface NewClientInput {
  name: string;
  email: string;
  goal?: string;
}

export interface UpdateClientInput {
  name?: string;
  email?: string;
  goal?: string;
}