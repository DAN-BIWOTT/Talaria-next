// hooks/useWorkouts.ts

"use client";

import { useEffect, useState, useMemo } from "react";
import { workoutService } from "../services/workout.service";
import { MuscleGroup, Workout } from "../type";


export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"all" | "shared" | "private">("all");
  const [muscle, setMuscle] = useState<MuscleGroup | "all">("all");
  const [sortBy, setSortBy] = useState("recent");

  // Load workouts
  useEffect(() => {
    const load = async () => {
      try {
        const data = await workoutService.getAll();
        setWorkouts(data);
      } catch (err) {
        setError("Failed to load workouts");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filtering logic
  const filteredWorkouts = useMemo(() => {
    let list = [...workouts];

    if (search.trim()) {
      list = list.filter((w) =>
        w.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== "all") {
      list = list.filter((w) => (type === "shared" ? w.shared : !w.shared));
    }

    if (muscle !== "all") {
      list = list.filter((w) =>
        w.notes?.includes(muscle)
      );
    }

    if (sortBy === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "exercises")
      list.sort((a, b) => b.exercises.length - a.exercises.length);

    return list;
  }, [workouts, search, type, muscle, sortBy]);

  // Mutations
  const create = async (payload: any) => {
    const newWorkout = await workoutService.create(payload);
    setWorkouts((prev) => [...prev, newWorkout]);
  };

  const update = async (payload: any) => {
    const updated = await workoutService.update(payload);
    setWorkouts((prev) =>
      prev.map((w) => (w.id === updated.id ? updated : w))
    );
  };

  const remove = async (id: number) => {
    await workoutService.delete(id);
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  return {
    workouts,
    filteredWorkouts,
    loading,
    error,
    search,
    type,
    muscle,
    sortBy,
    setSearch,
    setType,
    setMuscle,
    setSortBy,
    create,
    update,
    remove,
  };
}
