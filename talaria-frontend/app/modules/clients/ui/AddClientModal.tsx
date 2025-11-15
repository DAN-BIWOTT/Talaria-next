"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddClient } from "../hooks/useAddClient";
import { NewClientInput } from "../schema/client.schema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => Promise<void>;
}


export default function AddClientModal({ isOpen, onClose, onAdded }: Props) {
  const { addClient, loading, error } = useAddClient();
  
  const [form, setForm] = useState<NewClientInput>({
    name: "",
    email: "",
    goal: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const created = await addClient(form);

    if (created) {
  await onAdded();   // refresh clients from parent
  onClose();
}
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Card className="w-[400px] bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Client</h2>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Client name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Input
              name="email"
              type="email"
              placeholder="Client email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Input
              name="goal"
              placeholder="Training goal (optional)"
              value={form.goal ?? ""}
              onChange={handleChange}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Client"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
