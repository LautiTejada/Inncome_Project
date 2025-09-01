"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiSearch, FiDownload, FiEye, FiEdit, FiTrash2, FiPlus, FiShield, FiCalendar, FiDollarSign, FiUsers, FiToggleRight, FiArrowLeft } from 'react-icons/fi';
import { Button, Dialog, Switch, PolicyForm, CoberturaParticularEditPanel } from '@/components';

interface Poliza {
  id: string;
  numero: string;
  tipo: 'Responsabilidad Civil' | 'Accidentes Personales' | 'Seguro Integral' | 'Seguro de Vida';
  asegurado: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activa' | 'vencida' | 'cancelada' | 'pendiente';
  prima: number;
  cobertura: string;
  descripcion: string;
}

interface TrabajadorConPoliza {
  id: string;
  nombreApellido: string;
  documento: string;
  establecimiento: string;
  estado: 'activo' | 'inactivo';
}

interface PolizasViewProps {
  mode?: 'admin' | 'propietario';
  title?: string;
  description?: string;
  showActions?: boolean;
  showStats?: boolean; // Nueva prop para mostrar/ocultar estadísticas
  showTabs?: boolean; // Nueva prop para mostrar/ocultar pestañas
  onPolizaEdit?: (poliza: Poliza) => void;
  onPolizaDelete?: (polizaId: string) => void;
  onPolizaActivate?: (polizaId: string) => void;
  onPolizaCancel?: (polizaId: string) => void;
  onTrabajadorEdit?: (trabajador: TrabajadorConPoliza) => void;
  onTrabajadorToggle?: (trabajadorId: string, estado: boolean) => void;
}

