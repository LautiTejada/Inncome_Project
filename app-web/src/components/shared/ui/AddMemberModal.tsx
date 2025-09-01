'use client';

import React, { useState } from 'react';
import { FiUser, FiCalendar } from 'react-icons/fi';
import { Button, Dialog } from '@/components';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MemberForm {
  fullName: string;
  dni: string;
  email: string;
  phone: string;
  birthDate: string;
  relationship: string;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<MemberForm>({
    fullName: '',
    dni: '',
    email: '',
    phone: '',
    birthDate: '',
    relationship: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const relationshipOptions = [
    { value: 'spouse', label: 'Cónyuge' },
    { value: 'child', label: 'Hijo/a' },
    { value: 'parent', label: 'Padre/Madre' },
    { value: 'sibling', label: 'Hermano/a' },
    { value: 'other', label: 'Otro familiar' }
  ];

  // Función para aplicar máscara de fecha DD/MM/YYYY
  const formatDate = (value: string) => {
    // Remover todo excepto números
    const numbers = value.replace(/\D/g, '');
    
    // Aplicar máscara
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else if (numbers.length <= 8) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatDate(value);
    
    // Validar que no exceda el formato DD/MM/YYYY
    if (formatted.length <= 10) {
      handleInputChange('birthDate', formatted);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de datos
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Miembro agregado:', form);
    setIsSubmitting(false);
    onClose();
    
    // Resetear formulario
    setForm({
      fullName: '',
      dni: '',
      email: '',
      phone: '',
      birthDate: '',
      relationship: ''
    });
  };

  const handleInputChange = (field: keyof MemberForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Content className="max-w-2xl">
        <Dialog.Header>
          <Dialog.Title>Agregar Miembro</Dialog.Title>
        </Dialog.Header>
        
        <div className="space-y-6">
          <p className="text-gray-400 text-sm">
            Agrega un familiar o dependiente a tu cuenta. Completa los datos requeridos para continuar.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <FiUser className="w-4 h-4 mr-2" />
                Información Personal
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: María González"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    DNI *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.dni}
                    onChange={(e) => handleInputChange('dni', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="12.345.678"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="maria@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+54 9 11 1234-5678"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fecha de Nacimiento *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={form.birthDate}
                      onChange={handleDateChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="DD/MM/YYYY"
                      maxLength={10}
                    />
                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Relación *
                  </label>
                  <select
                    required
                    value={form.relationship}
                    onChange={(e) => handleInputChange('relationship', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar relación</option>
                    {relationshipOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="disabled:opacity-50"
              >
                {isSubmitting ? 'Agregando...' : 'Agregar Miembro'}
              </Button>
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default AddMemberModal; 