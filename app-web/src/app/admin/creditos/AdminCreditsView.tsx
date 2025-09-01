"use client";

import { useState } from "react";
import { FiSearch, FiUserPlus, FiUser, FiMail, FiCreditCard } from "react-icons/fi";

import AssignCreditsModal from "./AssignCreditsModal"; 
import AdminTransactionsTable from "@/components/shared/ui/AdminTransactionsTable";

interface Client {
  id: string;
  name: string;
  email: string;
  credits: number;
}

export default function AdminCreditsView() {
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para controlar el modal de asignación de créditos
  const [isAssignCreditsModalOpen, setIsAssignCreditsModalOpen] = useState(false);
  // Estado para guardar el cliente seleccionado para la asignación de créditos
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Datos de ejemplo para los clientes
  const [clients, setClients] = useState<Client[]>([
    { id: "c1", name: "Juan Pérez", email: "juan.perez@example.com", credits: 114 },
    { id: "c2", name: "María García", email: "maria.garcia@example.com", credits: 50 },
    { id: "c3", name: "Carlos López", email: "carlos.lopez@example.com", credits: 25 },
    { id: "c4", name: "Ana Torres", email: "ana.torres@example.com", credits: 300 },
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para abrir el modal de asignación de créditos para un cliente específico
  const handleAssignCredits = (client: Client) => {
    setSelectedClient(client);
    setIsAssignCreditsModalOpen(true);
  };
  
  // Función para cerrar el modal y resetear el estado
  const handleCloseModal = () => {
    setIsAssignCreditsModalOpen(false);
    setSelectedClient(null);
  };

  // Función que se ejecuta cuando se envían los nuevos créditos desde el modal
  const handleSubmitCredits = (newCredits: number) => {
    if (selectedClient) {
      setClients(prevClients => 
        prevClients.map(client => 
          client.id === selectedClient.id
            ? { ...client, credits: client.credits + newCredits }
            : client
        )
      );
      handleCloseModal();
    }
  };

  return (
    <>
      {/* Header responsive */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Créditos</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Administra los créditos de todos los clientes y consulta el historial global.
        </p>
      </div>

      {/* Search y acciones - responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow w-full sm:w-auto">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Buscar cliente por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700/50 text-white rounded-lg pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Tabla de créditos - responsive */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Créditos de Clientes</h2>
        
        {/* Vista de escritorio - tabla */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Créditos
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-700/30 transition-colors duration-200">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">
                      {client.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                      {client.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400 font-bold">
                      {client.credits}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => handleAssignCredits(client)}
                        className="p-2 text-blue-500 hover:text-blue-400 transition-colors duration-200"
                        title="Asignar Créditos"
                      >
                        <FiUserPlus className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                    No se encontraron clientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Vista móvil - cards */}
        <div className="lg:hidden space-y-3">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <div key={client.id} className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FiUser className="w-4 h-4 text-blue-400" />
                    <span className="font-medium text-white text-sm">{client.name}</span>
                  </div>
                  <button 
                    onClick={() => handleAssignCredits(client)}
                    className="p-2 text-blue-500 hover:text-blue-400 transition-colors duration-200"
                    title="Asignar Créditos"
                  >
                    <FiUserPlus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <FiMail className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-400 text-xs">{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiCreditCard className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 font-bold text-sm">{client.credits} créditos</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              No se encontraron clientes.
            </div>
          )}
        </div>
      </div>

      <AdminTransactionsTable />

      {/* Se pasa el estado y las funciones de manejo al modal */}
      <AssignCreditsModal
        isOpen={isAssignCreditsModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCredits}
        selectedClient={selectedClient}
      />
    </>
  );
}