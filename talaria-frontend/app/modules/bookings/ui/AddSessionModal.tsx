"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateSession } from "../hooks/useCreateSession";

interface Props {
  clientId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onCreated: (session: any) => void;  // parent updates the list
}

export default function AddSessionModal({
  clientId,
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const { createSession, loading } = useCreateSession();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");

  if (!isOpen) return null;
  if (!clientId) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !date) return;
    if (clientId === null) return;
   
    const payload = {
      clientId,
      date,
      title,
      notes: notes || null,
    };
    
    const created = await createSession(payload);
    if (!created) return;

    onCreated(created);  
    onClose();
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
        <Card className="w-[420px] bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Add Training Session
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Session Title
              </label>
              <input
                className="border p-2 rounded w-full text-sm"
                placeholder="e.g. Upper Body Strength"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                className="border p-2 rounded w-full text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes (optional)
              </label>
              <textarea
                className="border p-2 rounded w-full text-sm"
                rows={3}
                placeholder="Any notes for this session..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? "Creating…" : "Create Session"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