function PolizasViewContent({
  mode = 'propietario',
  title = 'Mis Pólizas',
  description = 'Gestiona todas tus pólizas de seguro y coberturas',
  showActions = false,
  showStats = true,
  showTabs = true,
  onPolizaEdit,
  onPolizaDelete,
  onPolizaActivate,
  onPolizaCancel,
  onTrabajadorEdit,
  onTrabajadorToggle
}: PolizasViewProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'polizas' | 'trabajadores'>('polizas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPoliza, setSelectedPoliza] = useState<Poliza | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPolicyFormOpen, setIsPolicyFormOpen] = useState(false);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Evitar problemas de hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Leer el parámetro de URL para activar el tab correspondiente
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const formParam = searchParams.get('form');
    
    if (tabParam === 'trabajadores') {
      setActiveTab('trabajadores');
    } else {
      setActiveTab('polizas');
    }
    
    // Abrir automáticamente el formulario si viene con ?form=new
    if (formParam === 'new') {
      setIsPolicyFormOpen(true);
    }
  }, [searchParams]);

  const [polizas, setPolizas] = useState<Poliza[]>([
    {
      id: '1',
      numero: 'POL-2024-001',
      tipo: 'Responsabilidad Civil',
      asegurado: 'Juan Carlos Pérez',
      fechaInicio: '2024-01-15',
      fechaFin: '2025-01-15',
      estado: 'activa',
      prima: 25000,
      cobertura: 'Hasta $1,000,000',
      descripcion: 'Cobertura de responsabilidad civil para actividades comerciales'
    },
    {
      id: '2',
      numero: 'POL-2024-002',
      tipo: 'Accidentes Personales',
      asegurado: 'María Fernanda García',
      fechaInicio: '2024-02-20',
      fechaFin: '2025-02-20',
      estado: 'activa',
      prima: 18000,
      cobertura: 'Hasta $500,000',
      descripcion: 'Seguro de accidentes personales para empleados'
    },
    {
      id: '3',
      numero: 'POL-2024-003',
      tipo: 'Seguro Integral',
      asegurado: 'Carlos Alberto López',
      fechaInicio: '2024-03-10',
      fechaFin: '2025-03-10',
      estado: 'pendiente',
      prima: 35000,
      cobertura: 'Hasta $2,000,000',
      descripcion: 'Cobertura integral para establecimiento comercial'
    }
  ]);

  const [trabajadores, setTrabajadores] = useState<TrabajadorConPoliza[]>([
    {
      id: '1',
      nombreApellido: 'ALIBERTI FERNANDEZ NORBERTO MAXIMILIANO',
      documento: '36134627',
      establecimiento: 'BARRIO TERRUÑOS DE ARAOZ II',
      estado: 'activo'
    },
    {
      id: '2',
      nombreApellido: 'PEÑA VERGARA KEVIN EMANUEL',
      documento: '37757723',
      establecimiento: 'BARRIO TERRUÑOS DE ARAOZ II',
      estado: 'activo'
    },
    {
      id: '3',
      nombreApellido: 'PEREYRA JUAN CARLOS',
      documento: '38759111',
      establecimiento: 'BARRIO TERRUÑOS DE ARAOZ II',
      estado: 'activo'
    },
    {
      id: '4',
      nombreApellido: 'ALBARRACIN OSVALDO JAVIER',
      documento: '28198391',
      establecimiento: 'MILCAYAC',
      estado: 'activo'
    },
    {
      id: '5',
      nombreApellido: 'INFANTE PASTRAN MAXIMILIANO ALFREDO',
      documento: '41004852',
      establecimiento: 'MILCAYAC',
      estado: 'activo'
    },
    {
      id: '6',
      nombreApellido: 'ARANDA ANDRES MAXIMILIANO',
      documento: '39677411',
      establecimiento: 'MILCAYAC',
      estado: 'activo'
    },
    {
      id: '7',
      nombreApellido: 'CASTILLO BUSTAMANTE VICTOR ISMAEL',
      documento: '35626069',
      establecimiento: 'MILCAYAC',
      estado: 'activo'
    },
    {
      id: '8',
      nombreApellido: 'ARAUJO ELIO',
      documento: '94194637',
      establecimiento: 'MILCAYAC',
      estado: 'activo'
    },
    {
      id: '9',
      nombreApellido: 'MOYANO FACUNDO JOAQUIN',
      documento: '42750611',
      establecimiento: 'MILCAYAC',
      estado: 'activo'
    },
    {
      id: '10',
      nombreApellido: 'ZELADA DIEGO GASTON',
      documento: '35879223',
      establecimiento: 'ALMA GARDENIA',
      estado: 'activo'
    }
  ]);

  const filteredPolizas = polizas.filter(poliza => {
    const term = searchTerm.toLowerCase().trim();
    return !term || 
      poliza.numero.toLowerCase().includes(term) ||
      poliza.tipo.toLowerCase().includes(term) ||
      poliza.asegurado.toLowerCase().includes(term);
  });

  const filteredTrabajadores = trabajadores.filter(trabajador => {
    const term = searchTerm.toLowerCase().trim();
    return !term || 
      trabajador.nombreApellido.toLowerCase().includes(term) ||
      trabajador.documento.toLowerCase().includes(term) ||
      trabajador.establecimiento.toLowerCase().includes(term);
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activa': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'vencida': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'cancelada': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'pendiente': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getEstadoText = (estado: string) => {
    switch (estado) {
      case 'activa': return 'Activa';
      case 'vencida': return 'Vencida';
      case 'cancelada': return 'Cancelada';
      case 'pendiente': return 'Pendiente';
      default: return 'Desconocido';
    }
  };

  const handlePolizaClick = (poliza: Poliza) => {
    setSelectedPoliza(poliza);
    setIsModalOpen(true);
  };

  const handleEdit = (poliza: Poliza) => {
    setSelectedPoliza(poliza);
    setIsEditPanelOpen(true);
    onPolizaEdit?.(poliza);
  };

  const handleDelete = (polizaId: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta póliza?')) {
      setPolizas(prev => prev.filter(p => p.id !== polizaId));
      onPolizaDelete?.(polizaId);
      alert('🗑️ Póliza eliminada correctamente');
    }
  };

  const handleActivate = (polizaId: string) => {
    setPolizas(prev => prev.map(p => 
      p.id === polizaId 
        ? { ...p, estado: 'activa' as const }
        : p
    ));
    onPolizaActivate?.(polizaId);
    alert('✅ Póliza activada correctamente');
  };

  const handleCancel = (polizaId: string) => {
    if (confirm('¿Está seguro de que desea cancelar esta póliza?')) {
      setPolizas(prev => prev.map(p => 
        p.id === polizaId 
          ? { ...p, estado: 'cancelada' as const }
          : p
      ));
      onPolizaCancel?.(polizaId);
      alert('❌ Póliza cancelada correctamente');
    }
  };

  const handleTrabajadorEdit = (trabajador: TrabajadorConPoliza) => {
    setIsEditPanelOpen(true);
    onTrabajadorEdit?.(trabajador);
  };

  const handleTrabajadorToggle = (trabajadorId: string, estado: boolean) => {
    setTrabajadores(prev => prev.map(t => 
      t.id === trabajadorId 
        ? { ...t, estado: estado ? 'activo' : 'inactivo' }
        : t
    ));
    onTrabajadorToggle?.(trabajadorId, estado);
  };

  const handlePolizaStatusToggle = (polizaId: string, isActive: boolean) => {
    setPolizas(prev => prev.map(p => 
      p.id === polizaId 
        ? { ...p, estado: isActive ? 'activa' : 'cancelada' as const }
        : p
    ));
    
    if (isActive) {
      onPolizaActivate?.(polizaId);
    } else {
      onPolizaCancel?.(polizaId);
    }
  };

  // Handle policy form submission
  const handlePolicyFormSubmit = (policyData: { policyNumber: string; insuranceCompany: string }) => {
    console.log('Póliza cargada:', policyData);
    
    // Crear nueva póliza con ID más estable
    const newPoliza: Poliza = {
      id: `new-${Math.floor(Math.random() * 1000000)}`, // ID más estable
      numero: policyData.policyNumber,
      tipo: 'Responsabilidad Civil', // Por defecto
      asegurado: policyData.insuranceCompany,
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaFin: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 año
      estado: 'pendiente',
      prima: 0,
      cobertura: 'Pendiente de revisión',
      descripcion: 'Póliza cargada desde formulario'
    };

    setPolizas(prev => [newPoliza, ...prev]);
    
    // Mostrar notificación de éxito
    alert('✅ Póliza cargada correctamente. Está en revisión.');
    
    // Cerrar el formulario
    setIsPolicyFormOpen(false);
  };

  return (
    <>
      {/* Title Section */}
      <div className="mb-8">
        {mode === 'admin' && (
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/admin/gestion" 
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Volver a Gestión</span>
              <span className="sm:hidden text-sm font-medium">Volver</span>
            </Link>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-sm sm:text-base text-gray-400">{description}</p>
      </div>

      {/* Renderizar contenido solo después del montaje para evitar problemas de hidratación */}
      {!isMounted ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-400">Cargando...</div>
        </div>
      ) : (
        <>
          {/* Tabs */}
          {showTabs && (
            <div className="flex flex-col sm:flex-row mb-8 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('polizas')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'polizas'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Pólizas</span>
                <span className="sm:hidden">Pólizas</span>
              </button>
              <button
                onClick={() => setActiveTab('trabajadores')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'trabajadores'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Trabajadores con Póliza</span>
                <span className="sm:hidden">Trabajadores</span>
              </button>
            </div>
          )}

          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={
                  activeTab === 'polizas' 
                    ? "Buscar por número de póliza, tipo o asegurado..."
                    : "Buscar por nombre o DNI..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {activeTab === 'polizas' && (
              <Button
                variant="primary"
                icon={<FiPlus className="w-4 h-4" />}
                onClick={() => setIsPolicyFormOpen(true)}
                className="w-full sm:w-auto"
              >
                <span className="hidden sm:inline">Nueva Póliza</span>
                <span className="sm:hidden">Nueva</span>
              </Button>
            )}
          </div>

          {/* Content based on active tab */}
          {activeTab === 'polizas' && (
            <>
              {showStats && (
                // Stats Cards
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-400 mb-1">Total Pólizas</p>
                        <p className="text-xl sm:text-2xl font-bold text-white">{polizas.length}</p>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400">
                        <FiShield className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-400 mb-1">Activas</p>
                        <p className="text-xl sm:text-2xl font-bold text-white">{polizas.filter(p => p.estado === 'activa').length}</p>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/20 rounded-lg flex items-center justify-center text-green-400">
                        <FiShield className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-400 mb-1">Vencidas</p>
                        <p className="text-xl sm:text-2xl font-bold text-white">{polizas.filter(p => p.estado === 'vencida').length}</p>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 rounded-lg flex items-center justify-center text-red-400">
                        <FiShield className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-400 mb-1">Prima Total</p>
                        <p className="text-xl sm:text-2xl font-bold text-white">${polizas.reduce((sum, p) => sum + p.prima, 0).toLocaleString()}</p>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400">
                        <FiDollarSign className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pólizas Table - Desktop */}
              <div className="hidden lg:block bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Lista de Pólizas</h3>
                  <Button
                    variant="secondary"
                    icon={<FiDownload className="w-4 h-4" />}
                  >
                    Exportar
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/70">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Nro Poliza
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Comentarios
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Compañía
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredPolizas.map((poliza) => (
                        <tr key={poliza.id} className="hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{poliza.numero}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(poliza.estado)}`}>
                              {getEstadoText(poliza.estado)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">-</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300 max-w-xs truncate" title={poliza.asegurado}>
                              {poliza.asegurado}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handlePolizaClick(poliza)}
                                className="text-gray-400 hover:text-gray-300"
                                title="Ver detalles"
                              >
                                <FiEye className="w-4 h-4" />
                              </button>
                              
                              {/* Botón Editar para todos los usuarios */}
                              <button 
                                onClick={() => handleEdit(poliza)}
                                className="text-blue-400 hover:text-blue-300"
                                title="Editar"
                              >
                                <FiEdit className="w-4 h-4" />
                              </button>
                              
                              {/* Admin actions */}
                              {mode === 'admin' && showActions && (
                                <>
                                  {(poliza.estado === 'pendiente' || poliza.estado === 'activa' || poliza.estado === 'cancelada') && (
                                    <div className="flex items-center" title={poliza.estado === 'activa' ? 'Desactivar póliza' : 'Activar póliza'}>
                                      <Switch
                                        checked={poliza.estado === 'activa'}
                                        onChange={(checked) => handlePolizaStatusToggle(poliza.id, checked)}
                                        size="sm"
                                      />
                                    </div>
                                  )}
                                  
                                  <button 
                                    onClick={() => handleDelete(poliza.id)}
                                    className="text-red-400 hover:text-red-300"
                                    title="Eliminar"
                                  >
                                    <FiTrash2 className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Mostrando 1-{filteredPolizas.length} de {polizas.length} resultados
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm text-gray-400 hover:text-white disabled:opacity-50">
                        Anterior
                      </button>
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
                      <button className="px-3 py-1 text-sm text-gray-400 hover:text-white">2</button>
                      <button className="px-3 py-1 text-sm text-gray-400 hover:text-white">3</button>
                      <button className="px-3 py-1 text-sm text-gray-400 hover:text-white">
                        Siguiente
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pólizas Cards - Mobile */}
              <div className="lg:hidden space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Lista de Pólizas</h3>
                  <Button
                    variant="secondary"
                    icon={<FiDownload className="w-4 h-4" />}
                    size="sm"
                  >
                    <span className="hidden sm:inline">Exportar</span>
                    <span className="sm:hidden">Exp</span>
                  </Button>
                </div>
                
                {filteredPolizas.map((poliza) => (
                  <div key={poliza.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-1">{poliza.numero}</h3>
                        <div className="text-sm text-gray-400">{poliza.asegurado}</div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(poliza.estado)}`}>
                        {getEstadoText(poliza.estado)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                      <div>
                        <span className="font-medium">Tipo:</span> {poliza.tipo}
                      </div>
                      <div>
                        <span className="font-medium">Prima:</span> ${poliza.prima.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Inicio:</span> {poliza.fechaInicio}
                      </div>
                      <div>
                        <span className="font-medium">Fin:</span> {poliza.fechaFin}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handlePolizaClick(poliza)}
                          className="text-gray-400 hover:text-gray-300 p-2 rounded-lg hover:bg-gray-700/50"
                          title="Ver detalles"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        
                        <button 
                          onClick={() => handleEdit(poliza)}
                          className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-700/50"
                          title="Editar"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        
                        {/* Admin actions */}
                        {mode === 'admin' && showActions && (
                          <>
                            {(poliza.estado === 'pendiente' || poliza.estado === 'activa' || poliza.estado === 'cancelada') && (
                              <div className="flex items-center" title={poliza.estado === 'activa' ? 'Desactivar póliza' : 'Activar póliza'}>
                                <Switch
                                  checked={poliza.estado === 'activa'}
                                  onChange={(checked) => handlePolizaStatusToggle(poliza.id, checked)}
                                  size="sm"
                                />
                              </div>
                            )}
                            
                            <button 
                              onClick={() => handleDelete(poliza.id)}
                              className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-700/50"
                              title="Eliminar"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trabajadores Cards - Mobile */}
              <div className="lg:hidden space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Trabajadores con Póliza</h3>
                  <Button
                    variant="secondary"
                    icon={<FiDownload className="w-4 h-4" />}
                    size="sm"
                  >
                    <span className="hidden sm:inline">Exportar</span>
                    <span className="sm:hidden">Exp</span>
                  </Button>
                </div>
                
                {filteredTrabajadores.map((trabajador) => (
                  <div key={trabajador.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-1">{trabajador.nombreApellido}</h3>
                        <div className="text-sm text-gray-400">DNI: {trabajador.documento}</div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        trabajador.estado === 'activo' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {trabajador.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">Establecimiento:</span> {trabajador.establecimiento}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm font-medium ${
                          trabajador.estado === 'activo' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {trabajador.estado === 'activo' ? 'Activo' : 'Inactivo'}
                        </span>
                        <Switch
                          checked={trabajador.estado === 'activo'}
                          onChange={(checked) => handleTrabajadorToggle(trabajador.id, checked)}
                        />
                      </div>
                      
                      {mode === 'admin' && showActions && (
                        <button 
                          onClick={() => handleTrabajadorEdit(trabajador)}
                          className="text-yellow-400 hover:text-yellow-300 p-2 rounded-lg hover:bg-yellow-700/50"
                          title="Modificar"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'trabajadores' && (
            <>
              {/* Stats Cards for Trabajadores */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400 mb-1">Total Trabajadores</p>
                      <p className="text-2xl font-bold text-white">{trabajadores.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400">
                      <FiUsers className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400 mb-1">Activos</p>
                      <p className="text-2xl font-bold text-white">{trabajadores.filter(t => t.estado === 'activo').length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center text-green-400">
                      <FiUsers className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400 mb-1">Inactivos</p>
                      <p className="text-2xl font-bold text-white">{trabajadores.filter(t => t.estado === 'inactivo').length}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center text-red-400">
                      <FiUsers className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400 mb-1">Establecimientos</p>
                      <p className="text-2xl font-bold text-white">{new Set(trabajadores.map(t => t.establecimiento)).size}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400">
                      <FiShield className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trabajadores Table - Desktop */}
              <div className="hidden lg:block bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Trabajadores con Póliza</h3>
                  <Button
                    variant="secondary"
                    icon={<FiDownload className="w-4 h-4" />}
                  >
                    Exportar
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/70">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Nombre y Apellido
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Documento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Establecimiento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredTrabajadores.map((trabajador) => (
                        <tr key={trabajador.id} className="hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{trabajador.nombreApellido}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{trabajador.documento}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{trabajador.establecimiento}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <span className={`text-sm font-medium ${
                                trabajador.estado === 'activo' ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {trabajador.estado === 'activo' ? 'Activo' : 'Inactivo'}
                              </span>
                              <Switch
                                checked={trabajador.estado === 'activo'}
                                onChange={(checked) => handleTrabajadorToggle(trabajador.id, checked)}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {mode === 'admin' && showActions && (
                                <button 
                                  onClick={() => handleTrabajadorEdit(trabajador)}
                                  className="text-yellow-400 hover:text-yellow-300"
                                  title="Modificar"
                                >
                                  <FiEdit className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Mostrando 1-{filteredTrabajadores.length} de {trabajadores.length} resultados
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm text-gray-400 hover:text-white disabled:opacity-50">
                        Anterior
                      </button>
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
                      <button className="px-3 py-1 text-sm text-gray-400 hover:text-white">2</button>
                      <button className="px-3 py-1 text-sm text-gray-400 hover:text-white">3</button>
                      <button className="px-3 py-1 text-sm text-gray-400 hover:text-white">
                        Siguiente
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Poliza Details Modal */}
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{`Detalles de la Póliza - ${selectedPoliza?.numero}`}</Dialog.Title>
          </Dialog.Header>
        {selectedPoliza && (
          <div className="space-y-6">
            <p className="text-gray-400 text-sm">
              Información completa de la póliza de seguro.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Número de Póliza</label>
                  <p className="text-white font-semibold">{selectedPoliza.numero}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Tipo de Seguro</label>
                  <p className="text-white font-semibold">{selectedPoliza.tipo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Asegurado</label>
                  <p className="text-white font-semibold">{selectedPoliza.asegurado}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Estado</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(selectedPoliza.estado)}`}>
                    {getEstadoText(selectedPoliza.estado)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Fecha de Inicio</label>
                  <p className="text-white font-semibold">{new Date(selectedPoliza.fechaInicio).toLocaleDateString('es-AR')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Fecha de Fin</label>
                  <p className="text-white font-semibold">{new Date(selectedPoliza.fechaFin).toLocaleDateString('es-AR')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Prima</label>
                  <p className="text-white font-semibold">${selectedPoliza.prima.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Cobertura</label>
                  <p className="text-white font-semibold">{selectedPoliza.cobertura}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
              <div className="p-3 bg-gray-700/30 border border-gray-600/30 rounded-lg">
                <p className="text-gray-300 text-sm">{selectedPoliza.descripcion}</p>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                variant="secondary"
                icon={<FiDownload className="w-4 h-4" />}
                className="flex-1"
              >
                Descargar PDF
              </Button>
              <Button
                variant="primary"
                className="flex-1"
              >
                Renovar Póliza
              </Button>
            </div>
          </div>
        )}
        </Dialog.Content>
      </Dialog>

      {/* Policy Form Modal */}
      <PolicyForm
        isOpen={isPolicyFormOpen}
        onClose={() => setIsPolicyFormOpen(false)}
        onSubmit={handlePolicyFormSubmit}
      />

      {/* Edit Panel Modal */}
      <Dialog
        open={isEditPanelOpen}
        onOpenChange={setIsEditPanelOpen}
      >
        <Dialog.Content className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <Dialog.Header>
            <Dialog.Title>
              {activeTab === 'polizas' 
                ? `Editar Póliza - ${selectedPoliza?.numero || ''}`
                : 'Modificar Trabajador con Póliza'
              }
            </Dialog.Title>
          </Dialog.Header>
          <CoberturaParticularEditPanel
            isAdmin={mode === 'admin'}
            initialPolicyStatus={selectedPoliza?.estado === 'activa' ? 'aprobada' : 
                               selectedPoliza?.estado === 'vencida' ? 'rechazada' : 
                               selectedPoliza?.estado === 'cancelada' ? 'rechazada' : 'pendiente'}
            onSave={() => {
              console.log('Guardando cambios...');
              setIsEditPanelOpen(false);
            }}
            onCancel={() => setIsEditPanelOpen(false)}
          />
        </Dialog.Content>
      </Dialog>
    </>
  );
}

export default function PolizasView(props: PolizasViewProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PolizasViewContent {...props} />
    </Suspense>
  );
}
