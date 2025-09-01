"use client";

import React, { useState } from 'react';
import { FiHome, FiMapPin, FiUsers, FiShield, FiCalendar, FiDollarSign, FiCheck, FiX, FiEdit, FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import { Card, Button, PageLayout, EstablishmentModal } from '@/components/shared';

interface Establishment {
  id: string;
  razonSocial: string;
  cuit: string;
  razonSocialNoRepeticion?: string;
  cuitNoRepeticion?: string;
  domicilio: string;
  email: string;
  telefono: string;
  fechaRegistro: string;
  productos: string[];
}

const MOCK_ESTABLISHMENTS: Establishment[] = [
  {
    id: '1',
    razonSocial: 'VILLA ROBERT',
    cuit: '30-71567019-0',
    domicilio: 'Calle Roberts S/N',
    email: 'roberts.eyssa@gmail.com',
    telefono: '2616658864',
    fechaRegistro: '2025-06-24 10:49:47',
    productos: ['ESPECTADOR', 'BALNEARIO', 'TRABAJADOR', 'VISITA']
  },
  {
    id: '2',
    razonSocial: 'ALMA GARDENIA',
    cuit: '30-12345678-9',
    domicilio: 'lateral oeste acceso sur y bulnes 0',
    email: 'administracion@barrioalmagardenia.com.ar',
    telefono: '2611234567',
    fechaRegistro: '2025-06-23 15:30:22',
    productos: ['ESPECTADOR', 'BALNEARIO']
  },
  {
    id: '3',
    razonSocial: 'BARRIO TERRUÑOS DE ARAOZ II',
    cuit: '30-98765432-1',
    domicilio: 'Av. San Martín 1234',
    email: 'info@terrunosaraoz.com.ar',
    telefono: '2619876543',
    fechaRegistro: '2025-06-22 09:15:10',
    productos: ['TRABAJADOR', 'VISITA']
  }
];

export default function EstablecimientosPage() {
  const [establishments, setEstablishments] = useState<Establishment[]>(MOCK_ESTABLISHMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEstablishment, setEditingEstablishment] = useState<Establishment | null>(null);

  const filteredEstablishments = establishments.filter(establishment => {
    const matchesSearch = establishment.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         establishment.cuit.includes(searchTerm) ||
                         establishment.domicilio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         establishment.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleEdit = (establishment: Establishment) => {
    setEditingEstablishment(establishment);
    setShowAddModal(true);
  };

  const handleSubmit = (establishmentData: Omit<Establishment, 'id' | 'fechaRegistro'>) => {
    if (editingEstablishment) {
      // Update existing establishment
      setEstablishments(prev => prev.map(est => 
        est.id === editingEstablishment.id 
          ? { ...establishmentData, id: est.id, fechaRegistro: est.fechaRegistro }
          : est
      ));
      setEditingEstablishment(null);
    } else {
      // Create new establishment
      const newEstablishment: Establishment = {
        ...establishmentData,
        id: Date.now().toString(),
        fechaRegistro: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      setEstablishments(prev => [...prev, newEstablishment]);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingEstablishment(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Establecimientos</h1>
        <p className="text-sm sm:text-base text-gray-300">Gestión de todos los establecimientos del sistema</p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por razón social, CUIT, domicilio o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          icon={<FiPlus className="w-4 h-4" />}
          className="w-full sm:w-auto whitespace-nowrap"
        >
          <span className="hidden sm:inline">Crear Establecimiento</span>
          <span className="sm:hidden">Crear</span>
        </Button>
      </div>

      {/* Establishments Table - Desktop */}
      <div className="hidden lg:block flex-1 bg-gray-900/50 rounded-lg border border-gray-700/50 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Table Header */}
          <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-700/50">
            <div className="grid grid-cols-7 gap-4 text-xs font-medium text-gray-300 uppercase tracking-wider">
              <div className="col-span-2">Razón Social</div>
              <div>CUIT</div>
              <div className="col-span-2">Domicilio</div>
              <div>Correo Electrónico</div>
              <div className="text-center">Acciones</div>
            </div>
          </div>

          {/* Table Body - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {filteredEstablishments.length > 0 ? (
              <div className="divide-y divide-gray-700/50">
                {filteredEstablishments.map((establishment) => (
                  <div key={establishment.id} className="px-6 py-4 hover:bg-gray-800/30 transition-colors">
                    <div className="grid grid-cols-7 gap-4 items-center">
                      <div className="col-span-2">
                        <div className="text-sm font-medium text-white">{establishment.razonSocial}</div>
                        <div className="text-xs text-gray-400 mt-1">Tel: {establishment.telefono}</div>
                      </div>
                      <div className="text-sm text-gray-300">{establishment.cuit}</div>
                      <div className="col-span-2 text-sm text-gray-300">{establishment.domicilio}</div>
                      <div className="text-sm text-gray-300 truncate">{establishment.email}</div>
                      <div className="text-center">
                        <button
                          onClick={() => handleEdit(establishment)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Modificar"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiHome className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">No se encontraron establecimientos</h3>
                  <p className="text-gray-400 mb-4">
                    {searchTerm ? 'No hay establecimientos que coincidan con la búsqueda' : 'No hay establecimientos registrados'}
                  </p>
                  {searchTerm && (
                    <Button
                      variant="primary"
                      onClick={() => setSearchTerm('')}
                    >
                      Limpiar Búsqueda
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Establishments Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredEstablishments.length > 0 ? (
          filteredEstablishments.map((establishment) => (
            <div key={establishment.id} className="bg-gray-900/50 rounded-lg border border-gray-700/50 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1">{establishment.razonSocial}</h3>
                  <div className="text-sm text-gray-400">CUIT: {establishment.cuit}</div>
                </div>
                <button
                  onClick={() => handleEdit(establishment)}
                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors flex-shrink-0"
                  title="Modificar"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                <div>
                  <span className="font-medium">Domicilio:</span> {establishment.domicilio}
                </div>
                <div>
                  <span className="font-medium">Teléfono:</span> {establishment.telefono}
                </div>
                <div className="sm:col-span-2">
                  <span className="font-medium">Email:</span> {establishment.email}
                </div>
                <div className="sm:col-span-2">
                  <span className="font-medium">Productos:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {establishment.productos.map((producto, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-600/20 text-blue-300 rounded-full border border-blue-500/30">
                        {producto}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-400 pt-2 border-t border-gray-700/50">
                <span className="font-medium">Fecha de registro:</span> {establishment.fechaRegistro}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHome className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">No se encontraron establecimientos</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm ? 'No hay establecimientos que coincidan con la búsqueda' : 'No hay establecimientos registrados'}
              </p>
              {searchTerm && (
                <Button
                  variant="primary"
                  onClick={() => setSearchTerm('')}
                >
                  Limpiar Búsqueda
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <EstablishmentModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        establishment={editingEstablishment}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
