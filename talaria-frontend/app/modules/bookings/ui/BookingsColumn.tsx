"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookings } from "../hooks/useBookings";
import { useState } from "react";

interface Props {
  clientId: number | null;
  sessions: any[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  onSelectSession: (sessionId: number) => void;
  onSelectExercise: (exerciseId: number) => void;
  onAddSession: () => void;
}


export default function ScheduleColumn({
  clientId,
  onSelectSession,
  onSelectExercise,
  onAddSession,
  loading,
  error,
  sessions
}: Props) {
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  if (!clientId) {
    return (
      <div className="p-6 text-gray-500">
        Select a client to view their training sessions.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading sessions…
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="border-r p-4 flex flex-col gap-4 overflow-y-auto h-full bg-gray-50">

      {/* Top Bar */}
      <div className="flex justify-between items-center">

        <Button size="sm" onClick={onAddSession}>
          <Plus className="w-4 h-4 mr-1" />
          Add Session
        </Button>
      </div>

      {/* Sessions */}
      {sessions.map((session) => (
        <div
          key={session.id}
          className={`bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition cursor-pointer ${
            selectedSession === session.id ? "border-blue-500" : ""
          }`}
          onClick={() => {
            setSelectedSession(session.id);
            onSelectSession(session.id);
          }}
        >
          
          <h3 className="font-semibold text-gray-900">{session.title}</h3>

          <p className="text-sm text-gray-500 mb-2">
            {new Date(session.booking.date).toLocaleDateString()} —{" "}
            {session.booking.status}
          </p>

          {/* Exercises list */}
          <div className="flex flex-col gap-1 mt-2">
            {session.exercises.map((ex: any) => (
              <Button
                key={ex.id}
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectExercise(ex.id);
                }}
                className="justify-between"
              >
                {ex.template.name}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
