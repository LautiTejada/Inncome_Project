"use client";

import React, { useState, useEffect } from 'react';
import { FiX, FiHome, FiMapPin, FiUsers, FiShield, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { Dialog, Button } from '@/components/shared';

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

interface EstablishmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  establishment?: Establishment | null;
  onSubmit: (establishment: Omit<Establishment, 'id' | 'fechaRegistro'>) => void;
}

export default function EstablishmentModal({
  isOpen,
  onClose,
  establishment,
  onSubmit
}: EstablishmentModalProps) {
  const [formData, setFormData] = useState({
    razonSocial: '',
    cuit: '',
    razonSocialNoRepeticion: '',
    cuitNoRepeticion: '',
    domicilio: '',
    email: '',
    telefono: '',
    productos: [] as string[]
  });

  const isEditing = !!establishment;

  useEffect(() => {
    if (establishment) {
      setFormData({
        razonSocial: establishment.razonSocial,
        cuit: establishment.cuit,
        razonSocialNoRepeticion: establishment.razonSocialNoRepeticion || '',
        cuitNoRepeticion: establishment.cuitNoRepeticion || '',
        domicilio: establishment.domicilio,
        email: establishment.email,
        telefono: establishment.telefono,
        productos: establishment.productos || []
      });
    } else {
      setFormData({
        razonSocial: '',
        cuit: '',
        razonSocialNoRepeticion: '',
        cuitNoRepeticion: '',
        domicilio: '',
        email: '',
        telefono: '',
        productos: []
      });
    }
  }, [establishment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleInputChange = (field: keyof typeof formData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProductToggle = (product: string) => {
    const newProductos = formData.productos.includes(product)
      ? formData.productos.filter(p => p !== product)
      : [...formData.productos, product];
    handleInputChange('productos', newProductos);
  };

  const availableProducts = [
    'ESPECTADOR',
    'BALNEARIO', 
    'TRABAJADOR',
    'VISITA'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#eff3f6] border-2 border-[#0047bb] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#0047bb]/20">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#041e42]">
              {isEditing ? 'Editar Establecimiento' : 'Crear Establecimiento'}
            </h2>
            <p className="text-[#041e42] mt-1 font-medium">
              {isEditing ? 'Modifica la información del establecimiento' : 'Registra un nuevo establecimiento de forma rápida y sencilla'}
            </p>
            <div className="mt-3 flex items-center gap-2 bg-[#eaf3ff] border border-[#d0e3fa] rounded-lg shadow-sm px-3 py-2 min-w-[120px]">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0047bb] text-white">
                <FiHome className="w-4 h-4" />
              </span>
              <div className="flex flex-col justify-center">
                <span className="text-[#0047bb] font-semibold text-xs leading-tight">
                  Establecimiento
                </span>
                <span className="text-xl font-normal text-[#041e42] leading-tight">
                  {isEditing ? 'Edición' : 'Nuevo'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#0047bb] hover:text-[#041e42] transition-colors ml-4 mt-1"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md overflow-hidden">
            <div className="p-4 border-b border-[#0047bb]/20">
              <h3 className="text-lg font-bold text-[#041e42] tracking-wide flex items-center gap-2">
                <FiHome className="w-5 h-5 text-[#0047bb]" />
                Información Básica
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Razón Social <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.razonSocial}
                    onChange={(e) => handleInputChange('razonSocial', e.target.value)}
                    className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                    placeholder="Razón Social"
                  />
                </div>
                
                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    CUIT <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cuit}
                    onChange={(e) => handleInputChange('cuit', e.target.value)}
                    className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                    placeholder="CUIT"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Razón Social (No Repetición) <span className="text-gray-500">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.razonSocialNoRepeticion}
                    onChange={(e) => handleInputChange('razonSocialNoRepeticion', e.target.value)}
                    className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                    placeholder="Razón Social No Repetición"
                  />
                </div>
                
                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    CUIT (No Repetición) <span className="text-gray-500">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.cuitNoRepeticion}
                    onChange={(e) => handleInputChange('cuitNoRepeticion', e.target.value)}
                    className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                    placeholder="CUIT No Repetición"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md overflow-hidden">
            <div className="p-4 border-b border-[#0047bb]/20">
              <h3 className="text-lg font-bold text-[#041e42] tracking-wide flex items-center gap-2">
                <FiMapPin className="w-5 h-5 text-[#0047bb]" />
                Información de Contacto
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Domicilio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.domicilio}
                    onChange={(e) => handleInputChange('domicilio', e.target.value)}
                    className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                    placeholder="Domicilio"
                  />
                </div>
                
                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Correo Electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                    placeholder="Correo Electrónico"
                  />
                </div>
                
                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                    placeholder="Teléfono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Available Products */}
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md overflow-hidden">
            <div className="p-4 border-b border-[#0047bb]/20">
              <h3 className="text-lg font-bold text-[#041e42] tracking-wide flex items-center gap-2">
                <FiShield className="w-5 h-5 text-[#0047bb]" />
                Productos Disponibles
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableProducts.map(product => (
                  <label key={product} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.productos.includes(product)}
                      onChange={() => handleProductToggle(product)}
                      className="w-4 h-4 text-[#0047bb] bg-white border-2 border-[#0047bb] rounded focus:ring-[#0047bb] focus:ring-2"
                    />
                    <span className="text-sm text-[#041e42] font-medium">{product}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 pt-2 md:pt-4 justify-center items-center p-6 border-t border-[#0047bb]/20">
          <button
            type="button"
            onClick={onClose}
            className="w-full md:w-auto px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-full transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-[#0047bb] to-[#0066ff] hover:from-[#003d99] hover:to-[#0052cc] text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isEditing ? 'Actualizar' : 'Crear'} Establecimiento
          </button>
        </div>
      </div>
    </div>
  );
}
