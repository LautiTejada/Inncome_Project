"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FiUsers, FiClock, FiMapPin, FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';
import { Button } from '@/components';
import { SimpleTabs } from '@/components';

interface Ingreso {
  id: string;
  dni: string;
  nombre: string;
  empresa: string;
  hora: string;
  tipo: 'ingreso' | 'egreso';
  estado: 'autorizado' | 'pendiente' | 'rechazado';
  ubicacion: string;
}

export default function IngresosView() {
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const [activeTab, setActiveTab] = useState('tiempo-real');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  // Detectar el parámetro tab en la URL
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && (tabParam === 'tiempo-real' || tabParam === 'historial')) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Mock data para ingresos
  useEffect(() => {
    const mockIngresos: Ingreso[] = [
      {
        id: '1',
        dni: '12345678',
        nombre: 'Juan Pérez',
        empresa: 'Empresa ABC',
        hora: '08:30',
        tipo: 'ingreso',
        estado: 'autorizado',
        ubicacion: 'Entrada Principal'
      },
      {
        id: '2',
        dni: '87654321',
        nombre: 'María González',
        empresa: 'Corporación XYZ',
        hora: '08:45',
        tipo: 'ingreso',
        estado: 'autorizado',
        ubicacion: 'Entrada Principal'
      },
      {
        id: '3',
        dni: '11223344',
        nombre: 'Carlos Rodríguez',
        empresa: 'Agencia 123',
        hora: '09:00',
        tipo: 'egreso',
        estado: 'autorizado',
        ubicacion: 'Salida Principal'
      },
      {
        id: '4',
        dni: '55667788',
        nombre: 'Ana Martínez',
        empresa: 'Seguros Plus',
        hora: '09:15',
        tipo: 'ingreso',
        estado: 'pendiente',
        ubicacion: 'Entrada Principal'
      }
    ];
    setIngresos(mockIngresos);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    // Simular refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'autorizado':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pendiente':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'rechazado':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTipoColor = (tipo: string) => {
    return tipo === 'ingreso' 
      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      : 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  };

  const tabs = [
    { id: 'tiempo-real', label: 'Tiempo Real', icon: <FiClock className="w-4 h-4" /> },
    { id: 'historial', label: 'Historial', icon: <FiUsers className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Ingresos en Tiempo Real</h1>
          <p className="text-gray-400">Monitorea los ingresos y salidas del establecimiento</p>
        </div>
        <Button
          variant="secondary"
          onClick={refreshData}
          disabled={isLoading}
          icon={<FiRefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}>
          {isLoading ? 'Actualizando...' : 'Actualizar'}
        </Button>
      </div>

      {/* Tabs */}
      <SimpleTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content based on active tab */}
      {activeTab === 'tiempo-real' && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-xl font-bold text-white">Actividad Reciente</h2>
            <p className="text-gray-400 text-sm">Últimos movimientos registrados</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    DNI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Ubicación
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {ingresos.map((ingreso) => (
                  <tr key={ingreso.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {ingreso.dni}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {ingreso.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {ingreso.empresa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {ingreso.hora}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getTipoColor(ingreso.tipo)}`}>
                        {ingreso.tipo === 'ingreso' ? 'Ingreso' : 'Egreso'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getEstadoColor(ingreso.estado)}`}>
                        {ingreso.estado === 'autorizado' ? 'Autorizado' : 
                         ingreso.estado === 'pendiente' ? 'Pendiente' : 'Rechazado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center">
                        <FiMapPin className="w-4 h-4 text-gray-400 mr-2" />
                        {ingreso.ubicacion}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'historial' && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Historial de Movimientos</h2>
          <p className="text-gray-400">Aquí se mostrará el historial completo de ingresos y egresos</p>
        </div>
      )}
    </div>
  );
}