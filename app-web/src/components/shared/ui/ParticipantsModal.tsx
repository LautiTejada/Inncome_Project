'use client';

import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiSearch, FiFilter } from 'react-icons/fi';
import { Button, Dialog } from '@/components';

interface ParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Participant {
  id: string;
  fullName: string;
  dni: string;
  email: string;
  phone: string;
  birthDate: string;
  relationship: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Datos de ejemplo de participantes
  const participants: Participant[] = [
    {
      id: '1',
      fullName: 'María González',
      dni: '12345678',
      email: 'maria.gonzalez@email.com',
      phone: '+54 11 1234-5678',
      birthDate: '15/03/1985',
      relationship: 'Titular',
      status: 'active',
      joinDate: '15/01/2024'
    },
    {
      id: '2',
      fullName: 'Carlos González',
      dni: '87654321',
      email: 'carlos.gonzalez@email.com',
      phone: '+54 11 8765-4321',
      birthDate: '22/07/1983',
      relationship: 'Cónyuge',
      status: 'active',
      joinDate: '15/01/2024'
    },
    {
      id: '3',
      fullName: 'Ana González',
      dni: '11223344',
      email: 'ana.gonzalez@email.com',
      phone: '+54 11 1122-3344',
      birthDate: '10/12/2010',
      relationship: 'Hijo/a',
      status: 'active',
      joinDate: '15/01/2024'
    },
    {
      id: '4',
      fullName: 'Luis Rodríguez',
      dni: '55667788',
      email: 'luis.rodriguez@email.com',
      phone: '+54 11 5566-7788',
      birthDate: '05/09/1978',
      relationship: 'Titular',
      status: 'pending',
      joinDate: '20/02/2024'
    },
    {
      id: '5',
      fullName: 'Sofía Rodríguez',
      dni: '99887766',
      email: 'sofia.rodriguez@email.com',
      phone: '+54 11 9988-7766',
      birthDate: '18/11/1980',
      relationship: 'Cónyuge',
      status: 'inactive',
      joinDate: '20/02/2024'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'active', label: 'Activos' },
    { value: 'inactive', label: 'Inactivos' },
    { value: 'pending', label: 'Pendientes' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.dni.includes(searchTerm);
    
    const matchesFilter = selectedFilter === 'all' || participant.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

    return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Content className="max-w-4xl">
        <Dialog.Header>
          <Dialog.Title>Participantes</Dialog.Title>
        </Dialog.Header>
      <div className="space-y-6">
        {/* Filtros y búsqueda */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o DNI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400 w-4 h-4" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de participantes */}
        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {filteredParticipants.map((participant) => (
              <div
                key={participant.id}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-white font-semibold text-lg">
                          {participant.fullName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(participant.status)}`}>
                          {getStatusText(participant.status)}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{participant.relationship}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">DNI: {participant.dni}</p>
                    <p className="text-gray-400 text-sm">Ingreso: {participant.joinDate}</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <FiMail className="text-gray-400 w-4 h-4" />
                    <span className="text-gray-300">{participant.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiPhone className="text-gray-400 w-4 h-4" />
                    <span className="text-gray-300">{participant.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="text-gray-400 w-4 h-4" />
                    <span className="text-gray-300">Nac: {participant.birthDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-600">
          <div className="text-gray-400 text-sm">
            Mostrando {filteredParticipants.length} de {participants.length} participantes
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
        </Dialog.Content>
      </Dialog>
  );
};

export default ParticipantsModal; 