// services/workout.service.ts

import { CreateWorkoutInput, UpdateWorkoutInput } from "../schema/workout.schema";
import { Workout } from "../type";

export const workoutService = {
  async getAll(): Promise<Workout[]> {
    const res = await fetch("/api/workouts", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch workouts");
    return res.json();
  },

  async create(data: CreateWorkoutInput): Promise<Workout> {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to create workout");
    return res.json();
  },

  async update(id: number, data: UpdateWorkoutInput): Promise<Workout> {
    const res = await fetch(`/api/workouts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to update workout");
    return res.json();
  },

  async delete(id: number) {
    const res = await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete workout");
    return true;
  },
};
