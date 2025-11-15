import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { Flame, Trophy, Dumbbell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { workoutData } from "@/data/mockData";

export default function ProgressTracker() {


  const totalWorkouts = workoutData.reduce((acc, w) => acc + w.workouts, 0);
  const totalCalories = workoutData.reduce((acc, w) => acc + w.calories, 0);
  const streakDays = 6;

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow">
        <h1 className="text-2xl font-semibold mb-1">Your Progress Overview</h1>
        <p className="text-sm opacity-90">Tracking your growth and performance this month</p>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border shadow-sm hover:shadow-md transition bg-white">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <Dumbbell size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Workouts Completed</p>
              <p className="text-lg font-semibold text-gray-800">{totalWorkouts}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:shadow-md transition bg-white">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
              <Flame size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Calories Burned</p>
              <p className="text-lg font-semibold text-gray-800">{totalCalories} kcal</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:shadow-md transition bg-white">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Streak</p>
              <p className="text-lg font-semibold text-gray-800">{streakDays} days 🔥</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Workout Frequency Chart */}
        <Card className="border shadow-sm bg-white">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Workout Frequency</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#6b7280" }} />
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
                    dataKey="workouts"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#2563eb" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Calories Burned Chart */}
        <Card className="border shadow-sm bg-white">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Calories Burned Per Week</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      fontSize: "0.75rem",
                      borderRadius: "6px",
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <Bar dataKey="calories" fill="#f97316" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Consistency Ring */}
      <section className="text-center py-8">
        <div className="relative inline-block w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#2563eb"
              strokeWidth="10"
              strokeDasharray={`${(streakDays / 7) * 352}, 352`}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-semibold text-lg text-gray-800">{streakDays}/7</p>
            <p className="text-xs text-gray-500">Days Active</p>
          </div>
        </div>
      </section>
    </div>
  );
}
