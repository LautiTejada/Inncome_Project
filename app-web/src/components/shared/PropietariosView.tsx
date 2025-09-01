"use client";

import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button, PropietarioForm } from '@/components';

interface Owner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  document: string;
  neighborhood: string;
  block: string;
  lot: string;
  phone: string;
  isActive: boolean;
}

interface PropietariosViewProps {
  mode?: 'admin' | 'propietario' | 'establecimiento';
  title?: string;
  description?: string;
  showActions?: boolean;
}

export default function PropietariosView({
  mode = 'establecimiento',
  title = 'Usuarios Propietario',
  description = 'Gestiona los propietarios de tu establecimiento',
  showActions = true
}: PropietariosViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [propietarioToEdit, setPropietarioToEdit] = useState<Owner | null>(null);

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data basado en la imagen del usuario
  const [owners, setOwners] = useState<Owner[]>([
    {
      id: '1',
      email: 'notengo@gmail.com',
      firstName: 'INDIO',
      lastName: 'SOLARI',
      document: '34345678',
      neighborhood: 'BARRIO PRUEBA',
      block: '',
      lot: '43',
      phone: '2634222222',
      isActive: false
    },
    {
      id: '2',
      email: 'pepehongo@gmail.com',
      firstName: 'Pepe',
      lastName: 'Hongo',
      document: '33333333',
      neighborhood: 'BARRIO PRUEBA',
      block: 'F',
      lot: '45',
      phone: '2634222222',
      isActive: false
    },
    {
      id: '3',
      email: 'propietario@gmail.com',
      firstName: 'Prueba',
      lastName: 'Prueba',
      document: '123123123',
      neighborhood: 'BARRIO PRUEBA',
      block: '12',
      lot: '5',
      phone: '-',
      isActive: true
    },
    {
      id: '4',
      email: 'juan.perez@email.com',
      firstName: 'Juan',
      lastName: 'Pérez',
      document: '45678901',
      neighborhood: 'BARRIO CENTRO',
      block: 'A',
      lot: '15',
      phone: '2634111111',
      isActive: true
    },
    {
      id: '5',
      email: 'maria.gonzalez@email.com',
      firstName: 'María',
      lastName: 'González',
      document: '56789012',
      neighborhood: 'BARRIO NORTE',
      block: 'B',
      lot: '22',
      phone: '2634333333',
      isActive: true
    }
  ]);

  const filteredOwners = owners.filter(owner =>
    owner.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.document.includes(searchTerm) ||
    owner.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOwnerStatus = (ownerId: string) => {
    console.log('Cambiar estado del propietario:', ownerId);
    // Aquí iría la lógica para cambiar el estado del propietario
    // Actualizar el estado local
    setOwners(prev => prev.map(owner => 
      owner.id === ownerId 
        ? { ...owner, isActive: !owner.isActive }
        : owner
    ));
  };

  const handleEditOwner = (owner: Owner) => {
    setPropietarioToEdit(owner);
    setIsEditModalOpen(true);
  };

  const handleDeleteOwner = (ownerId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este propietario?')) {
      console.log('Eliminando propietario:', ownerId);
      // Aquí iría la lógica para eliminar el propietario
      // Actualizar el estado local
      setOwners(prev => prev.filter(owner => owner.id !== ownerId));
    }
  };

  const handleCreatePropietario = (data: Omit<Owner, 'id'>) => {
    const newPropietario: Owner = {
      id: `new-${Date.now()}`,
      ...data
    };
    setOwners(prev => [...prev, newPropietario]);
    console.log('Nuevo propietario creado:', newPropietario);
  };

  const handleUpdatePropietario = (data: Partial<Owner>) => {
    if (propietarioToEdit) {
      setOwners(prev => prev.map(owner => 
        owner.id === propietarioToEdit.id 
          ? { ...owner, ...data }
          : owner
      ));
      console.log('Propietario actualizado:', data);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-sm sm:text-base text-gray-400">{description}</p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          {mounted ? (
            <input
              type="text"
              placeholder="Buscar por nombre, apellido, email o documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400">
              Buscar por nombre, apellido, email o documento...
            </div>
          )}
        </div>
        
        {showActions && (
          mounted ? (
            <Button
              variant="primary"
              icon={<FiPlus className="w-4 h-4" />}
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Agregar Propietario</span>
              <span className="sm:hidden">Agregar</span>
            </Button>
          ) : (
            <div className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-400">
              Agregar Propietario
            </div>
          )
        )}
      </div>

      {/* Owners List */}
      <div className="space-y-4">
        {filteredOwners.map((owner) => (
          <div key={owner.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-800/70 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-3 sm:space-y-0">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-blue-600/20 p-2 rounded-lg flex-shrink-0">
                  <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {owner.firstName[0]}{owner.lastName[0]}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-white">{owner.firstName} {owner.lastName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      owner.isActive 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {owner.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm mb-3 space-y-1 sm:space-y-0">
                    <div className="sm:flex sm:items-center sm:space-x-3">
                      <span>Email: {owner.email}</span>
                      <span className="hidden sm:inline mx-3">•</span>
                      <span>DNI: {owner.document}</span>
                      <span className="hidden sm:inline mx-3">•</span>
                      <span>Tel: {owner.phone}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded text-xs text-blue-300">
                      {owner.neighborhood}
                    </span>
                    <span className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded text-xs text-purple-300">
                      Manzana: {owner.block || 'N/A'}
                    </span>
                    <span className="px-2 py-1 bg-green-600/20 border border-green-500/30 rounded text-xs text-green-300">
                      Lote: {owner.lot}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                                 {/* Admin actions */}
                 {showActions && (
                   mounted ? (
                     <div className="flex items-center space-x-2 mb-3">
                       <Button
                         variant="primary"
                         size="sm"
                         icon={<FiEdit className="w-4 h-4" />}
                         onClick={() => handleEditOwner(owner)}
                         className="w-full sm:w-auto"
                       >
                         <span className="hidden sm:inline">Editar</span>
                         <span className="sm:hidden">Editar</span>
                       </Button>
                       <Button
                         variant="danger"
                         size="sm"
                         icon={<FiTrash2 className="w-4 h-4" />}
                         onClick={() => handleDeleteOwner(owner.id)}
                       >
                         Eliminar
                       </Button>
                     </div>
                   ) : (
                     <div className="flex items-center space-x-2 mb-3">
                       <div className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded text-gray-400 text-sm">
                         Editar
                       </div>
                       <div className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded text-gray-400 text-sm">
                         Eliminar
                       </div>
                     </div>
                   )
                 )}
                
                                 <div className="flex items-center space-x-3">
                   <span className={`text-sm font-medium ${
                     owner.isActive ? 'text-green-400' : 'text-red-400'
                   }`}>
                     {owner.isActive ? 'Activado' : 'Desactivado'}
                   </span>
                   {mounted ? (
                     <button
                       onClick={() => toggleOwnerStatus(owner.id)}
                       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                         owner.isActive ? 'bg-blue-600' : 'bg-gray-600'
                       }`}
                       role="switch"
                       aria-checked={owner.isActive}
                     >
                       <span
                         className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                           owner.isActive ? 'translate-x-6' : 'translate-x-0.5'
                         }`}
                       />
                     </button>
                   ) : (
                     <div className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                       owner.isActive ? 'bg-blue-600' : 'bg-gray-600'
                     }`}>
                       <span
                         className={`inline-block h-5 w-5 transform rounded-full bg-white ${
                           owner.isActive ? 'translate-x-6' : 'translate-x-0.5'
                         }`}
                       />
                     </div>
                   )}
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>



      {/* Modal para Crear Propietario */}
      <PropietarioForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePropietario}
        mode="create"
      />

      {/* Modal para Editar Propietario */}
      <PropietarioForm
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setPropietarioToEdit(null);
        }}
        onSubmit={handleUpdatePropietario}
        propietario={propietarioToEdit}
        mode="edit"
      />
    </>
  );
}
