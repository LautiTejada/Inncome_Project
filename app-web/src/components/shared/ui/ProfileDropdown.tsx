'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiMail, FiMapPin, FiCalendar, FiEdit3, FiSettings, FiLogOut, FiChevronDown, FiX } from 'react-icons/fi';
import { Button, Dialog } from '@/components';

interface ProfileDropdownProps {
  className?: string;
  name?: string;
  role?: string;
  initials?: string;
  mode?: 'admin' | 'cliente' | 'empresa' | 'establecimiento' | 'barrera';
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ className = '', name = 'CAMILA DIMARCO', role = 'Cliente', initials = 'CD', mode = 'cliente' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  const [editForm, setEditForm] = useState({
    fullName: name,
    email: 'camila.dimarco@email.com',
    phone: '+54 9 11 1234-5678',
    address: 'Av. Corrientes 1234, CABA',
    dni: '12.345.678',
    unit: 'Depto 4B',
    block: 'A',
    lot: '15'
  });

  // Determinar el role basado en el modo
  const getRoleLabel = () => {
    switch (mode) {
      case 'admin':
        return 'Administrador';
      case 'empresa':
        return 'Empresa';
      case 'establecimiento':
        return 'Establecimiento';
      case 'barrera':
        return 'Control de Acceso';
      case 'cliente':
      default:
        return 'Cliente';
    }
  };

  const mainUser = {
    name,
    initials,
    dni: '12.345.678',
    email: 'camila.dimarco@email.com',
    phone: '+54 9 11 1234-5678',
    location: 'Manzana A - Lote 15',
    unit: 'Depto 4B',
    address: 'Av. Corrientes 1234, CABA',
    memberSince: '14/1/2023',
    status: 'active' as const,
    role: getRoleLabel()
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calcular posición del dropdown
  useEffect(() => {
    if (isOpen && triggerRef.current && mounted) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const dropdownHeight = 320;
      const dropdownWidth = 320;
      
      let top = rect.bottom + 8; // 8px de margen
      let left = rect.right - dropdownWidth;
      
      // Si no hay espacio abajo, mostrar arriba
      if (rect.bottom + dropdownHeight > viewportHeight && rect.top > dropdownHeight) {
        top = rect.top - dropdownHeight - 8;
      }
      
      // Si no hay espacio a la derecha, ajustar
      if (left < 16) {
        left = 16;
      }
      
      // Si se sale por la derecha, ajustar
      if (left + dropdownWidth > viewportWidth - 16) {
        left = viewportWidth - dropdownWidth - 16;
      }
      
      setDropdownPosition({ top, left, width: rect.width });
    }
  }, [isOpen, mounted]);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (mounted) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [mounted]);

  // Cerrar dropdown cuando se hace scroll o resize
  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    const handleResize = () => setIsOpen(false);

    if (mounted) {
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [mounted]);

  const handleSaveChanges = () => {
    setIsEditModalOpen(false);
  };

  const renderDropdown = () => {
    if (!mounted || !isOpen) return null;

    return createPortal(
      <div 
        ref={dropdownRef}
        className="fixed bg-gray-800/95 backdrop-blur-sm rounded-xl border border-gray-700 shadow-2xl z-[99999] overflow-hidden"
        style={{
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: '320px',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 32px)'
        }}
      >
        <div className="p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {/* User Info Header */}
          <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 flex-shrink-0">
              <span className="text-white font-bold text-lg">{mainUser.initials}</span>
            </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold truncate">{mainUser.name}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full whitespace-nowrap">{mainUser.role}</span>
              <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full whitespace-nowrap">Activo</span>
            </div>
          </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <FiMail className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span className="text-gray-300 truncate">{mainUser.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <FiMapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span className="text-gray-300 truncate">{mainUser.location} - {mainUser.unit}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <FiCalendar className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span className="text-gray-300">Miembro desde: {mainUser.memberSince}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={() => setIsEditModalOpen(true)}
              size="sm"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white justify-start"
            >
              <FiEdit3 className="w-3 h-3 mr-2 flex-shrink-0" />
              <span className="truncate">Editar Perfil</span>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="w-full justify-start"
            >
              <FiSettings className="w-3 h-3 mr-2 flex-shrink-0" />
              <span className="truncate">Configuración</span>
            </Button>
            <Button
              size="sm"
              variant="danger"
              className="w-full justify-start"
            >
              <FiLogOut className="w-3 h-3 mr-2 flex-shrink-0" />
              <span className="truncate">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-colors duration-200 min-w-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 flex-shrink-0">
          <span className="text-white text-xs font-bold">{mainUser.initials}</span>
        </div>
        <div className="text-white text-left min-w-0 flex-1 hidden sm:block">
          <div className="font-semibold text-sm truncate">{mainUser.name}</div>
          <div className="text-xs text-gray-300">{mainUser.role}</div>
        </div>
        <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu - Renderizado como Portal */}
      {renderDropdown()}

            {/* Edit Profile Modal */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      >
        <Dialog.Content className="max-w-2xl">
          <Dialog.Header>
            <div className="flex items-center justify-between">
              <Dialog.Title>Editar Información Personal</Dialog.Title>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
                aria-label="Cerrar modal"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </Dialog.Header>
        <div>
          <p className="text-gray-400 text-sm mb-4">Actualiza tu información de contacto y detalles del perfil.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo *</label>
              <input
                type="text"
                value={editForm.fullName}
                onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
              <input
                type="text"
                value={editForm.phone}
                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dirección Completa</label>
              <input
                type="text"
                value={editForm.address}
                onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">DNI</label>
              <input
                type="text"
                value={editForm.dni}
                disabled
                className="w-full bg-gray-600 border border-gray-600 rounded-lg px-3 py-2 text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">El DNI no se puede modificar</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Unidad</label>
              <input
                type="text"
                value={editForm.unit}
                onChange={(e) => setEditForm({...editForm, unit: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Manzana</label>
              <input
                type="text"
                value={editForm.block}
                onChange={(e) => setEditForm({...editForm, block: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Lote</label>
              <input
                type="text"
                value={editForm.lot}
                onChange={(e) => setEditForm({...editForm, lot: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <Button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveChanges}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export default ProfileDropdown; 