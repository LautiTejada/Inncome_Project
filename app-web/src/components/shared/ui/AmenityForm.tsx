"use client";

import { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import { Button } from '@/components';
import MultipleImageUpload from './MultipleImageUpload';
import { useForm } from '@/contexts/FormContext';

export interface AmenityFormData {
  name: string;
  category: string;
  description: string;
  rating: number;
  status: 'disponible' | 'ocupado' | 'mantenimiento' | 'desactivado';
  location: string;
  // Sistema de turnos simplificado
  shifts: {
    monday: { isOpen: boolean; shifts: string[] };
    tuesday: { isOpen: boolean; shifts: string[] };
    wednesday: { isOpen: boolean; shifts: string[] };
    thursday: { isOpen: boolean; shifts: string[] };
    friday: { isOpen: boolean; shifts: string[] };
    saturday: { isOpen: boolean; shifts: string[] };
    sunday: { isOpen: boolean; shifts: string[] };
  };
  capacity: number;
  images: string[]; // Array de URLs de imágenes del amenity
  features: string[];
  price: number;
  // Nuevas opciones de servicios adicionales
  cleaningService: {
    enabled: boolean;
    price: number;
    description: string;
  };
  penalty: {
    enabled: boolean;
    amount: number;
    description: string;
  };
}

interface AmenityFormProps {
  amenity?: AmenityFormData | null;
  onSave: (data: AmenityFormData) => void;
  onCancel: () => void;
  isOpen?: boolean;
}

const categoryOptions = [
  'Recreación',
  'Fitness',
  'Servicios',
  'Trabajo',
  'Gastronomía',
  'Eventos'
];

const statusOptions = [
  'disponible',
  'ocupado',
  'mantenimiento',
  'desactivado'
];



export default function AmenityForm({ amenity, onSave, onCancel, isOpen = true }: AmenityFormProps) {
  const { openForm, closeForm } = useForm();
  const [formData, setFormData] = useState<AmenityFormData>({
    name: '',
    category: 'Recreación',
    description: '',
    rating: 0,
    status: 'disponible',
    location: '',
    shifts: {
      monday: { isOpen: false, shifts: [] },
      tuesday: { isOpen: false, shifts: [] },
      wednesday: { isOpen: false, shifts: [] },
      thursday: { isOpen: false, shifts: [] },
      friday: { isOpen: false, shifts: [] },
      saturday: { isOpen: false, shifts: [] },
      sunday: { isOpen: false, shifts: [] },
    },
    capacity: 1,
    images: [], // Array de imágenes vacío por defecto
    features: [],
    price: 0,
    cleaningService: {
      enabled: false,
      price: 0,
      description: ''
    },
    penalty: {
      enabled: false,
      amount: 0,
      description: ''
    }
  });

  const [newFeature, setNewFeature] = useState('');
  const [scheduleErrors, setScheduleErrors] = useState<{[key: string]: string}>({});

  // Manejar el estado del formulario en el contexto global
  useEffect(() => {
    if (isOpen) {
      openForm('amenity-form');
    } else {
      closeForm('amenity-form');
    }
  }, [isOpen, openForm, closeForm]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  
  // Estado para manejar las secciones del modal
  const [currentSection, setCurrentSection] = useState<'basic' | 'details' | 'shifts' | 'services'>('basic');
  


  useEffect(() => {
    if (amenity) {
      setFormData(amenity);
    }
  }, [amenity]);

  // Validar turnos
  const validateShifts = (shifts: AmenityFormData['shifts']) => {
    const errors: {[key: string]: string} = {};
    let hasOpenDay = false;

    Object.entries(shifts).forEach(([day, dayData]) => {
      if (dayData.isOpen) {
        hasOpenDay = true;
        
        // Validar que tenga al menos un turno
        if (dayData.shifts.length === 0) {
          errors[day] = 'Debe configurar al menos un turno';
        }
      }
    });

    if (!hasOpenDay) {
      errors.general = 'Al menos un día debe estar abierto';
    }

    setScheduleErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof AmenityFormData, value: string | number | boolean | string[] | AmenityFormData['shifts'] | Partial<AmenityFormData['cleaningService']> | Partial<AmenityFormData['penalty']>) => {
    if (field === 'cleaningService' && typeof value === 'object' && value !== null) {
      // Para cleaningService, actualizar solo las propiedades específicas
      setFormData(prev => ({
        ...prev,
        cleaningService: { ...prev.cleaningService, ...value }
      }));
    } else if (field === 'penalty' && typeof value === 'object' && value !== null) {
      // Para penalty, actualizar solo las propiedades específicas
      setFormData(prev => ({
        ...prev,
        penalty: { ...prev.penalty, ...value }
      }));
    } else {
      // Para campos simples
      const newFormData = { ...formData, [field]: value };
      setFormData(newFormData);
    }
    
    // Si se cambió el shifts, validar
    if (field === 'shifts') {
      validateShifts(value as AmenityFormData['shifts']);
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (featureToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== featureToRemove)
    }));
  };

  const handleImagesChange = (imageFiles: File[], imageUrls: string[]) => {
    setImageFiles(imageFiles);
    handleInputChange('images', imageUrls);
  };

  // Funciones para manejar turnos
  const handleShiftToggle = (day: keyof AmenityFormData['shifts'], isOpen: boolean) => {
    const newShifts = { ...formData.shifts };
    newShifts[day] = { 
      isOpen, 
      // Cuando se activa un día, comenzar con un input vacío para que sea más directo
      shifts: isOpen ? [''] : [] 
    };
    handleInputChange('shifts', newShifts);
  };

  const handleAddShift = (day: keyof AmenityFormData['shifts']) => {
    const newShifts = { ...formData.shifts };
    newShifts[day].shifts.push('');
    handleInputChange('shifts', newShifts);
  };

  const handleRemoveShift = (day: keyof AmenityFormData['shifts'], shiftIndex: number) => {
    const newShifts = { ...formData.shifts };
    newShifts[day].shifts.splice(shiftIndex, 1);
    handleInputChange('shifts', newShifts);
  };

  const handleShiftChange = (day: keyof AmenityFormData['shifts'], shiftIndex: number, newShift: string) => {
    const newShifts = { ...formData.shifts };
    newShifts[day].shifts[shiftIndex] = newShift;
    handleInputChange('shifts', newShifts);
  };

  // Funciones auxiliares para navegación entre secciones
  const getNextSection = (current: string): 'basic' | 'details' | 'shifts' | 'services' => {
    switch (current) {
      case 'basic': return 'details';
      case 'details': return 'shifts';
      case 'shifts': return 'services';
      default: return 'services';
    }
  };

  const getPreviousSection = (current: string): 'basic' | 'details' | 'shifts' | 'services' => {
    switch (current) {
      case 'services': return 'shifts';
      case 'shifts': return 'details';
      case 'details': return 'basic';
      default: return 'basic';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar turnos antes de enviar
    if (!validateShifts(formData.shifts)) {
      return; // No enviar si hay errores
    }
    
    if (formData.name.trim() && formData.description.trim()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header mejorado */}
      <div className="text-center pb-4 border-b border-gray-700">
        <div className="text-2xl mb-2">
          {amenity ? '✏️ Editar Amenity' : '✨ Crear Nuevo Amenity'}
        </div>
        <p className="text-gray-400 text-sm">
          {amenity 
            ? 'Modifica la información del amenity existente' 
            : 'Completa la información para crear un nuevo amenity'
          }
        </p>
      </div>

      {/* Navegación por secciones */}
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        {[
          { key: 'basic', label: '📝 Básico', icon: '✨' },
          { key: 'details', label: '⚙️ Detalles', icon: '🔧' },
          { key: 'shifts', label: '🕒 Turnos', icon: '⏰' },
          { key: 'services', label: '🧹 Servicios', icon: '💎' }
        ].map((section) => (
          <button
            key={section.key}
            type="button"
            onClick={() => setCurrentSection(section.key as 'basic' | 'details' | 'shifts' | 'services')}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
              currentSection === section.key
                ? 'bg-[#0047bb] text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {section.icon} {section.label}
          </button>
        ))}
      </div>

      {/* Contenido de las secciones */}
      {currentSection === 'basic' && (
        <div className="space-y-6">
          {/* Header Section - Nombre y Categoría */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Nombre del Amenity *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all"
                placeholder="Ej: Piscina Principal"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all"
              >
                {categoryOptions.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Descripción *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all resize-none"
              placeholder="Describe el amenity y sus características principales..."
              required
            />
          </div>
        </div>
      )}

      {currentSection === 'details' && (
        <div className="space-y-6">
          {/* Configuración Principal - 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status === 'disponible' ? 'Disponible' : 
                     status === 'ocupado' ? 'Ocupado' : 
                     status === 'mantenimiento' ? 'Mantenimiento' : 'Desactivado'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all"
                placeholder="Ej: Piso 5, Subsuelo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Capacidad
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 1)}
                min="1"
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all"
              />
            </div>
          </div>

          {/* Imagen y Precio - 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                          <MultipleImageUpload
              currentImages={formData.images}
              onImagesChange={handleImagesChange}
              disabled={false}
            />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Precio (opcional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full pl-8 pr-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Características */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Características del Amenity
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all"
                placeholder="Agregar característica..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddFeature}
                className="px-4 py-2 whitespace-nowrap hover:bg-[#0047bb]/10 hover:border-[#0047bb]/30 transition-all"
              >
                + Agregar
              </Button>
            </div>
            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-[#0047bb]/20 text-[#0047bb] rounded-full text-sm border border-[#0047bb]/30 transition-all"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(feature)}
                      className="ml-2 text-[#0047bb] hover:text-red-400 transition-colors"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sección de Turnos */}
      {currentSection === 'shifts' && (
        <div className="space-y-6">
          <div className="text-center pb-4">
            <h3 className="text-lg font-semibold text-white mb-2">🕒 Configuración de Turnos</h3>
            <p className="text-gray-400 text-sm">
              Configura los días disponibles y los turnos para cada día
            </p>
          </div>

          {/* Turnos por día */}
          <div className="space-y-4">
            {[
              { key: 'monday', label: 'Lunes', icon: '📅' },
              { key: 'tuesday', label: 'Martes', icon: '📅' },
              { key: 'wednesday', label: 'Miércoles', icon: '📅' },
              { key: 'thursday', label: 'Jueves', icon: '📅' },
              { key: 'friday', label: 'Viernes', icon: '📅' },
              { key: 'saturday', label: 'Sábado', icon: '📅' },
              { key: 'sunday', label: 'Domingo', icon: '📅' }
            ].map(({ key, label, icon }) => (
              <div
                key={key}
                className={`bg-gray-800/50 rounded-xl p-4 border-2 transition-all ${
                  formData.shifts[key as keyof typeof formData.shifts].isOpen
                    ? 'border-[#0047bb]/50 bg-[#0047bb]/5'
                    : 'border-gray-700/50'
                }`}
              >
                {/* Header del día */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    <h4 className="text-sm font-medium text-white">{label}</h4>
                  </div>
                  
                  {/* Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shifts[key as keyof typeof formData.shifts].isOpen}
                      onChange={(e) => handleShiftToggle(key as keyof typeof formData.shifts, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#0047bb] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0047bb]"></div>
                  </label>
                </div>

                {/* Turnos del día */}
                {formData.shifts[key as keyof typeof formData.shifts].isOpen && (
                  <div className="space-y-3">
                    {formData.shifts[key as keyof typeof formData.shifts].shifts.map((shift, shiftIndex) => (
                      <div key={shiftIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={shift}
                          onChange={(e) => handleShiftChange(key as keyof typeof formData.shifts, shiftIndex, e.target.value)}
                          placeholder="Ej: 08:00 - 10:00"
                          className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all placeholder-gray-500"
                        />
                        
                        <button
                          type="button"
                          onClick={() => handleRemoveShift(key as keyof typeof formData.shifts, shiftIndex)}
                          className="px-3 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-all"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => handleAddShift(key as keyof typeof formData.shifts)}
                      className="w-full py-2 px-4 bg-[#0047bb]/20 text-[#0047bb] border border-[#0047bb]/30 rounded-lg hover:bg-[#0047bb]/30 transition-all text-sm font-medium"
                    >
                      + Agregar Turno
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Texto de ayuda */}
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300 text-center">
              💡 <strong>Formato sugerido:</strong> &quot;08:00 - 10:00&quot; o &quot;14:00 - 16:00&quot;
            </p>
          </div>
        </div>
      )}

      {/* Sección de Servicios */}
      {currentSection === 'services' && (
        <div className="space-y-6">
          <div className="text-center pb-4">
            <h3 className="text-lg font-semibold text-white mb-2">🧹 Servicios Adicionales</h3>
            <p className="text-gray-400 text-sm">
              Configura servicios opcionales que se aplicarán a las reservas
            </p>
          </div>
          
          {/* Servicio de Limpieza */}
          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <input
                  type="checkbox"
                  checked={formData.cleaningService.enabled}
                  onChange={(e) => handleInputChange('cleaningService', {
                    ...formData.cleaningService,
                    enabled: e.target.checked
                  })}
                  className="w-4 h-4 text-[#0047bb] bg-gray-700 border-gray-600 rounded focus:ring-[#0047bb] focus:ring-1"
                />
                🧽 Servicio de Limpieza
              </label>
              <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">
                Opcional
              </span>
            </div>
            
            {formData.cleaningService.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Precio del servicio
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      value={formData.cleaningService.price}
                      onChange={(e) => handleInputChange('cleaningService', {
                        ...formData.cleaningService,
                        price: parseInt(e.target.value) || 0
                      })}
                      min="0"
                      className="w-full pl-8 pr-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Descripción del servicio
                  </label>
                  <input
                    type="text"
                    value={formData.cleaningService.description}
                    onChange={(e) => handleInputChange('cleaningService', {
                      ...formData.cleaningService,
                      description: e.target.value
                    })}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all"
                    placeholder="Ej: Limpieza post-uso, desinfección..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Multa */}
          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <input
                  type="checkbox"
                  checked={formData.penalty.enabled}
                  onChange={(e) => handleInputChange('penalty', {
                    ...formData.penalty,
                    enabled: e.target.checked
                  })}
                  className="w-4 h-4 text-[#0047bb] bg-gray-700 border-gray-600 rounded focus:ring-[#0047bb] focus:ring-1"
                />
                ⚠️ Multa por Incumplimiento
              </label>
              <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">
                Opcional
              </span>
            </div>
            
            {formData.penalty.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Monto de la multa
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      value={formData.penalty.amount}
                      onChange={(e) => handleInputChange('penalty', {
                        ...formData.penalty,
                        amount: parseInt(e.target.value) || 0
                      })}
                      min="0"
                      className="w-full pl-8 pr-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Descripción de la multa
                  </label>
                  <input
                    type="text"
                    value={formData.penalty.description}
                    onChange={(e) => handleInputChange('penalty', {
                      ...formData.penalty,
                      description: e.target.value
                    })}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] transition-all"
                    placeholder="Ej: Por no respetar horarios, daños..."
                  />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300 text-center">
              💡 <strong>Nota:</strong> Estos servicios se mostrarán a los clientes al reservar el amenity
            </p>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex space-x-3 pt-4 border-t border-gray-700">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1 py-3 hover:bg-gray-700/50 transition-all"
        >
          Cancelar
        </Button>
        
        {/* Navegación entre secciones */}
        {currentSection !== 'basic' && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setCurrentSection(getPreviousSection(currentSection))}
            className="px-6 py-3 hover:bg-gray-700/50 transition-all"
          >
            ← Anterior
          </Button>
        )}
        
        {currentSection !== 'services' && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setCurrentSection(getNextSection(currentSection))}
            className="px-6 py-3 hover:bg-gray-700/50 transition-all"
          >
            Siguiente →
          </Button>
        )}
        
        {/* Botón de guardar solo en la última sección */}
        {currentSection === 'services' && (
          <Button
            type="submit"
            variant="primary"
            className={`px-6 py-3 transition-all ${
              Object.keys(scheduleErrors).length > 0
                ? 'bg-red-600 hover:bg-red-700 cursor-not-allowed opacity-70' 
                : 'bg-[#06011A] hover:bg-[#0047bb] shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
            disabled={Object.keys(scheduleErrors).length > 0}
            title={Object.keys(scheduleErrors).length > 0 ? 'Corrige los errores antes de guardar' : ''}
          >
            <FiSave className="w-4 h-4 mr-2" />
            {amenity ? 'Guardar Cambios' : 'Crear Amenity'}
            {Object.keys(scheduleErrors).length > 0 && (
              <span className="ml-2 text-xs bg-red-500/30 px-2 py-1 rounded-full">
                {Object.keys(scheduleErrors).length} error(es)
              </span>
            )}
          </Button>
        )}
      </div>
    </form>
  );
}



