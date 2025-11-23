"use client";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import AddSessionExerciseModal from "./AddSessionExerciseModal";
import { useSessionExercises } from "../hooks/useSessionExercises";
import React from "react";
import { SessionExerciseSchemaType } from "../schema/sessionExercises.schema";

interface Props {
  sessionId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (exerciseId: number) => void;
}

export default function SessionExercisesDrawer({
  sessionId,
  isOpen,
  onClose,
  onEdit,
}: Props) {
  const {
    exercises,
    loading,
    error,
    setExercises,
    removeExercise,
    refresh
  } = useSessionExercises(sessionId);

  const [showAddModal, setShowAddModal] = React.useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-50 p-4 flex flex-col animate-slide-in">
        <header className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-800 text-sm">
            Session Exercises
          </h2>
          <Button size="sm" variant="outline" onClick={onClose}>
            ✕
          </Button>
        </header>
        <Button
          size="sm"
          className="mb-3"
          onClick={() => setShowAddModal(true)}
          disabled={!sessionId}
        >
          + Add Exercise
        </Button>

        {loading && <p className="text-gray-500 text-sm">Loading…</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && exercises.length === 0 && (
          <p className="text-gray-400 text-xs">No exercises in session yet.</p>
        )}

        <div className="flex flex-col gap-2 overflow-y-auto">
          {exercises.map((ex: SessionExerciseSchemaType) => (
            <Card key={ex.id} className="hover:shadow-sm transition">
              <CardContent className="p-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{ex.template.name}</p>
                  <p className="text-xs text-gray-500">
                    {ex.sets}×{ex.reps} — {ex.rest ?? "no rest"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(ex.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeExercise(ex.id)}
                  >
                    ✕
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </aside>

      {/* Add Modal */}
      <AddSessionExerciseModal
        sessionId={sessionId}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdded={async (newEx) => {
          setExercises((prev: any) => [...prev, newEx]); // optimistic update
          await refresh();                          // force re-sync from DB
          setShowAddModal(false);
        }}
      />

    </>
  );
}
