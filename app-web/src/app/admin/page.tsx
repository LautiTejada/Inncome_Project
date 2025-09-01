"use client";

import { FiUsers, FiShield, FiFileText, FiActivity, FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import { Card } from '@/components';

export default function AdminPage() {

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Panel de Administración</h1>
        <p className="text-xl text-gray-400">Bienvenido al panel de control del sistema Inncome</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Total Usuarios</p>
              <p className="text-2xl font-bold text-white">2,847</p>
            </div>
            <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center text-blue-400">
              <FiUsers className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Pólizas Activas</p>
              <p className="text-2xl font-bold text-white">1,923</p>
            </div>
            <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center text-green-400">
              <FiShield className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Siniestros Hoy</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center text-red-400">
              <FiActivity className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Ingresos Mensual</p>
              <p className="text-2xl font-bold text-white">$45,678</p>
            </div>
            <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center text-purple-400">
              <FiTrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-bold text-white mb-4">Actividad Reciente</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <FiUsers className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Nuevo asegurado registrado</p>
              <p className="text-gray-400 text-sm">Juan Pérez - DNI: 12345678</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Hace 2 horas</p>
              <div className="flex items-center space-x-1 text-green-400">
                <FiCheckCircle className="w-4 h-4" />
                <span className="text-xs">Completado</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <FiShield className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Póliza renovada</p>
              <p className="text-gray-400 text-sm">Empresa ABC - Póliza #POL-2024-001</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Hace 4 horas</p>
              <div className="flex items-center space-x-1 text-green-400">
                <FiCheckCircle className="w-4 h-4" />
                <span className="text-xs">Completado</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <FiFileText className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Certificado penal procesado</p>
              <p className="text-gray-400 text-sm">María González - DNI: 87654321</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Hace 6 horas</p>
              <div className="flex items-center space-x-1 text-yellow-400">
                <FiClock className="w-4 h-4" />
                <span className="text-xs">En proceso</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg">
            <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
              <FiActivity className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Siniestro reportado</p>
              <p className="text-gray-400 text-sm">Empresa XYZ - Incidente #INC-2024-015</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Hace 8 horas</p>
              <div className="flex items-center space-x-1 text-red-400">
                <FiActivity className="w-4 h-4" />
                <span className="text-xs">Pendiente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
