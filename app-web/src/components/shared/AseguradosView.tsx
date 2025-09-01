"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiUsers, FiPlus, FiSearch, FiUser, FiPackage, FiClock, FiEye, FiX, FiHelpCircle, FiEdit, FiTrash2, FiInfo, FiArrowLeft } from 'react-icons/fi';
import { Button, Switch, WorkerForm, VisitForm } from '@/components';

interface Worker {
  id: string;
  name: string;
  dni: string;
  role: string;
  department: string;
  location: string;
  status: 'active' | 'inactive';
  insuranceTypes: string[];
  coverageSince: string;
  isEnabled: boolean;
}

interface Visit {
  id: string;
  name: string;
  dni: string;
  type: 'visit' | 'delivery';
  status: 'active' | 'finished';
  host: string;
  entryTime: string;
  date: string;
  description: string;
  contact?: string;
  exitTime?: string;
  company?: string;
}

interface IncomeRecord {
  id: string;
  worker: string;
  dni: string;
  department: string;
  entryTime: string;
  exitTime?: string;
  status: 'present' | 'absent';
  date: string;
}

interface WorkerFormData {
  nombreApellido: string;
  documento: string;
  actividad: string;
  direccion: string;
}

interface VisitFormData {
  nombreApellido: string;
  documento: string;
  direccion: string;
}

interface AseguradosViewProps {
  mode?: 'admin' | 'propietario';
  title?: string;
  description?: string;
  showActions?: boolean;
  onWorkerEdit?: (worker: Worker) => void;
  onWorkerDelete?: (workerId: string) => void;
  onVisitEdit?: (visit: Visit) => void;
  onVisitDelete?: (visitId: string) => void;
}

