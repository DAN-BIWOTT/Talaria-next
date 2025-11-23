"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { useClients } from "../hooks/useClients";
import { Loader2 } from "lucide-react";
import AddClientModal from "./AddClientModal";

interface Props {
  onSelect: (id: number) => void;
}

export default function ClientsList({ onSelect }: Props) {
  const { clients, loading, error, refresh } = useClients();
  const [selected, setSelected] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleClick = (id: number) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <aside className="border-r bg-white p-4 flex flex-col gap-3 overflow-y-auto h-full">
      <h2 className="font-semibold text-lg mb-2 text-gray-800">Clients</h2>

      {loading && (
        <div className="flex justify-center items-center h-20 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading clients…
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm">
          Failed to load clients: {error}
        </div>
      )}

      {!loading &&
        !error &&
        clients.map((client) => (
          <Button
            key={client.id}
            variant={selected === client.id ? "default" : "outline"}
            onClick={() => handleClick(client.id)}
            className="justify-between hover:bg-gray-100 transition-colors"
          >
            <span>{client.name}</span>
            <span className="text-xs text-gray-500">{client.goal ?? "–"}</span>
          </Button>
        ))}

      <Button
        variant="secondary"
        className="mt-auto"
        onClick={() => setShowAddModal(true)}
      >
        + Add Client
      </Button>

      {/* Modal */}
      <AddClientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdded={refresh}
      />
    </aside>
  );
}
