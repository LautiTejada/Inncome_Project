"use client";

import { useState } from 'react';
import { FiChevronRight, FiCalendar, FiFileText, FiUsers, FiUserPlus, FiTrash2, FiPlus } from 'react-icons/fi';
import { Button } from '@/components';

interface CoberturaParticularEditPanelProps {
  isAdmin?: boolean;
  initialPolicyStatus?: string;
  onSave?: () => void;
  onCancel?: () => void;
}

interface Worker {
  id: string;
  documento: string;
  nombre: string;
}

export default function CoberturaParticularEditPanel({ 
  isAdmin = false, 
  initialPolicyStatus = 'aprobada',
  onSave, 
  onCancel 
}: CoberturaParticularEditPanelProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [policyStatus, setPolicyStatus] = useState<string>(initialPolicyStatus);
  const [workers, setWorkers] = useState<Worker[]>([
    { id: '1', documento: '18546659', nombre: 'CORNEJO MIGUEL ANGEL' },
    { id: '2', documento: '44236871', nombre: 'VILLAR LAZ FRANCO' },
    { id: '3', documento: '11111111', nombre: 'LOPEZ GLADYS AZUCENA' }
  ]);

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const addWorker = () => {
    const newWorker: Worker = {
      id: Date.now().toString(),
      documento: '',
      nombre: ''
    };
    setWorkers([...workers, newWorker]);
  };

  const removeWorker = (id: string) => {
    setWorkers(workers.filter(worker => worker.id !== id));
  };

  const updateWorker = (id: string, field: keyof Worker, value: string) => {
    setWorkers(workers.map(worker => 
      worker.id === id ? { ...worker, [field]: value } : worker
    ));
  };

  return (
    <div className="space-y-4">
      {/* Sección 1: Datos de Póliza */}
      <div className="bg-white rounded-lg border border-blue-500 p-4">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('datos-poliza')}
        >
          <h3 className="text-lg font-semibold text-gray-800">Datos de poliza</h3>
          <FiChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${
            activeSection === 'datos-poliza' ? 'rotate-90' : ''
          }`} />
        </div>
        
        {activeSection === 'datos-poliza' && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Póliza
              </label>
              <input
                type="text"
                defaultValue="prueba"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
                {!isAdmin && (
                  <span className="ml-2 text-xs text-gray-500 font-normal">
                    (Solo administradores pueden cambiar)
                  </span>
                )}
              </label>
              {isAdmin ? (
                <select 
                  value={policyStatus}
                  onChange={(e) => setPolicyStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="aprobada">Aprobada</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="rechazada">Rechazada</option>
                </select>
              ) : (
                <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600">
                  {policyStatus.charAt(0).toUpperCase() + policyStatus.slice(1)}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Vencimiento
              </label>
              <div className="relative">
                <input
                  type="date"
                  defaultValue="2025-12-24"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiCalendar className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compañía de Seguros
              </label>
              <input
                type="text"
                defaultValue="0755 - AFIANZADORA LATINOAMERICANA COMPAÑÍA DE SEGUROS S.A."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentarios
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese comentarios..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivo de Póliza (PDF)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  id="policy-file"
                />
                <label
                  htmlFor="policy-file"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
                >
                  Choose File
                </label>
                <span className="text-gray-500">No file chosen</span>
              </div>
              <a href="#" className="text-blue-600 underline text-sm mt-1 block">
                Ver Póliza Actual
              </a>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivo de Pago (PDF)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  id="payment-file"
                />
                <label
                  htmlFor="payment-file"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
                >
                  Choose File
                </label>
                <span className="text-gray-500">No file chosen</span>
              </div>
              <a href="#" className="text-blue-600 underline text-sm mt-1 block">
                Ver Póliza Actual
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Sección 2: Cargar Nómina/Comprobante Mensual */}
      <div className="bg-white rounded-lg border border-blue-500 p-4">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('cargar-nomina')}
        >
          <h3 className="text-lg font-semibold text-gray-800">Cargar nomina/comprobante mensual</h3>
          <FiChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${
            activeSection === 'cargar-nomina' ? 'rotate-90' : ''
          }`} />
        </div>
        
        {activeSection === 'cargar-nomina' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivo de Pago (PDF)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  id="monthly-payment-file"
                />
                <label
                  htmlFor="monthly-payment-file"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
                >
                  Choose File
                </label>
                <span className="text-gray-500">No file chosen</span>
              </div>
              <a href="#" className="text-blue-600 underline text-sm mt-1 block">
                Ver Póliza Actual
              </a>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivo de Nómina (PDF)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  id="monthly-payroll-file"
                />
                <label
                  htmlFor="monthly-payroll-file"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
                >
                  Choose File
                </label>
                <span className="text-gray-500">No file chosen</span>
              </div>
              <a href="#" className="text-blue-600 underline text-sm mt-1 block">
                Ver Póliza Actual
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Sección 3: Mis Trabajadores Cargados */}
      <div className="bg-white rounded-lg border border-blue-500 p-4">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('trabajadores-cargados')}
        >
          <h3 className="text-lg font-semibold text-gray-800">Mis Trabajadores Cargados</h3>
          <FiChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${
            activeSection === 'trabajadores-cargados' ? 'rotate-90' : ''
          }`} />
        </div>
        
        {activeSection === 'trabajadores-cargados' && (
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Documento</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Nombre</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Actividad</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Vencimiento Ingresos</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.map((worker) => (
                    <tr key={worker.id} className="border-b border-gray-100">
                      <td className="py-2 px-4 text-gray-900">{worker.documento}</td>
                      <td className="py-2 px-4 text-gray-900">{worker.nombre}</td>
                      <td className="py-2 px-4 text-gray-900">
                        ACRÓBATAS AÉREOS HASTA 40 MTS DE ALTURA. (CON ARNES)
                      </td>
                      <td className="py-2 px-4">
                        <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                          2025-08-12
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                <button className="w-8 h-8 bg-purple-600 text-white rounded flex items-center justify-center text-sm font-medium">
                  1
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sección 4: Agregar Trabajadores (Solo para administradores) */}
      {isAdmin && (
        <div className="bg-white rounded-lg border border-blue-500 p-4">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('agregar-trabajadores')}
          >
            <h3 className="text-lg font-semibold text-gray-800">Agregar Trabajadores</h3>
            <FiChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${
              activeSection === 'agregar-trabajadores' ? 'rotate-90' : ''
            }`} />
          </div>
          
          {activeSection === 'agregar-trabajadores' && (
            <div className="mt-4 space-y-4">
              {workers.map((worker, index) => (
                <div key={worker.id} className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">Persona {index + 1}</h4>
                    <FiChevronRight className="w-4 h-4 text-gray-600" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Documento
                      </label>
                      <input
                        type="text"
                        value={worker.documento}
                        onChange={(e) => updateWorker(worker.id, 'documento', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingrese documento"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre y Apellido
                      </label>
                      <input
                        type="text"
                        value={worker.nombre}
                        onChange={(e) => updateWorker(worker.id, 'nombre', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingrese nombre completo"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeWorker(worker.id)}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    <span>Quitar</span>
                  </button>
                </div>
              ))}
              
              <button
                onClick={addWorker}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FiPlus className="w-5 h-5" />
                <span>Agregar persona</span>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actividad
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Selecciona actividad...</option>
                    <option value="acrobatas">ACRÓBATAS AÉREOS HASTA 40 MTS DE ALTURA</option>
                    <option value="acrobacia-piso">ACROBACIA DE PISO Y ACROBACIA EN TELA</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vencimiento Global de Ingresos
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="mm/dd/yyyy"
                    />
                    <FiCalendar className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-4 pt-4">
        <Button
          variant="secondary"
          onClick={onCancel}
          className="px-6 py-2"
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={onSave}
          className="px-6 py-2"
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
