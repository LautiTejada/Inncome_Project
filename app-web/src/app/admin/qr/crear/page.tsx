"use client";

import React, { useState } from 'react';
import { FiArrowLeft, FiCode, FiMapPin, FiFileText, FiCheck, FiHome, FiUser, FiCalendar } from 'react-icons/fi';
import { Button } from '@/components/shared';
import Link from 'next/link';

interface QRFormData {
  nombre: string;
  cuit: string;
  direccion: string;
  numero: string;
  localidad: string;
  provincia: string;
  productos: string[];
}

const PRODUCTOS_DISPONIBLES = ['ESPECTADOR', 'BALNEARIO', 'TRABAJADOR', 'VISITA'];

export default function CrearQRPage() {
  const [formData, setFormData] = useState<QRFormData>({
    nombre: '',
    cuit: '',
    direccion: '',
    numero: '',
    localidad: '',
    provincia: '',
    productos: ['ESPECTADOR', 'BALNEARIO', 'TRABAJADOR', 'VISITA']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: keyof QRFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      productos: prev.productos.includes(product)
        ? prev.productos.filter(p => p !== product)
        : [...prev.productos, product]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('QR creado:', formData);
    setShowSuccess(true);
    setIsSubmitting(false);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        nombre: '',
        cuit: '',
        direccion: '',
        numero: '',
        localidad: '',
        provincia: '',
        productos: ['ESPECTADOR', 'BALNEARIO', 'TRABAJADOR', 'VISITA']
      });
      setShowSuccess(false);
    }, 3000);
  };

  const isFormValid = formData.nombre && formData.cuit && formData.direccion && 
                     formData.numero && formData.localidad && formData.provincia && 
                     formData.productos.length > 0;

  if (showSuccess) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/admin/qr"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Volver al Panel QR</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">¡QR Creado Exitosamente!</h2>
            <p className="text-gray-300 mb-6">
              El código QR &quot;{formData.nombre}&quot; ha sido registrado en el sistema.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p><strong>Nombre:</strong> {formData.nombre}</p>
              <p><strong>CUIT:</strong> {formData.cuit}</p>
              <p><strong>Ubicación:</strong> {formData.direccion} {formData.numero}, {formData.localidad}, {formData.provincia}</p>
              <p><strong>Productos:</strong> {formData.productos.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with Back Button */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/qr"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Panel QR</span>
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">Crear Nuevo Código QR</h1>
        <p className="text-gray-300 text-lg">Registra un nuevo código QR en el sistema</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md overflow-hidden">
          <div className="p-4 border-b border-[#0047bb]/20 bg-gradient-to-r from-[#0047bb]/10 to-[#0066ff]/10">
            <h3 className="text-lg font-bold text-[#041e42] tracking-wide flex items-center gap-2">
              <FiCode className="w-5 h-5 text-[#0047bb]" />
              Información Básica
            </h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                  placeholder="Nombre del QR"
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
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md overflow-hidden">
          <div className="p-4 border-b border-[#0047bb]/20 bg-gradient-to-r from-[#0047bb]/10 to-[#0066ff]/10">
            <h3 className="text-lg font-bold text-[#041e42] tracking-wide flex items-center gap-2">
              <FiMapPin className="w-5 h-5 text-[#0047bb]" />
              Información de Dirección
            </h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Dirección <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                  placeholder="Dirección"
                />
              </div>
              
              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Número <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.numero}
                  onChange={(e) => handleInputChange('numero', e.target.value)}
                  className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                  placeholder="Número"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Localidad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.localidad}
                  onChange={(e) => handleInputChange('localidad', e.target.value)}
                  className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                  placeholder="Localidad"
                />
              </div>
              
              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Provincia <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.provincia}
                  onChange={(e) => handleInputChange('provincia', e.target.value)}
                  className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                  placeholder="Provincia"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md overflow-hidden">
          <div className="p-4 border-b border-[#0047bb]/20 bg-gradient-to-r from-[#0047bb]/10 to-[#0066ff]/10">
            <h3 className="text-lg font-bold text-[#041e42] tracking-wide flex items-center gap-2">
              <FiFileText className="w-5 h-5 text-[#0047bb]" />
              Productos Disponibles
            </h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRODUCTOS_DISPONIBLES.map(product => (
                <label key={product} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.productos.includes(product)}
                    onChange={() => handleProductToggle(product)}
                    className="w-5 h-5 text-[#0047bb] bg-white border-2 border-[#0047bb] rounded focus:ring-[#0047bb] focus:ring-2 transition-all duration-200"
                  />
                  <span className="text-sm text-[#041e42] font-medium group-hover:text-[#0047bb] transition-colors">
                    {product}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Los productos seleccionados estarán disponibles para este código QR
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={!isFormValid || isSubmitting}
            className="px-10 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            {isSubmitting ? 'Creando QR...' : 'Crear Código QR'}
          </Button>
        </div>
      </form>
    </div>
  );
}
