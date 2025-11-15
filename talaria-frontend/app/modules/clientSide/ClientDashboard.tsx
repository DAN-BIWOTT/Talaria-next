"use client";

import { workouts, exercises, weeklyData } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"; // 👈 Next.js link
import { Dumbbell, CalendarDays, TrendingUp } from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ClientDashboard() {
  const clientId = 1; // mock logged-in client
  const clientWorkouts = workouts.filter((w) => w.clientId === clientId);
  const nextWorkout = clientWorkouts[0];
  const totalWorkouts = clientWorkouts.length;

  return (
    <div className="space-y-8">
      {/* ====================== */}
      {/* Header / Greeting */}
      {/* ====================== */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back, <span className="font-bold">Alice</span> 👋
          </h1>
          <p className="text-sm opacity-90 mt-1">
            Keep pushing! Every rep takes you closer to your goal.
          </p>
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <Dumbbell size={18} />
            <span className="text-sm">{totalWorkouts} total workouts</span>
          </div>

          {nextWorkout && (
            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              <span className="text-sm">
                Next: {new Date(nextWorkout.date).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ====================== */}
      {/* Analytics Section */}
      {/* ====================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <TrendingUp size={16} className="text-blue-600" />
                Weekly Progress
              </h3>
              <p className="text-xs text-gray-500">
                Completed Exercises per Day
              </p>
            </div>

            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      fontSize: "0.75rem",
                      borderRadius: "6px",
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#2563eb" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Calories Burned */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Dumbbell size={16} className="text-orange-500" />
                Calories Burned
              </h3>
              <p className="text-xs text-gray-500">
                Estimated kcal per Day
              </p>
            </div>

            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      fontSize: "0.75rem",
                      borderRadius: "6px",
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#f97316"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#f97316" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ====================== */}
      {/* Workouts Section */}
      {/* ====================== */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Your Upcoming Workouts
          </h2>
          <p className="text-xs text-gray-500">
            Stay consistent and log your progress daily
          </p>
        </div>

        {clientWorkouts.length === 0 ? (
          <Card className="p-6 text-center border-dashed border-gray-300 bg-gray-50">
            <p className="text-gray-500 text-sm">
              No workouts assigned yet. Check back soon!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {clientWorkouts.map((w) => (
              <Card
                key={w.id}
                className="border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all bg-white rounded-lg"
              >
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800 text-base">
                        {w.title}
                      </h3>
                      <span
                        className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                          w.shared
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {w.shared ? "Shared Plan" : "Personal"}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mb-2">
                      {new Date(w.date).toLocaleDateString("en-GB", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>

                    <ul className="text-sm text-gray-600 space-y-1">
                      {w.exercises.slice(0, 3).map((ex) => {
                        const ref = exercises.find((e) => e.id === ex.id);
                        return (
                          <li key={ex.id} className="flex justify-between">
                            <span>{ref?.name}</span>
                            <span className="text-xs text-gray-400">
                              {ex.sets}x{ex.reps}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <Link
                    href={`/client/workouts/${w.id}`} // 👈 Next.js link
                    className="mt-4 inline-flex justify-center items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-700 transition"
                  >
                    View Workout →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
