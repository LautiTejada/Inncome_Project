"use client";

import React, { useState, useEffect } from 'react';
import { FiX, FiPackage, FiDollarSign, FiFileText } from 'react-icons/fi';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  logo?: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

export default function ProductModal({
  isOpen,
  onClose,
  product,
  onSubmit
}: ProductModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    logo: ''
  });

  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        logo: product.logo || ''
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: 0,
        logo: ''
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file.name }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#eff3f6] border-2 border-[#0047bb] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#0047bb]/20">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#041e42]">
              {isEditing ? 'Editar Producto' : 'Crear Producto'}
            </h2>
            <p className="text-[#041e42] mt-1 font-medium">
              {isEditing ? 'Modifica la información del producto' : 'Registra un nuevo producto de forma rápida y sencilla'}
            </p>
            <div className="mt-3 flex items-center gap-2 bg-[#eaf3ff] border border-[#d0e3fa] rounded-lg shadow-sm px-3 py-2 min-w-[120px]">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0047bb] text-white">
                <FiPackage className="w-4 h-4" />
              </span>
              <div className="flex flex-col justify-center">
                <span className="text-[#0047bb] font-semibold text-xs leading-tight">
                  Producto
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
                <FiPackage className="w-5 h-5 text-[#0047bb]" />
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
                    placeholder="Nombre del Producto"
                  />
                </div>
                
                <div className="space-y-2 md:space-y-1">
                  <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                    Precio <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0047bb] font-semibold">$</span>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.precio}
                      onChange={(e) => handleInputChange('precio', parseFloat(e.target.value) || "")}
                      className="w-full pl-8 pr-3 py-2 md:px-6 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md overflow-hidden">
            <div className="p-4 border-b border-[#0047bb]/20">
              <h3 className="text-lg font-bold text-[#041e42] tracking-wide flex items-center gap-2">
                <FiFileText className="w-5 h-5 text-[#0047bb]" />
                Descripción
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Descripción del Producto
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 md:px-2 md:py-2 border-2 border-[#0047bb] rounded-2xl bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm resize-none"
                  placeholder="Descripción del Producto"
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md overflow-hidden">
            <div className="p-4 border-b border-[#0047bb]/20">
              <h3 className="text-lg font-bold text-[#041e42] tracking-wide flex items-center gap-2">
                <FiPackage className="w-5 h-5 text-[#0047bb]" />
                Logo del Producto
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Subir Logo (Imagen)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="px-4 py-2 border-2 border-[#0047bb] rounded-full bg-white text-[#0047bb] font-semibold cursor-pointer hover:bg-[#0047bb] hover:text-white transition-all duration-200"
                  >
                    Elegir Archivo
                  </label>
                  <span className="text-sm text-[#041e42]">
                    {formData.logo || 'No se eligió archivo'}
                  </span>
                </div>
                {formData.logo && (
                  <div className="mt-3">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-[#0047bb]/20">
                      <FiPackage className="w-8 h-8 text-[#0047bb]" />
                    </div>
                  </div>
                )}
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
            {isEditing ? 'Actualizar' : 'Crear'} Producto
          </button>
        </div>
      </div>
    </div>
  );
}
