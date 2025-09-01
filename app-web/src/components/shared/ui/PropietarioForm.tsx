"use client";

import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { Button, ButtonGradient } from '@/components';

interface PropietarioFormData {
  firstName: string;
  lastName: string;
  email: string;
  document: string;
  phone: string;
  neighborhood: string;
  block: string;
  lot: string;
  isActive: boolean;
}

interface PropietarioFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PropietarioFormData) => void;
  propietario?: PropietarioFormData | null;
  mode: 'create' | 'edit';
}

export default function PropietarioForm({
  isOpen,
  onClose,
  onSubmit,
  propietario,
  mode
}: PropietarioFormProps) {
  const [formData, setFormData] = useState<PropietarioFormData>({
    firstName: '',
    lastName: '',
    email: '',
    document: '',
    phone: '',
    neighborhood: '',
    block: '',
    lot: '',
    isActive: true
  });

  const [errors, setErrors] = useState<Partial<PropietarioFormData>>({});

  useEffect(() => {
    if (propietario && mode === 'edit') {
      setFormData(propietario);
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        document: '',
        phone: '',
        neighborhood: '',
        block: '',
        lot: '',
        isActive: true
      });
    }
    setErrors({});
  }, [propietario, mode]);

  const validateForm = (): boolean => {
    const newErrors: Partial<PropietarioFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.document.trim()) {
      newErrors.document = 'El documento es requerido';
    }
    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'El barrio es requerido';
    }
    if (!formData.lot.trim()) {
      newErrors.lot = 'El lote es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleInputChange = (field: keyof PropietarioFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#eff3f6] border-2 border-[#0047bb] rounded-2xl shadow-2xl w-full max-w-5xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#0047bb]/20">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#041e42] flex items-center gap-2">
              {mode === 'create' ? '✨' : '✏️'}
              {mode === 'create' ? 'Crear Propietario' : 'Editar Propietario'}
            </h2>
            <p className="text-[#041e42] mt-1 font-medium">
              {mode === 'create' 
                ? 'Completa la información para crear un nuevo propietario'
                : 'Modifica la información del propietario seleccionado'
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#0047bb] hover:text-[#041e42] transition-colors ml-4 mt-1"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md overflow-hidden">
            <div className="p-6 space-y-4">
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Nombre */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-3 py-2 border-2 rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm ${
                      errors.firstName ? 'border-red-500' : 'border-[#0047bb]'
                    }`}
                    placeholder="Ingresa el nombre"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Apellido */}
                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-3 py-2 border-2 rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm ${
                      errors.lastName ? 'border-red-500' : 'border-[#0047bb]'
                    }`}
                    placeholder="Ingresa el apellido"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border-2 rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm ${
                      errors.email ? 'border-red-500' : 'border-[#0047bb]'
                    }`}
                    placeholder="ejemplo@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border-2 rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm border-[#0047bb]"
                    placeholder="+54 11 1234-5678"
                  />
                </div>
              </div>

              {/* Documento */}
              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Documento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.document}
                  onChange={(e) => handleInputChange('document', e.target.value)}
                  className={`w-full px-3 py-2 border-2 rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm ${
                    errors.document ? 'border-red-500' : 'border-[#0047bb]'
                  }`}
                  placeholder="12.345.678"
                />
                {errors.document && (
                  <p className="text-red-500 text-xs mt-1">{errors.document}</p>
                )}
              </div>

              {/* Ubicación */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Barrio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    className={`w-full px-3 py-2 border-2 rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm ${
                      errors.neighborhood ? 'border-red-500' : 'border-[#0047bb]'
                    }`}
                    placeholder="BARRIO PRUEBA"
                  />
                  {errors.neighborhood && (
                    <p className="text-red-500 text-xs mt-1">{errors.neighborhood}</p>
                  )}
                </div>

                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Manzana
                  </label>
                  <input
                    type="text"
                    value={formData.block}
                    onChange={(e) => handleInputChange('block', e.target.value)}
                    className="w-full px-3 py-2 border-2 rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm border-[#0047bb]"
                    placeholder="A, B, C..."
                  />
                </div>

                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Lote <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lot}
                    onChange={(e) => handleInputChange('lot', e.target.value)}
                    className={`w-full px-3 py-2 border-2 rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm ${
                      errors.lot ? 'border-red-500' : 'border-[#0047bb]'
                    }`}
                    placeholder="15, 22, 43..."
                  />
                  {errors.lot && (
                    <p className="text-red-500 text-xs mt-1">{errors.lot}</p>
                  )}
                </div>
              </div>

              {/* Estado */}
              <div className="flex items-center space-x-3">
                <label className="text-sm font-semibold text-[#041e42]">
                  Estado del propietario
                </label>
                <button
                  type="button"
                  onClick={() => handleInputChange('isActive', !formData.isActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:ring-offset-2 focus:ring-offset-white ${
                    formData.isActive ? 'bg-[#0047bb]' : 'bg-gray-400'
                  }`}
                  role="switch"
                  aria-checked={formData.isActive}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      formData.isActive ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${
                  formData.isActive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formData.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-[#0047bb]/20 pt-6 flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
              className="px-6 py-3"
            >
              Cancelar
            </Button>
            <ButtonGradient
              type="submit"
              className="px-6 py-3"
            >
              {mode === 'create' ? 'Crear Propietario' : 'Guardar Cambios'}
            </ButtonGradient>
          </div>
        </form>
      </div>
    </div>
  );
}
