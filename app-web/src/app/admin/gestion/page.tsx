"use client";

import { FiUsers, FiFileText, FiShield, FiCalendar, FiTrendingUp, FiAlertTriangle } from 'react-icons/fi';

export default function GestionPage() {
  const stats = [
    { label: 'Total Asegurados', value: '2,847', icon: FiUsers, color: 'text-blue-400' },
    { label: 'Pólizas Activas', value: '1,923', icon: FiShield, color: 'text-green-400' },
    { label: 'Certificados Pendientes', value: '156', icon: FiFileText, color: 'text-yellow-400' },
    { label: 'Visitas del Mes', value: '89', icon: FiCalendar, color: 'text-purple-400' },
  ];

  const recentActivities = [
    { action: 'Nuevo asegurado registrado', user: 'Juan Pérez', time: 'Hace 2 horas', type: 'success' },
    { action: 'Póliza actualizada', user: 'María García', time: 'Hace 4 horas', type: 'info' },
    { action: 'Certificado penal cargado', user: 'Carlos López', time: 'Hace 6 horas', type: 'warning' },
    { action: 'Visita programada', user: 'Ana Martínez', time: 'Hace 8 horas', type: 'success' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Actividad Reciente</h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'success' ? 'bg-green-400' :
                  activity.type === 'warning' ? 'bg-yellow-400' :
                  'bg-blue-400'
                }`}></div>
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">por {activity.user}</p>
                </div>
              </div>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
