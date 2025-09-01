"use client";

import { FiDownload, FiUser, FiFileText, FiCalendar, FiDollarSign, FiCreditCard } from "react-icons/fi";

// Interfaz para la transacción de administrador con información adicional del cliente
interface AdminTransaction {
  id: string;
  clientName: string;
  type: "purchase" | "usage";
  description: string;
  date: string;
  amount: string;
  credits: string;
}

export default function AdminTransactionsTable() {
  // Datos de ejemplo para las transacciones del administrador
  const adminTransactions: AdminTransaction[] = [
    {
      id: "at1",
      clientName: "Juan Pérez",
      type: "purchase",
      description: "Compra de créditos - Paquete Estándar",
      date: "19/7/2024",
      amount: "$25.000",
      credits: "+50"
    },
    {
      id: "at2",
      clientName: "María García",
      type: "usage",
      description: "Consulta de antecedentes",
      date: "21/7/2024",
      amount: "",
      credits: "-3"
    },
    {
      id: "at3",
      clientName: "Carlos López",
      type: "usage",
      description: "Verificación de datos",
      date: "22/7/2024",
      amount: "",
      credits: "-2"
    },
    {
      id: "at4",
      clientName: "Ana Torres",
      type: "purchase",
      description: "Compra de créditos - Paquete Premium",
      date: "14/7/2024",
      amount: "$45.000",
      credits: "+100"
    },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg">
      {/* Header responsive */}
      <div className="p-3 sm:p-4 border-b border-gray-700/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-bold text-white">Historial de Transacciones Global</h2>
          <button className="flex items-center justify-center sm:justify-start space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 w-full sm:w-auto">
            <FiDownload className="text-sm" />
            <span className="text-sm">Exportar</span>
          </button>
        </div>
      </div>
      
      {/* Vista de escritorio - tabla */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Cliente
              </th>
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
                Créditos
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
            {adminTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-700/30 transition-colors duration-200">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">
                  {transaction.clientName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  {transaction.description}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  {transaction.date}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                  {transaction.amount}
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

      {/* Vista móvil - cards */}
      <div className="lg:hidden p-3 sm:p-4 space-y-3">
        {adminTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <FiUser className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-white text-sm">{transaction.clientName}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                transaction.credits.startsWith("+") 
                  ? "bg-green-900/50 text-green-400" 
                  : "bg-red-900/50 text-red-400"
              }`}>
                {transaction.credits}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FiFileText className="w-3 h-3 text-gray-400" />
                <span className="text-gray-300 text-xs">{transaction.description}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiCalendar className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-400 text-xs">{transaction.date}</span>
                </div>
                
                {transaction.amount && (
                  <div className="flex items-center space-x-2">
                    <FiDollarSign className="w-3 h-3 text-gray-400" />
                    <span className="text-white text-xs font-medium">{transaction.amount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}