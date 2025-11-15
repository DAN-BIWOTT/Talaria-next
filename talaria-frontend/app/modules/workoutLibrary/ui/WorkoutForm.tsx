"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Workout,
  WorkoutExercise,
  CreateWorkoutPayload,
  UpdateWorkoutPayload,
  Exercise,
} from "@/modules/workoutLibrary/type";

interface Props {
  editingWorkout: Workout | null;
  exercises: Exercise[]; // DB exercises
  onClose: () => void;
  onSave: (data: CreateWorkoutPayload | UpdateWorkoutPayload) => void;
}

export default function WorkoutForm({
  editingWorkout,
  exercises,
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = useState(editingWorkout?.title ?? "");
  const [shared, setShared] = useState(editingWorkout?.shared ?? false);
  const [notes, setNotes] = useState(editingWorkout?.notes ?? "");

  const [exerciseList, setExerciseList] = useState<WorkoutExercise[]>(
    editingWorkout?.exercises ?? []
  );

  // Toggle an exercise in/out of selected list
  const toggleExercise = (exerciseId: number) => {
    setExerciseList((prev) => {
      const exists = prev.some((e) => e.exerciseId === exerciseId);

      if (exists) {
        return prev.filter((e) => e.exerciseId !== exerciseId);
      } else {
        return [
          ...prev,
          {
            exerciseId,
            sets: 3,
            reps: 10,
            rest: "60s",
            id: Date.now(), // Temporary ID (DB will overwrite)
            workoutId: editingWorkout?.id ?? 0,
          },
        ];
      }
    });
  };

  const updateField = (
    exerciseId: number,
    field: keyof WorkoutExercise,
    value: any
  ) => {
    setExerciseList((prev) =>
      prev.map((e) =>
        e.exerciseId === exerciseId ? { ...e, [field]: value } : e
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: editingWorkout?.id,
      trainerId: editingWorkout?.trainerId ?? 1, // Hardcoded until auth added
      clientId: null,
      title,
      shared,
      notes,
      exercises: exerciseList.map((ex) => ({
        exerciseId: ex.exerciseId,
        sets: ex.sets,
        reps: ex.reps,
        rest: ex.rest,
      })),
    };

    onSave(
      editingWorkout
        ? (payload as UpdateWorkoutPayload)
        : (payload as CreateWorkoutPayload)
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-lg bg-white p-6 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {editingWorkout ? "Edit Workout" : "New Workout"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* TITLE */}
          <Input
            placeholder="Workout Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* SHARED */}
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={shared}
              onChange={(e) => setShared(e.target.checked)}
            />
            Shared Template
          </label>

          {/* NOTES */}
          <Textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e: any) => setNotes(e.target.value)}
          />

          {/* EXERCISE SELECTION */}
          <div>
            <h3 className="font-semibold mb-2 text-sm">Select Exercises</h3>

            <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto p-2 border rounded-lg">
              {exercises.map((ex) => {
                const selected = exerciseList.some(
                  (e) => e.exerciseId === ex.id
                );

                return (
                  <div
                    key={ex.id}
                    className={`p-3 rounded-lg border flex flex-col gap-2 cursor-pointer ${
                      selected
                        ? "bg-blue-50 border-blue-400"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleExercise(ex.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{ex.name}</span>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleExercise(ex.id)}
                      />
                    </div>

                    {selected && (
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <input
                          type="number"
                          value={
                            exerciseList.find((e) => e.exerciseId === ex.id)
                              ?.sets
                          }
                          min={1}
                          onChange={(e) =>
                            updateField(ex.id, "sets", Number(e.target.value))
                          }
                          className="border p-1 rounded"
                          placeholder="Sets"
                        />
                        <input
                          type="number"
                          value={
                            exerciseList.find((e) => e.exerciseId === ex.id)
                              ?.reps
                          }
                          min={1}
                          onChange={(e) =>
                            updateField(ex.id, "reps", Number(e.target.value))
                          }
                          className="border p-1 rounded"
                          placeholder="Reps"
                        />
                        <input
                          type="text"
                          value={
                            exerciseList.find((e) => e.exerciseId === ex.id)
                              ?.rest
                          }
                          onChange={(e) =>
                            updateField(ex.id, "rest", e.target.value)
                          }
                          className="border p-1 rounded"
                          placeholder="Rest"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 text-white">
              Save Workout
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
