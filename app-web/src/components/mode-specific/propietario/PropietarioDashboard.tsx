"use client";

import React from 'react';
import { FiHome, FiShield, FiFileText, FiActivity } from 'react-icons/fi';

interface PropietarioDashboardProps {
  className?: string;
}

const PropietarioDashboard: React.FC<PropietarioDashboardProps> = ({ className = '' }) => {
  const stats = [
    { label: 'Propiedades', value: '3', icon: FiHome, color: 'text-blue-400' },
    { label: 'Pólizas Activas', value: '5', icon: FiShield, color: 'text-green-400' },
    { label: 'Certificados', value: '12', icon: FiFileText, color: 'text-purple-400' },
    { label: 'Amenities', value: '8', icon: FiActivity, color: 'text-orange-400' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Panel de Propietario</h1>
        <p className="text-gray-400">Gestión de tus propiedades y seguros</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-bold text-white mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
            Mis Asegurados
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
            Ver Pólizas
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
            Amenities
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropietarioDashboard;
