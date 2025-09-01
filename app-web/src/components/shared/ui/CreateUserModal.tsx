"use client";

import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiHome, FiX, FiSave, FiShield } from 'react-icons/fi';
import { Button, Dialog, Combobox } from '@/components';

interface UserData {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  status: string;
  password: string;
  confirmPassword: string;
  establishmentId: string;
}

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: UserData) => void;
  userType?: 'establecimiento' | 'propietario' | 'general' | 'barrera';
  establishments?: Array<{ id: string; name: string }>;
}

export default function CreateUserModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  userType = 'general',
  establishments = []
}: CreateUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    status: 'active',
    password: '',
    confirmPassword: '',
    establishmentId: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const getRoleOptions = () => {
    switch (userType) {
      case 'establecimiento':
        return [
          { value: 'manager', label: 'Gerente' },
          { value: 'agent', label: 'Agente' },
          { value: 'client', label: 'Cliente' }
        ];
      case 'propietario':
        return [
          { value: 'owner', label: 'Propietario' },
          { value: 'manager', label: 'Administrador' }
        ];
      case 'barrera':
        return [
          { value: 'operator', label: 'Operador' },
          { value: 'supervisor', label: 'Supervisor' }
        ];
      default:
        return [
          { value: 'admin', label: 'Administrador' },
          { value: 'manager', label: 'Gerente' },
          { value: 'agent', label: 'Agente' },
          { value: 'client', label: 'Cliente' }
        ];
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.role) {
      newErrors.role = 'El rol es requerido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (userType === 'establecimiento' && !formData.establishmentId) {
      newErrors.establishmentId = 'Debe seleccionar un establecimiento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        status: 'active',
        password: '',
        confirmPassword: '',
        establishmentId: ''
      });
    }
  };

  const getModalTitle = () => {
    switch (userType) {
      case 'establecimiento':
        return 'Crear Usuario de Establecimiento';
      case 'propietario':
        return 'Crear Usuario Propietario';
      case 'barrera':
        return 'Crear Usuario de Barrera';
      default:
        return 'Crear Usuario';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <Dialog.Header>
          <Dialog.Title className="flex items-center gap-2">
            <FiUser className="w-5 h-5" />
            {getModalTitle()}
          </Dialog.Title>
        </Dialog.Header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Ingrese el nombre completo"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="usuario@empresa.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+54 11 1234-5678"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Empresa
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre de la empresa"
              />
            </div>
          </div>

          {/* Role and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rol *
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.role ? 'border-red-500' : 'border-gray-600'
                }`}
              >
                <option value="">Seleccionar rol</option>
                {getRoleOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="pending">Pendiente</option>
              </select>
            </div>
          </div>

          {/* Establishment Selection (only for establishment users) */}
          {userType === 'establecimiento' && establishments.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Establecimiento *
              </label>
              <select
                value={formData.establishmentId}
                onChange={(e) => handleInputChange('establishmentId', e.target.value)}
                className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.establishmentId ? 'border-red-500' : 'border-gray-600'
                }`}
              >
                <option value="">Seleccionar establecimiento</option>
                {establishments.map(establishment => (
                  <option key={establishment.id} value={establishment.id}>
                    {establishment.name}
                  </option>
                ))}
              </select>
              {errors.establishmentId && <p className="text-red-400 text-xs mt-1">{errors.establishmentId}</p>}
            </div>
          )}

          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Ingrese la contraseña"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Confirme la contraseña"
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
            <Button
              variant="secondary"
              icon={<FiX className="w-4 h-4" />}
              onClick={onClose}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              icon={<FiSave className="w-4 h-4" />}
              type="submit"
            >
              Crear Usuario
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
