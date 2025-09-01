"use client";

import { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { UserFilters as UserFiltersType } from '@/types';
import { Button, Combobox } from '@/components';
import { USER_ROLES, USER_STATUSES } from '@/constants';

interface Option {
  value: string;
  label: string;
}

interface UserFiltersProps {
  filters: UserFiltersType;
  onFiltersChange: (filters: UserFiltersType) => void;
  onClearFilters: () => void;
}

export default function UserFilters({ filters, onFiltersChange, onClearFilters }: UserFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof UserFiltersType, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleComboboxChange = (key: keyof UserFiltersType, option: Option) => {
    onFiltersChange({
      ...filters,
      [key]: option.value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const getCurrentRoleOption = (): Option | null => {
    if (!filters.role) return null;
    const role = USER_ROLES.find(r => r.value === filters.role);
    return role ? { value: role.value, label: role.label } : null;
  };

  const getCurrentStatusOption = (): Option | null => {
    if (!filters.status) return null;
    const status = USER_STATUSES.find(s => s.value === filters.status);
    return status ? { value: status.value, label: status.label } : null;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FiFilter className="w-5 h-5 text-white/60" />
          <h3 className="text-lg font-medium text-white">Filtros</h3>
          {hasActiveFilters && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
              {Object.values(filters).filter(v => v !== '').length} activos
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <FiX className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            {isExpanded ? 'Ocultar' : 'Mostrar'} Filtros
          </Button>
        </div>
      </div>

      {/* Search Bar - Always Visible */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          placeholder="Buscar por nombre, email o empresa..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/20">
          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Rol
            </label>
            <Combobox
              value={getCurrentRoleOption()}
              onChange={(value) => handleComboboxChange('role', value)}
              options={[
                { value: '', label: 'Todos los roles' },
                ...USER_ROLES.map(role => ({ value: role.value, label: role.label }))
              ]}
              placeholder="Seleccionar rol"
              className="w-full"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Estado
            </label>
            <Combobox
              value={getCurrentStatusOption()}
              onChange={(value) => handleComboboxChange('status', value)}
              options={[
                { value: '', label: 'Todos los estados' },
                ...USER_STATUSES.map(status => ({ value: status.value, label: status.label }))
              ]}
              placeholder="Seleccionar estado"
              className="w-full"
            />
          </div>

          {/* Company Filter */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Empresa
            </label>
            <input
              type="text"
              placeholder="Filtrar por empresa..."
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}
