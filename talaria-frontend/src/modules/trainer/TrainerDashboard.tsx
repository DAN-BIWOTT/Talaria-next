"use client"
import { useState } from "react";
import ExerciseDetail from "../exerciseDetail/ExerciseDetail";
import { Button } from "../../components/ui/button";
import TrainerLayout from "./TrainerLayout";
import SessionExercisesDrawer from "../sessionExercises/ui/SessionExercisesDrawer";
import ScheduleColumn from "../bookings/ui/BookingsColumn";
import AddSessionModal from "../bookings/ui/AddSessionModal";
import { useBookings } from "../bookings/hooks/useBookings";
import ClientsList from "../clients/ui/ClientsList";

export default function TrainerDashboard() {

  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const { sessions, refresh, loading, error } = useBookings(selectedClient);
  
  return (
    <TrainerLayout>
      <div className="grid grid-cols-[250px_250px_1fr] h-screen relative">

        {/* LEFT: Clients */}
        <ClientsList onSelect={setSelectedClient} />

        {/* MIDDLE: Sessions */}
        <div className="relative border-r bg-gray-50 p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-sm text-gray-700">
              Sessions Booked
            </h2>

            <Button
              onClick={() => setDrawerOpen(true)}
              disabled={!selectedSession}
            >
              Manage
            </Button>
          </div>

          <ScheduleColumn
            clientId={selectedClient}
            sessions={sessions}
            loading={loading}
            error={error}
            refresh={refresh}
            onSelectSession={setSelectedSession}
            onSelectExercise={setSelectedExercise}
            onAddSession={() => setShowAddSessionModal(true)}
          />

        </div>

        {/* RIGHT: Exercise Detail */}
        <ExerciseDetail selectedExerciseId={selectedExercise} />
      </div>

      {/* DRAWER: Manage session exercises */}
      <SessionExercisesDrawer
        sessionId={selectedSession}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onEdit={(exerciseId) => setSelectedExercise(exerciseId)}
      />

      <AddSessionModal
        clientId={selectedClient}
        isOpen={showAddSessionModal}
        onClose={() => setShowAddSessionModal(false)}
        onCreated={async () => {
          await refresh();
          setShowAddSessionModal(false);
        }}
      />



    </TrainerLayout>

  );
}
