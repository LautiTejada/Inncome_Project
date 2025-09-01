"use client";

import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiHome, FiX } from 'react-icons/fi';
import { User, UserFormProps } from '@/types';
import { Button, Combobox, Switch } from '@/components';
import { USER_ROLES, USER_STATUSES, USER_PERMISSIONS } from '@/constants';

interface Option {
  value: string;
  label: string;
}

export default function UserForm({ user, onSubmit, onCancel, isEditing = false }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'client',
    status: 'active',
    phone: '',
    company: '',
    permissions: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone || '',
        company: user.company || '',
        permissions: user.permissions || [],
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof User, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
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

    if (!formData.status) {
      newErrors.status = 'El estado es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const togglePermission = (permission: string) => {
    const currentPermissions = formData.permissions || [];
    const newPermissions = currentPermissions.includes(permission)
      ? currentPermissions.filter(p => p !== permission)
      : [...currentPermissions, permission];
    
    handleInputChange('permissions', newPermissions);
  };

  const getRolePermissions = (role: string) => {
    const rolePermissionMap: Record<string, string[]> = {
      admin: ['dashboard:read', 'users:read', 'users:write', 'users:delete', 'policies:read', 'policies:write', 'reports:read', 'settings:read', 'settings:write'],
      manager: ['dashboard:read', 'users:read', 'policies:read', 'policies:write', 'reports:read'],
      agent: ['dashboard:read', 'policies:read', 'policies:write'],
      client: ['dashboard:read', 'policies:read'],
    };
    return rolePermissionMap[role] || [];
  };

  const handleRoleChange = (option: Option) => {
    handleInputChange('role', option.value);
    // Auto-set permissions based on role
    handleInputChange('permissions', getRolePermissions(option.value));
  };

  const handleStatusChange = (option: Option) => {
    handleInputChange('status', option.value);
  };

  const getCurrentRoleOption = (): Option | null => {
    if (!formData.role) return null;
    const role = USER_ROLES.find(r => r.value === formData.role);
    return role ? { value: role.value, label: role.label } : null;
  };

  const getCurrentStatusOption = (): Option | null => {
    if (!formData.status) return null;
    const status = USER_STATUSES.find(s => s.value === formData.status);
    return status ? { value: status.value, label: status.label } : null;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          <FiX className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Nombre Completo *
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 bg-white/10 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Ingresa el nombre completo"
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Email *
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 bg-white/10 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="usuario@empresa.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Teléfono
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+54 11 1234-5678"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Empresa
            </label>
            <div className="relative">
              <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre de la empresa"
              />
            </div>
          </div>
        </div>

        {/* Role and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Rol *
            </label>
            <Combobox
              value={getCurrentRoleOption()}
              onChange={handleRoleChange}
              options={USER_ROLES.map(role => ({ value: role.value, label: role.label }))}
              placeholder="Seleccionar rol"
              className="w-full"
            />
            {errors.role && <p className="mt-1 text-sm text-red-400">{errors.role}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Estado *
            </label>
            <Combobox
              value={getCurrentStatusOption()}
              onChange={handleStatusChange}
              options={USER_STATUSES.map(status => ({ value: status.value, label: status.label }))}
              placeholder="Seleccionar estado"
              className="w-full"
            />
            {errors.status && <p className="mt-1 text-sm text-red-400">{errors.status}</p>}
          </div>
        </div>

        {/* Permissions */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-4">
            Permisos
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {USER_PERMISSIONS.map((permission) => {
              const isChecked = formData.permissions?.includes(permission) || false;
              const isDisabled = !isEditing && formData.role && getRolePermissions(formData.role).includes(permission);
              
              return (
                <div key={permission} className="flex items-center space-x-3">
                  <Switch
                    checked={isChecked}
                    onChange={() => togglePermission(permission)}
                  />
                  <label className={`text-sm ${isDisabled ? 'text-white/40' : 'text-white/80'}`}>
                    {permission.replace(':', ' ').replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </label>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-white/60">
            Los permisos se configuran automáticamente según el rol seleccionado
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-white/20">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
          </Button>
        </div>
      </form>
    </div>
  );
}
