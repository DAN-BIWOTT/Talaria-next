"use client";

import { Card, CardContent } from "../../components/ui/card";
import { Loader2 } from "lucide-react";
import { useSessionExercise } from "./hooks/useSessionExercise";

interface Props {
  selectedExerciseId: number | null;
}

export default function ExerciseDetail({ selectedExerciseId }: Props) {
  const { exercise, loading, error } = useSessionExercise(selectedExerciseId);

  if (!selectedExerciseId) {
    return (
      <div className="bg-white p-6 text-gray-500 flex items-center justify-center">
        Select an exercise to view details.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="bg-white p-6 text-gray-500 flex items-center justify-center">
        Failed to load exercise.
      </div>
    );
  }

  const t = exercise.template;

  return (
    <section className="bg-white p-6 overflow-y-auto h-full">
      <Card className="shadow-sm border">
        <CardContent className="p-4 flex flex-col gap-4">

          {/* HEADER */}
          <header>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {t.name}
            </h2>

            <p className="text-sm text-gray-500">
              {t.category || "Exercise"} • {t.equipment || "-"}
            </p>
          </header>

          {/* VIDEO */}
          {t.videoURL && (
            <div className="aspect-video rounded-lg overflow-hidden border">
              <iframe
                src={t.videoURL.replace("watch?v=", "embed/")}
                title={t.name}
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {/* DETAILS */}
          <div className="text-sm text-gray-700 space-y-2">

            <p>
              <strong>Muscles:</strong>{" "}
              {[
                t.primaryMuscle,
                t.secondaryMuscle,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>

            <p>
              <strong>Sets/Reps:</strong>{" "}
              {exercise.sets} × {exercise.reps}
            </p>

            {exercise.rest && (
              <p>
                <strong>Rest:</strong> {exercise.rest}
              </p>
            )}

            {t.description && (
              <p className="whitespace-pre-line">
                <strong>Notes:</strong> {t.description}
              </p>
            )}
          </div>

        </CardContent>
      </Card>
    </section>
  );
}
