"use client";

import React, { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

import { addSessionExercise } from "../services/sessionExercises.services";
import { NewSessionExerciseInput } from "../types/sessionExercises.types";
import { useExerciseTemplates } from "../hooks/useExerciseTemplates";

interface Props {
  sessionId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onAdded: (exercise: any) => void; // your hook validates final type
}

export default function AddSessionExerciseModal({
  sessionId,
  isOpen,
  onClose,
  onAdded,
}: Props) {
  
  const { templates, loading, error } = useExerciseTemplates();

  const [templateId, setTemplateId] = useState<number | null>(null);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState("10");
  const [rest, setRest] = useState("60s");

  if (!isOpen || !sessionId) return null;
  const id = sessionId;
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (templateId === null) return;

    const input: NewSessionExerciseInput = {
      templateId,
      sets,
      reps,
      rest,
    };

   
    const created = await addSessionExercise(id, input);
    onAdded(created);
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
        <Card className="w-[400px] bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Add Exercise to Session
          </h2>
          {/* Loading / Error states */}
          {loading && (
            <p className="text-sm text-gray-500 mb-2">Loading templates…</p>
          )}
          {error && (
            <p className="text-sm text-red-500 mb-2">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="text-sm font-medium">Exercise Template</label>

            <select
              className="border p-2 rounded text-sm"
              value={templateId ?? ""}
              onChange={(e) => setTemplateId(Number(e.target.value))}
              required
            >
              <option value="">-- Choose an exercise --</option>

              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* Inputs */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-600">Sets</label>
                <input
                  type="number"
                  min={1}
                  className="border p-2 rounded w-full text-sm"
                  value={sets}
                  onChange={(e) => setSets(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600">Reps</label>
                <input
                  className="border p-2 rounded w-full text-sm"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600">Rest</label>
                <input
                  className="border p-2 rounded w-full text-sm"
                  value={rest}
                  onChange={(e) => setRest(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
