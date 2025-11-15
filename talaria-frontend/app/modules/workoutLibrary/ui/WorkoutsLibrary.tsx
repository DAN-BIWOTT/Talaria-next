"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dumbbell,
  Edit3,
  Trash2,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import WorkoutForm from "./WorkoutForm";

import { workoutService } from "../services/workout.service";

export default function WorkoutsLibrary() {
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<number | null>(null);
const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

  // Local state until backend is connected
const [workouts, setWorkouts] = useState<any[]>([]);
useEffect(() => {
  workoutService.getAll().then(setWorkouts);
}, []);


  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "shared" | "private">("all");
  const [muscleFilter, setMuscleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // After DB integration → replace with server-side filters
  const filteredWorkouts = useMemo(() => {
    let list = [...workouts];

    // Search
    if (search.trim()) {
      list = list.filter((w) =>
        w.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Shared / Private filter
    if (typeFilter !== "all") {
      list = list.filter((w) =>
        typeFilter === "shared" ? w.shared : !w.shared
      );
    }

    // Muscle filter (example logic)
   if (muscleFilter !== "all") {
  list = list.filter((w) =>
    w.exercises.some((ex) => {
      const ref = exercises.find((e) => e.id === ex.id);

      return ref?.muscleGroups?.includes(muscleFilter);
    })
  );
}



    // Sorting
    if (sortBy === "recent") {
      list.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    if (sortBy === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "exercises") {
      list.sort((a, b) => b.exercises.length - a.exercises.length);
    }

    return list;
  }, [workouts, search, typeFilter, muscleFilter, sortBy]);

  const handleDelete = (id: number) => {
    if (confirm("Delete this workout?")) {
      setWorkouts((prev) => prev.filter((w) => w.id !== id));
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      {/* ===== HEADER ===== */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <Dumbbell className="text-blue-600" size={26} />
            Workouts Library
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Build & organize structured programs for your clients.
          </p>
        </div>

        <Button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow"
        >
          <Plus size={16} /> New Workout
        </Button>
      </div>

      {/* ===== FILTER BAR ===== */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* --- LEFT: Search --- */}
          <div className="flex items-center gap-2 w-full lg:w-1/3">
            <Search className="text-gray-500" size={18} />
            <Input
              placeholder="Search workouts..."
              value={search}
              onChange={(e:any) => setSearch(e.target.value)}
              className="bg-gray-50"
            />
          </div>

          {/* --- RIGHT: Filters --- */}
          <div className="flex flex-wrap gap-3 items-center justify-end">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="border rounded-lg px-3 py-2 text-sm bg-gray-50"
            >
              <option value="all">All Types</option>
              <option value="shared">Shared</option>
              <option value="private">Private</option>
            </select>

           <select
  value={muscleFilter}
  onChange={(e) => setMuscleFilter(e.target.value)}
  className="border rounded-lg px-3 py-2 text-sm bg-gray-50"
>
  <option value="all">All Muscle Groups</option>
  <option value="chest">Chest</option>
  <option value="legs">Legs</option>
  <option value="back">Back</option>
  <option value="shoulders">Shoulders</option>
  <option value="arms">Arms</option>
  <option value="core">Core</option>
</select>


            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-gray-50"
            >
              <option value="recent">Newest First</option>
              <option value="az">A → Z</option>
              <option value="exercises">Most Exercises</option>
            </select>

            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <SlidersHorizontal size={16} />
              Filters
            </div>
          </div>
        </div>
      </div>

      {/* ===== WORKOUT GRID ===== */}
      <div className="max-w-7xl mx-auto">
        {filteredWorkouts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 mt-24">
            <Dumbbell className="opacity-40 mb-3" size={48} />
            <p>No workouts match your filters.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredWorkouts.map((w) => (
              <Card
                key={w.id}
                className="border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 bg-white rounded-xl"
              >
                <CardContent className="p-5 flex flex-col gap-3">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {w.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        w.shared
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {w.shared ? "Shared" : "Private"}
                    </span>
                  </div>

                  {/* Meta */}
                  <p className="text-xs text-gray-500">
                    {new Date(w.date).toLocaleDateString()} •{" "}
                    {w.exercises.length} exercises
                  </p>

                  {/* List */}
                  <ul className="text-sm text-gray-700 space-y-1 mt-2">
                    {w.exercises.slice(0, 3).map((ex) => {
                      const ref = exercises.find((e) => e.id === ex.id);
                      return (
                        <li key={ex.id} className="truncate text-gray-700">
                          {ref?.name}
                        </li>
                      );
                    })}
                    {w.exercises.length > 3 && (
                      <li className="text-gray-400 italic">+ more...</li>
                    )}
                  </ul>

                  {/* Actions */}
                  <div className="mt-5 flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingWorkout(w.id);
                        setShowForm(true);
                      }}
                      className="flex items-center gap-1"
                    >
                      <Edit3 size={14} /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(w.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* ===== Create/Edit Modal ===== */}
{showForm && (
  <WorkoutForm
    editingWorkout={workouts.find((w) => w.id === editingWorkout) ?? null}
    exercises={exercises} // <-- fetched from DB
    onClose={() => {
      setShowForm(false);
      setEditingWorkout(null);
    }}
    onSave={async (payload) => {
  try {
    let saved;

    if ("id" in payload) {
      // UPDATE
      saved = await workoutService.update(payload.id, payload);
    } else {
      // CREATE
      saved = await workoutService.create(payload);
    }

    setWorkouts((prev: any) => {
      const exists = prev.find((w: any) => w.id === saved.id);
      return exists
        ? prev.map((w: any) => (w.id === saved.id ? saved : w))
        : [...prev, saved];
    });
  } catch (err) {
    console.error("Failed to save workout", err);
  } finally {
    setShowForm(false);
    setEditingWorkout(null);
  }
}}

  />
)}

    </div>
  );
}
