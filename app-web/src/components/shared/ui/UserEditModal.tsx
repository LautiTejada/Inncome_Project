"use client";

import { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';
import { Dialog } from '@/components';

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: { id: string; name: string; email: string; role: string; status: string; lastLogin: string; company: string }) => void;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    lastLogin: string;
    company: string;
  } | null;
  userType: string;
}

export default function UserEditModal({
  isOpen,
  onClose,
  onSave,
  user,
  userType
}: UserEditModalProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    status: user?.status || 'active',
    company: user?.company || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Actualizar formData cuando cambie el usuario
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        company: user.company
      });
      setErrors({});
    }
  }, [user]);

  const getRoleOptions = () => {
    switch (userType) {
      case 'establecimiento':
        return [
          { value: 'manager', label: 'Gerente' },
          { value: 'admin', label: 'Administrador' },
          { value: 'employee', label: 'Empleado' }
        ];
      case 'propietario':
        return [
          { value: 'owner', label: 'Propietario' },
          { value: 'admin', label: 'Administrador' }
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.role) {
      newErrors.role = 'El rol es obligatorio';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'La empresa/establecimiento es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && user) {
      onSave({
        id: user.id,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        lastLogin: user.lastLogin,
        company: formData.company
      });
      onClose();
    }
  };

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'establecimiento':
        return 'Establecimiento';
      case 'propietario':
        return 'Propietario';
      case 'barrera':
        return 'Barrera';
      case 'general':
        return 'General';
      default:
        return 'Usuario';
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{`Editar Usuario - ${user?.name || getUserTypeLabel(userType)}`}</Dialog.Title>
        </Dialog.Header>
        {user && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-gray-400 text-sm">
              Modifica la información del usuario. Los campos marcados con * son obligatorios.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Nombre completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Ingrese el nombre completo"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="usuario@ejemplo.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Rol *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.role ? 'border-red-500' : 'border-gray-700'
                    }`}
                  >
                    <option value="">Seleccionar rol</option>
                    {getRoleOptions().map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Estado</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                    <option value="pending">Pendiente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    {userType === 'establecimiento' ? 'Establecimiento' : 
                     userType === 'barrera' ? 'Barrera' : 'Empresa'} *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.company ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder={`Ingrese ${userType === 'establecimiento' ? 'establecimiento' : 
                                           userType === 'barrera' ? 'barrera' : 'empresa'}`}
                  />
                  {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                <FiSave className="w-4 h-4" />
                Guardar Cambios
              </button>
            </div>
          </form>
        )}
      </Dialog.Content>
    </Dialog>
  );
}