function AseguradosViewContent({
  mode = 'propietario',
  title = 'Mis Asegurados',
  description = 'Gestiona tus empleados asegurados, sus ingresos y controla visitantes',
  showActions = false,
  onWorkerEdit,
  onWorkerDelete,
  onVisitEdit,
  onVisitDelete
}: AseguradosViewProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'workers' | 'income' | 'visits'>('workers');
  
  // Leer el parámetro de URL para activar el tab correspondiente
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const formParam = searchParams.get('form');
    
    if (tabParam === 'income') {
      setActiveTab('income');
    } else if (tabParam === 'visits') {
      setActiveTab('visits');
    } else {
      setActiveTab('workers');
    }
    
    // Si hay parámetro form=new, abrir el formulario correspondiente según el tab
    if (formParam === 'new') {
      if (tabParam === 'visits') {
        setIsVisitFormOpen(true);
      } else {
        setIsWorkerFormOpen(true);
      }
    }
  }, [searchParams]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isWorkerFormOpen, setIsWorkerFormOpen] = useState(false);
  const [isVisitFormOpen, setIsVisitFormOpen] = useState(false);
  
  // Mock data - en una implementación real esto vendría de props o API
  const [visits, setVisits] = useState<Visit[]>([
    {
      id: '1',
      name: 'Ana María Rodríguez',
      dni: '26.789.123',
      type: 'visit',
      status: 'active',
      host: 'Juan Carlos Pérez',
      entryTime: '14:30',
      date: '23/7/2024',
      description: 'Reunión de trabajo',
      company: 'TechCorp'
    },
    {
      id: '2',
      name: 'Carlos Eduardo Silva',
      dni: '37.890.234',
      type: 'delivery',
      status: 'active',
      host: 'María Fernanda García',
      entryTime: '10:15',
      date: '23/7/2024',
      description: 'Paquete urgente - Documentos importantes',
      company: 'Express Delivery'
    },
    {
      id: '3',
      name: 'Laura Patricia Martínez',
      dni: '48.901.345',
      type: 'visit',
      status: 'finished',
      host: 'Carlos Alberto López',
      entryTime: '09:00',
      exitTime: '11:30',
      date: '23/7/2024',
      description: 'Entrevista de trabajo',
      company: 'HR Solutions'
    },
    {
      id: '4',
      name: 'Correo Argentino',
      dni: '20.123.456',
      type: 'delivery',
      status: 'finished',
      host: 'Juan Carlos Pérez',
      entryTime: '08:45',
      exitTime: '09:00',
      date: '23/7/2024',
      description: 'Entrega de documentación contable',
      company: 'Correo Argentino S.A.'
    }
  ]);

  const [workers, setWorkers] = useState<Worker[]>([
    {
      id: '1',
      name: 'Juan Carlos Pérez',
      dni: '12.345.678',
      role: 'Gerente de Ventas',
      department: 'Ventas',
      location: 'Manzana A - Lote 15',
      status: 'active',
      insuranceTypes: ['Responsabilidad Civil Comercial', 'Responsabilidad Civil', 'Accidentes Personales'],
      coverageSince: '14/1/2023',
      isEnabled: true
    },
    {
      id: '2',
      name: 'María Fernanda García',
      dni: '23.456.789',
      role: 'Analista Contable',
      department: 'Administración',
      location: 'Manzana A - Lote 15',
      status: 'active',
      insuranceTypes: ['Accidentes Personales Colectivo', 'Responsabilidad Civil', 'Seguro Integral'],
      coverageSince: '19/3/2023',
      isEnabled: false
    },
    {
      id: '3',
      name: 'Carlos Alberto López',
      dni: '34.567.890',
      role: 'Técnico de Sistemas',
      department: 'IT',
      location: 'Manzana A - Lote 15',
      status: 'active',
      insuranceTypes: ['Seguro Integral de Comercio', 'Responsabilidad Civil'],
      coverageSince: '9/2/2023',
      isEnabled: true
    }
  ]);

  // Mock data for income records
  const incomeRecords: IncomeRecord[] = [
    {
      id: '1',
      worker: 'Juan Carlos Pérez',
      dni: '12.345.678',
      department: 'Ventas',
      entryTime: '08:30',
      status: 'present',
      date: '23/7/2024'
    },
    {
      id: '2',
      worker: 'María Fernanda García',
      dni: '23.456.789',
      department: 'Administración',
      entryTime: '09:15',
      status: 'present',
      date: '23/7/2024'
    },
    {
      id: '3',
      worker: 'Carlos Alberto López',
      dni: '34.567.890',
      department: 'IT',
      entryTime: '08:45',
      exitTime: '17:30',
      status: 'absent',
      date: '23/7/2024'
    }
  ];

  // Función para normalizar texto (remover tildes y caracteres especiales)
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover tildes
      .replace(/[^a-z0-9\s]/g, ''); // Solo letras, números y espacios
  };

  // Función para búsqueda más inteligente
  const searchInWorker = (worker: Worker, searchTerm: string): boolean => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    
    const normalizedTerm = normalizeText(term);
    const normalizedWorkerName = normalizeText(worker.name);
    
    // Buscar en nombre completo (nombre y apellido)
    const nameParts = normalizedWorkerName.split(' ');
    const nameMatch = nameParts.some(part => part.includes(normalizedTerm)) || 
                     normalizedWorkerName.includes(normalizedTerm);
    
    // Buscar por nombre completo (toda la cadena)
    const fullNameMatch = normalizedWorkerName.includes(normalizedTerm);
    
    // Buscar combinaciones de nombre y apellido
    const searchWords = normalizedTerm.split(' ').filter(word => word.length > 0);
    const workerWords = normalizedWorkerName.split(' ').filter(word => word.length > 0);
    
    // Verificar si todos los términos de búsqueda están en el nombre del trabajador
    const allWordsMatch = searchWords.length > 1 && 
                         searchWords.every(searchWord => 
                           workerWords.some(workerWord => workerWord.includes(searchWord))
                         );
    
    // Buscar en DNI (con o sin puntos)
    const dniMatch = worker.dni.replace(/\./g, '').includes(term.replace(/\./g, '')) ||
                    worker.dni.includes(term);
    
    // Buscar en rol y departamento
    const roleMatch = normalizeText(worker.role).includes(normalizedTerm);
    const departmentMatch = normalizeText(worker.department).includes(normalizedTerm);
    
    return nameMatch || fullNameMatch || allWordsMatch || dniMatch || roleMatch || departmentMatch;
  };

  const filteredWorkers = workers.filter(worker => searchInWorker(worker, searchTerm));

  const filteredVisits = visits.filter(visit => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    
    const normalizedTerm = normalizeText(term);
    const normalizedVisitName = normalizeText(visit.name);
    
    // Buscar en nombre completo del visitante
    const nameParts = normalizedVisitName.split(' ');
    const nameMatch = nameParts.some(part => part.includes(normalizedTerm)) || 
                     normalizedVisitName.includes(normalizedTerm);
    
    // Buscar por nombre completo (toda la cadena)
    const fullNameMatch = normalizedVisitName.includes(normalizedTerm);
    
    // Buscar combinaciones de nombre y apellido
    const searchWords = normalizedTerm.split(' ').filter(word => word.length > 0);
    const visitWords = normalizedVisitName.split(' ').filter(word => word.length > 0);
    
    // Verificar si todos los términos de búsqueda están en el nombre del visitante
    const allWordsMatch = searchWords.length > 1 && 
                         searchWords.every(searchWord => 
                           visitWords.some(visitWord => visitWord.includes(searchWord))
                         );
    
    // Buscar en anfitrión
    const hostMatch = normalizeText(visit.host).includes(normalizedTerm);
    
    // Buscar en empresa (si existe)
    const companyMatch = visit.company ? normalizeText(visit.company).includes(normalizedTerm) : false;
    
    return nameMatch || fullNameMatch || allWordsMatch || hostMatch || companyMatch;
  });

  const filteredIncomeRecords = incomeRecords.filter(record => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    
    const normalizedTerm = normalizeText(term);
    const normalizedWorkerName = normalizeText(record.worker);
    
    // Buscar en nombre completo del trabajador
    const workerParts = normalizedWorkerName.split(' ');
    const workerMatch = workerParts.some(part => part.includes(normalizedTerm)) || 
                       normalizedWorkerName.includes(normalizedTerm);
    
    // Buscar por nombre completo (toda la cadena)
    const fullWorkerMatch = normalizedWorkerName.includes(normalizedTerm);
    
    // Buscar combinaciones de nombre y apellido
    const searchWords = normalizedTerm.split(' ').filter(word => word.length > 0);
    const workerWords = normalizedWorkerName.split(' ').filter(word => word.length > 0);
    
    // Verificar si todos los términos de búsqueda están en el nombre del trabajador
    const allWordsMatch = searchWords.length > 1 && 
                         searchWords.every(searchWord => 
                           workerWords.some(workerWord => workerWord.includes(searchWord))
                         );
    
    // Buscar en DNI
    const dniMatch = record.dni.replace(/\./g, '').includes(term.replace(/\./g, '')) ||
                    record.dni.includes(term);
    
    // Buscar en departamento
    const departmentMatch = normalizeText(record.department).includes(normalizedTerm);
    
    return workerMatch || fullWorkerMatch || allWordsMatch || dniMatch || departmentMatch;
  });

  const toggleWorkerStatus = (workerId: string) => {
    setWorkers(prevWorkers =>
      prevWorkers.map(worker =>
        worker.id === workerId
          ? { ...worker, isEnabled: !worker.isEnabled }
          : worker
      )
    );
  };

  const markVisitExit = (visitId: string) => {
    // Obtener la hora actual
    const now = new Date();
    const exitTime = now.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    // Actualizar el estado de las visitas
    setVisits(prevVisits =>
      prevVisits.map(visit =>
        visit.id === visitId
          ? { 
              ...visit, 
              status: 'finished' as const,
              exitTime: exitTime
            }
          : visit
      )
    );
    
    // Mostrar confirmación
    alert(`✅ Salida registrada para ${visitId} a las ${exitTime}`);
  };

  const markDeliveryRetrieved = (visitId: string) => {
    // Obtener la hora actual
    const now = new Date();
    const exitTime = now.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    // Actualizar el estado de las encomiendas
    setVisits(prevVisits =>
      prevVisits.map(visit =>
        visit.id === visitId
          ? { 
              ...visit, 
              status: 'finished' as const,
              exitTime: exitTime
            }
          : visit
      )
    );
    
    // Mostrar confirmación
    alert(`📦 Encomienda retirada por seguridad a las ${exitTime}`);
  };

  // Función para manejar la subida de trabajadores desde el formulario
  const handleWorkerSubmit = (newWorkers: WorkerFormData[]) => {
    console.log('Trabajadores a agregar:', newWorkers);
    
    // Aquí puedes agregar la lógica para procesar los trabajadores
    // Por ejemplo, agregarlos a la lista de workers existente
    const processedWorkers = newWorkers.map((worker, index) => ({
      id: `worker-${Math.random().toString(36).substr(2, 9)}-${index}`,
      name: worker.nombreApellido,
      dni: worker.documento,
      role: worker.actividad,
      department: worker.actividad,
      location: worker.direccion || 'Manzana A - Lote 15',
      status: 'active' as const,
      insuranceTypes: ['Responsabilidad Civil Comercial'],
      coverageSince: new Date().toLocaleDateString('es-AR'),
      isEnabled: true
    }));

    setWorkers(prev => [...prev, ...processedWorkers]);
    
    // Mostrar notificación de éxito
    alert(`Se agregaron ${newWorkers.length} trabajador(es) correctamente ✅`);
  };

  // Función para manejar la subida de visitas desde el formulario
  const handleVisitSubmit = (newVisits: VisitFormData[]) => {
    console.log('Visitas a agregar:', newVisits);
    
    // Las visitas van a la tabla de personas aseguradas (no consumen créditos)
    const processedVisits = newVisits.map((visit, index) => ({
      id: `visit-${Math.random().toString(36).substr(2, 9)}-${index}`,
      name: visit.nombreApellido,
      dni: visit.documento,
      type: 'visit' as const,
      status: 'active' as const,
      host: 'Usuario Actual', // Se puede obtener del contexto
      entryTime: new Date().toLocaleTimeString('es-AR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      date: new Date().toLocaleDateString('es-AR'),
      description: `Visita registrada - ${visit.direccion}`,
      company: 'Sin especificar'
    }));

    setVisits(prev => [...prev, ...processedVisits]);
    
    // Mostrar notificación de éxito
    alert(`Se agregaron ${newVisits.length} visita(s) correctamente ✅`);
  };

  return (
    <>
      {/* Title Section */}
      <div className="mb-6 sm:mb-8">
        {mode === 'admin' && (
          <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <Link 
              href="/admin/gestion" 
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">Volver a Gestión</span>
            </Link>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-400 text-base sm:text-lg">{description}</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row mb-6 sm:mb-8 bg-gray-800 rounded-lg p-1 gap-1 sm:gap-0">
        <button
          onClick={() => setActiveTab('workers')}
          suppressHydrationWarning
          className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
            activeTab === 'workers'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="hidden sm:inline">Mis Trabajadores</span>
          <span className="sm:hidden">Trabajadores</span>
        </button>
        <button
          onClick={() => setActiveTab('income')}
          suppressHydrationWarning
          className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
            activeTab === 'income'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="hidden sm:inline">Mis Ingresos</span>
          <span className="sm:hidden">Ingresos</span>
        </button>
        <button
          onClick={() => setActiveTab('visits')}
          suppressHydrationWarning
          className={`flex-1 py-2 px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
            activeTab === 'visits'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="hidden sm:inline">Visitas o Encomiendas</span>
          <span className="sm:hidden">Visitas</span>
        </button>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={
              activeTab === 'workers' 
                ? "Buscar por nombre, DNI o cargo..."
                : activeTab === 'visits'
                ? "Buscar visitante, anfitrión o empresa..."
                : "Buscar trabajador..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            suppressHydrationWarning
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        
        {activeTab === 'workers' && (
          <Button
            variant="primary"
            icon={<FiPlus className="w-4 h-4" />}
            onClick={() => setIsWorkerFormOpen(true)}
            suppressHydrationWarning
            className="w-full sm:w-auto"
          >
            <span className="hidden sm:inline">Agregar Trabajador</span>
            <span className="sm:hidden">Agregar</span>
          </Button>
        )}
        
        {activeTab === 'visits' && (
          <Button
            variant="primary"
            icon={<FiPlus className="w-4 h-4" />}
            onClick={() => setIsVisitFormOpen(true)}
            suppressHydrationWarning
            className="w-full sm:w-auto"
          >
            <span className="hidden sm:inline">Agregar Visita</span>
            <span className="sm:hidden">Agregar</span>
          </Button>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'workers' && (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Lista de Trabajadores Asegurados</h2>
          <div className="space-y-3 sm:space-y-4">
            {filteredWorkers.map((worker) => (
              <div key={worker.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-800/70 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-blue-600/20 p-2 rounded-lg flex-shrink-0">
                      <FiUsers className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-base sm:text-lg font-semibold text-white truncate">{worker.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          worker.isEnabled 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {worker.isEnabled ? 'Activado' : 'Desactivado'}
                        </span>
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm mb-3 space-y-1 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-3">
                        <span>DNI: {worker.dni}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Role: {worker.role}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Department: {worker.department}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Location: {worker.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {worker.insuranceTypes.map((type, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded text-xs text-blue-300">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-right mb-3">
                      <p className="text-sm text-gray-400">Desde: {worker.coverageSince}</p>
                    </div>
                    
                    {/* Admin actions */}
                    {mode === 'admin' && showActions && (
                      <div className="flex items-center space-x-2 mb-3">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<FiEdit className="w-4 h-4" />}
                          onClick={() => onWorkerEdit?.(worker)}
                          suppressHydrationWarning
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={<FiTrash2 className="w-4 h-4" />}
                          onClick={() => onWorkerDelete?.(worker.id)}
                          suppressHydrationWarning
                        >
                          Eliminar
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm font-medium ${
                        worker.isEnabled ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {worker.isEnabled ? 'Activado' : 'Desactivado'}
                      </span>
                      <Switch
                        checked={worker.isEnabled}
                        onChange={() => toggleWorkerStatus(worker.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'income' && (
        <div>
          <div className="flex items-center space-x-2 mb-4 sm:mb-6">
            <FiClock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Registro de Ingresos en Tiempo Real</h2>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden lg:block bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 gap-4 p-3 bg-gray-700/50 border-b border-gray-600 text-sm font-medium text-gray-300">
              <div>Trabajador</div>
              <div>DNI</div>
              <div>Departamento</div>
              <div>Entrada</div>
              <div>Salida</div>
              <div>Estado</div>
              <div>Fecha</div>
            </div>
            <div className="divide-y divide-gray-700">
              {filteredIncomeRecords.map((record) => (
                <div key={record.id} className="grid grid-cols-7 gap-4 p-3 text-sm hover:bg-gray-700/30 transition-colors">
                  <div className="text-white font-medium">{record.worker}</div>
                  <div className="text-gray-400">{record.dni}</div>
                  <div className="text-gray-400">{record.department}</div>
                  <div className="text-gray-400">{record.entryTime}</div>
                  <div className="text-gray-400">{record.exitTime || '-'}</div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'present'
                        ? 'bg-blue-600/20 text-blue-400'
                        : 'bg-gray-600/20 text-gray-400'
                    }`}>
                      {record.status === 'present' ? 'Presente' : 'Ausente'}
                    </span>
                  </div>
                  <div className="text-gray-400">{record.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {filteredIncomeRecords.map((record) => (
              <div key={record.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 hover:bg-gray-800/70 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium text-sm">{record.worker}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'present'
                        ? 'bg-blue-600/20 text-blue-400'
                        : 'bg-gray-600/20 text-gray-400'
                    }`}>
                      {record.status === 'present' ? 'Presente' : 'Ausente'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <div>DNI: {record.dni}</div>
                    <div>Depto: {record.department}</div>
                    <div>Entrada: {record.entryTime}</div>
                    <div>Salida: {record.exitTime || '-'}</div>
                  </div>
                  <div className="text-xs text-gray-500 pt-1 border-t border-gray-700">
                    Fecha: {record.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'visits' && (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Control de Visitas y Encomiendas</h2>
          <div className="space-y-3 sm:space-y-4">
            {filteredVisits.map((visit) => (
              <div key={visit.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-800/70 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      visit.type === 'visit' 
                        ? 'bg-blue-600/20' 
                        : 'bg-orange-600/20'
                    }`}>
                      {visit.type === 'visit' ? (
                        <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      ) : (
                        <FiPackage className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-base sm:text-lg font-semibold text-white truncate">{visit.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            visit.type === 'visit' 
                              ? 'bg-blue-600/20 text-blue-400' 
                              : 'bg-orange-600/20 text-orange-400'
                          }`}>
                            {visit.type === 'visit' ? 'Visita' : 'Encomienda'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            visit.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {visit.status === 'active' ? 'Activo' : 'Finalizado'}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm space-y-1 mb-3">
                        <p>DNI: {visit.dni}</p>
                        <p>Anfitrión: {visit.host}</p>
                        <p>Entrada: {visit.entryTime}</p>
                        <p>Fecha: {visit.date}</p>
                        {visit.type === 'delivery' && (
                          <p>Descripción: {visit.description}</p>
                        )}
                        {visit.company && (
                          <div className="flex items-center space-x-2">
                            <span className="text-xs sm:text-sm">{visit.company}</span>
                            {visit.exitTime && (
                              <>
                                <FiClock className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="text-green-400 text-xs sm:text-sm">Salida: {visit.exitTime}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {/* Admin actions */}
                    {mode === 'admin' && showActions && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<FiEdit className="w-4 h-4" />}
                          onClick={() => onVisitEdit?.(visit)}
                          suppressHydrationWarning
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={<FiTrash2 className="w-4 h-4" />}
                          onClick={() => onVisitDelete?.(visit.id)}
                          suppressHydrationWarning
                        >
                          Eliminar
                        </Button>
                      </div>
                    )}
                    
                    {visit.status === 'active' && visit.type === 'visit' && (
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<FiX className="w-4 h-4" />}
                        onClick={() => markVisitExit(visit.id)}
                        suppressHydrationWarning
                      >
                        Marcar Salida
                      </Button>
                    )}
                    {visit.status === 'active' && visit.type === 'delivery' && (
                      <Button
                        variant="warning"
                        size="sm"
                        icon={<FiPackage className="w-4 h-4" />}
                        onClick={() => markDeliveryRetrieved(visit.id)}
                        suppressHydrationWarning
                      >
                        Retirada por Seguridad
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Icon - Fixed Position */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <button 
          className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
          suppressHydrationWarning
        >
          <FiHelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
        </button>
      </div>

      {/* Worker Form Modal */}
      <WorkerForm
        isOpen={isWorkerFormOpen}
        onClose={() => setIsWorkerFormOpen(false)}
        onSubmit={handleWorkerSubmit}
      />

      {/* Visit Form Modal */}
      <VisitForm
        isOpen={isVisitFormOpen}
        onClose={() => setIsVisitFormOpen(false)}
        onSubmit={handleVisitSubmit}
      />
    </>
  );
} 

export default function AseguradosView(props: AseguradosViewProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AseguradosViewContent {...props} />
    </Suspense>
  );
}
