'use client';

import React from 'react';
import { FiMail, FiPhone, FiCalendar, FiMapPin, FiShield, FiX } from 'react-icons/fi';
import { Button, Dialog } from '@/components';

interface LinkedAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LinkedAccount {
  id: number;
  name: string;
  initials: string;
  color: string;
  email: string;
  phone: string;
  dni: string;
  relationship: string;
  joinDate: string;
  location: string;
  status: 'active' | 'inactive' | 'pending';
  insuranceTypes: string[];
}

const LinkedAccountsModal: React.FC<LinkedAccountsModalProps> = ({ isOpen, onClose }) => {
  // Datos de las cuentas vinculadas con información completa
  const linkedAccounts: LinkedAccount[] = [
    {
      id: 1,
      name: 'María González',
      initials: 'MG',
      color: 'from-green-500 to-green-600',
      email: 'maria.gonzalez@email.com',
      phone: '+54 11 1234-5678',
      dni: '12.345.678',
      relationship: 'Titular',
      joinDate: '15/01/2024',
      location: 'Manzana A - Lote 15',
      status: 'active',
      insuranceTypes: ['Responsabilidad Civil Comercial', 'Accidentes Personales']
    },
    {
      id: 2,
      name: 'Carlos López',
      initials: 'CL',
      color: 'from-purple-500 to-purple-600',
      email: 'carlos.lopez@email.com',
      phone: '+54 11 8765-4321',
      dni: '23.456.789',
      relationship: 'Cónyuge',
      joinDate: '15/01/2024',
      location: 'Manzana A - Lote 15',
      status: 'active',
      insuranceTypes: ['Responsabilidad Civil', 'Seguro Integral']
    },
    {
      id: 3,
      name: 'Ana Rodríguez',
      initials: 'AR',
      color: 'from-orange-500 to-orange-600',
      email: 'ana.rodriguez@email.com',
      phone: '+54 11 1122-3344',
      dni: '34.567.890',
      relationship: 'Hijo/a',
      joinDate: '15/01/2024',
      location: 'Manzana A - Lote 15',
      status: 'active',
      insuranceTypes: ['Accidentes Personales Colectivo']
    }
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

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Content className="max-w-4xl">
        <Dialog.Header>
          <Dialog.Title>Personas Vinculadas al Lote</Dialog.Title>
        </Dialog.Header>
        
        <div className="space-y-6">
          {/* Información del Lote */}
          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
            <div className="flex items-center space-x-3">
              <FiMapPin className="text-blue-400 w-5 h-5" />
              <div>
                <h3 className="text-white font-semibold text-lg">Manzana A - Lote 15</h3>
                <p className="text-gray-300 text-sm">Ubicación del lote compartido</p>
              </div>
            </div>
          </div>

          {/* Lista de personas vinculadas */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {linkedAccounts.map((account) => (
              <div
                key={account.id}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-all duration-200 hover:bg-gray-800/70"
              >
                {/* Header de la persona */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${account.color} rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="text-white font-bold text-lg">{account.initials}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-white font-semibold text-lg truncate">
                          {account.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(account.status)} flex-shrink-0`}>
                          {getStatusText(account.status)}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{account.relationship}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className="text-gray-400 text-sm font-medium">DNI: {account.dni}</p>
                    <p className="text-gray-400 text-sm">Ingreso: {account.joinDate}</p>
                  </div>
                </div>
                
                {/* Información de contacto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <FiMail className="text-gray-400 w-4 h-4 flex-shrink-0" />
                    <span className="text-gray-300 truncate">{account.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiPhone className="text-gray-400 w-4 h-4 flex-shrink-0" />
                    <span className="text-gray-300 truncate">{account.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiShield className="text-gray-400 w-4 h-4 flex-shrink-0" />
                    <span className="text-gray-300">{account.insuranceTypes.length} seguros</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="text-gray-400 w-4 h-4 flex-shrink-0" />
                    <span className="text-gray-300">Desde: {account.joinDate}</span>
                  </div>
                </div>

                {/* Tipos de seguro */}
                <div className="border-t border-gray-600 pt-3">
                  <h4 className="text-gray-300 text-sm font-medium mb-2">Tipos de Seguro:</h4>
                  <div className="flex flex-wrap gap-2">
                    {account.insuranceTypes.map((type, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-blue-600/20 text-blue-300 text-xs rounded-lg border border-blue-500/30 font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-600">
            <div className="text-gray-400 text-sm">
              {linkedAccounts.length} persona{linkedAccounts.length !== 1 ? 's' : ''} vinculada{linkedAccounts.length !== 1 ? 's' : ''} al lote
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default LinkedAccountsModal; 