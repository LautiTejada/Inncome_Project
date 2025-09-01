"use client";

import { useState } from "react";
import { FiX, FiUserPlus } from "react-icons/fi";
import { Button, Dialog } from "@/components/shared";

interface Client {
  id: string;
  name: string;
}

interface AssignCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newCredits: number) => void;
  selectedClient: Client | null;
}

export default function AssignCreditsModal({ isOpen, onClose, onSubmit, selectedClient }: AssignCreditsModalProps) {
  const [credits, setCredits] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCredits = credits !== '' ? Number(credits) : 0;
    if (newCredits > 0) {
      onSubmit(newCredits);
      setCredits('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {selectedClient ? `Asignar Créditos a ${selectedClient.name}` : 'Asignar Créditos'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-4 sm:mb-6">
          Introduce la cantidad de créditos a añadir a la cuenta de {selectedClient?.name || 'este cliente'}.
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="credits" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
              Cantidad de Créditos
            </label>
            <input
              type="number"
              id="credits"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="Ej: 50"
              min="1"
              className="mt-1 w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end pt-3 sm:pt-4">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={<FiUserPlus className="w-4 h-4" />}
            >
              Asignar
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}