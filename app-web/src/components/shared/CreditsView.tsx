"use client";

import { useState } from "react";
import { FiDownload, FiCreditCard, FiTrendingUp, FiDollarSign } from "react-icons/fi";
import CreditsModal from "@/components/shared/ui/CreditsModal";
import AdminCreditsView from "@/app/admin/creditos/AdminCreditsView";



interface Transaction {
  id: string;
  type: "purchase" | "usage";
  description: string;
  date: string;
  amount: string;
  status: "completed" | "pending" | "failed";
  credits: string;
}

interface CreditsViewProps {
  mode?: 'cliente' | 'establecimiento' | 'admin';
  title?: string;
  description?: string;
  initialCredits?: number;
  initialTotalInvested?: number;
  initialUsedThisMonth?: number;
}

export default function CreditsView({
  mode = 'cliente',
  title = 'Créditos',
  description = 'Administra tus créditos y consulta tu historial de transacciones',
  initialCredits = 114,
  initialTotalInvested = 70000,
  initialUsedThisMonth = 10
}: CreditsViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credits, setCredits] = useState(initialCredits);
  const [totalInvested] = useState(initialTotalInvested);
  const [usedThisMonth] = useState(initialUsedThisMonth);

  // Datos de ejemplo para las transacciones.
  // En un entorno real, estos datos vendrían de una API.
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "purchase",
      description: "Compra de créditos - Paquete Estándar",
      date: "19/7/2024",
      amount: "$25.000",
      status: "completed",
      credits: "+50 créditos"
    },
    {
      id: "2",
      type: "usage",
      description: "Consulta de antecedentes - Juan Pérez",
      date: "21/7/2024",
      amount: "",
      status: "completed",
      credits: "-3 créditos"
    },
    {
      id: "3",
      type: "usage",
      description: "Verificación de datos - María García",
      date: "22/7/2024",
      amount: "",
      status: "completed",
      credits: "-2 créditos"
    },
    {
      id: "4",
      type: "purchase",
      description: "Compra de créditos - Paquete Premium",
      date: "14/7/2024",
      amount: "$45.000",
      status: "completed",
      credits: "+100 créditos"
    },
    {
      id: "5",
      type: "usage",
      description: "Consulta integral - Carlos López",
      date: "17/7/2024",
      amount: "",
      status: "completed",
      credits: "-5 créditos"
    }
  ];

  const handlePurchaseCredits = (newCredits: number) => {
    setCredits(prev => prev + newCredits);
    setIsModalOpen(false);
  };

  // Lógica para renderizar la vista de administrador
  if (mode === 'admin') {
    return <AdminCreditsView />;
  }

  // Vista del cliente
  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-sm sm:text-base text-gray-400">{description}</p>
      </div>

      {/* Action Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-sm sm:text-base"
        >
          <FiCreditCard className="text-base sm:text-lg" />
          <span className="hidden sm:inline">Comprar Créditos</span>
          <span className="sm:hidden">Comprar</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Available Credits */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Créditos Disponibles</p>
              <p className="text-2xl font-bold text-white">{credits}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <FiCreditCard className="text-blue-400 text-lg" />
            </div>
          </div>
        </div>

        {/* Total Invested */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Total Invertido</p>
              <p className="text-2xl font-bold text-white">${totalInvested.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <FiDollarSign className="text-green-400 text-lg" />
            </div>
          </div>
        </div>

        {/* Used This Month */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Usados este mes</p>
              <p className="text-2xl font-bold text-white">{usedThisMonth}</p>
            </div>
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-purple-400 text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History - Desktop */}
      <div className="hidden lg:block bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg">
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Historial de Créditos</h2>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
              <FiDownload className="text-sm" />
              <span className="text-sm">Exportar</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Transacción
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Créditos
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-700/30 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        transaction.type === "purchase"
                          ? "bg-green-600/20"
                          : "bg-red-600/20"
                      }`}>
                        {transaction.type === "purchase" ? (
                          <span className="text-green-400 text-sm">↑</span>
                        ) : (
                          <span className="text-red-400 text-sm">↓</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {transaction.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                    {transaction.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                    {transaction.amount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-600/20 text-green-300 border border-green-500/30">
                      Completado
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={transaction.credits.startsWith("+") ? "text-green-400" : "text-red-400"}>
                      {transaction.credits}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History - Mobile */}
      <div className="lg:hidden space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Historial de Créditos</h2>
          <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
            <FiDownload className="text-sm" />
            <span className="text-sm">Exportar</span>
          </button>
        </div>
        
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  transaction.type === "purchase" 
                    ? "bg-green-600/20" 
                    : "bg-red-600/20"
                }`}>
                  {transaction.type === "purchase" ? (
                    <span className="text-green-400 text-sm">↑</span>
                  ) : (
                    <span className="text-red-400 text-sm">↓</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">{transaction.description}</h4>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-600/20 text-green-300 border border-green-500/30">
                Completado
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
              <div className="text-sm text-gray-300">
                <span className="font-medium">Monto:</span> {transaction.amount || 'N/A'}
              </div>
              <span className={`text-sm font-medium ${
                transaction.credits.startsWith("+") ? "text-green-400" : "text-red-400"
              }`}>
                {transaction.credits}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Credits Modal */}
      <CreditsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPurchase={handlePurchaseCredits}
      />
    </>
  );
}