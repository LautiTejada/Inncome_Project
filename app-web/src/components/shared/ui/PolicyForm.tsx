"use client";

import { useState, useRef, useEffect } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { Listbox } from '@headlessui/react';
import { cn } from '@/lib/utils';
import ButtonGradient from './ButtonGradient';
import { useForm } from '@/contexts/FormContext';

interface PolicyFormData {
  policyNumber: string;
  insuranceCompany: string;
  policyPdf: File | null;
  insuredListPdf: File | null;
  paymentReceiptPdf: File | null;
}

interface PolicyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (policy: PolicyFormData) => void;
}

// Componente Select reutilizable
function SelectField<T extends string>({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  className
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <Listbox.Button
          className={cn(
            "w-full px-3 py-2 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm disabled:bg-gray-100 disabled:text-gray-400 flex items-center justify-between min-h-[40px]",
            className
          )}
        >
          <span className="truncate w-full text-left">
            {options.find((o) => o.value === value)?.label || (
              <span className="text-gray-400">
                {placeholder || "Seleccionar..."}
              </span>
            )}
          </span>
          <svg
            className="w-4 h-4 ml-2 text-[#0047bb]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Listbox.Button>
        <Listbox.Options className="absolute z-50 w-full mt-1 bg-white border border-[#0047bb] rounded-lg shadow-sm max-h-40 overflow-auto focus:outline-none text-sm animate-fade-in">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className={({ active, selected }) =>
                cn(
                  "cursor-pointer select-none py-2 px-3 rounded transition-colors",
                  active ? "bg-[#0047bb]/20 text-[#0047bb]" : "text-[#041e42]",
                  selected ? "font-semibold" : ""
                )
              }
            >
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

// Componente para subir archivos
function FileUploadField({
  label,
  file,
  onFileChange,
  accept = ".pdf",
  required = false
}: {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  required?: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      onFileChange(selectedFile);
    } else {
      alert('Por favor selecciona un archivo PDF válido.');
    }
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2 md:space-y-1">
      <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center space-x-3">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id={`file-${label.toLowerCase().replace(/\s+/g, '-')}`}
        />
        <label
          htmlFor={`file-${label.toLowerCase().replace(/\s+/g, '-')}`}
          className="flex-1 px-4 py-2 md:px-2 md:py-1 border-2 border-dashed border-[#0047bb] rounded-full bg-white text-[#041e42] cursor-pointer hover:bg-[#0047bb]/5 transition-colors flex items-center justify-center"
        >
          <FiUpload className="w-4 h-4 mr-2" />
          <span className="text-sm">Seleccionar archivo</span>
        </label>
        {file && (
          <button
            type="button"
            onClick={handleRemoveFile}
            className="px-3 py-2 md:px-2 md:py-1 text-red-500 hover:text-red-700 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500">
        {file ? `Archivo seleccionado: ${file.name}` : 'Ningún archivo seleccionado'}
      </p>
    </div>
  );
}

export default function PolicyForm({ isOpen, onClose, onSubmit }: PolicyFormProps) {
  const { openForm, closeForm } = useForm();
  const [formData, setFormData] = useState<PolicyFormData>({
    policyNumber: '',
    insuranceCompany: '',
    policyPdf: null,
    insuredListPdf: null,
    paymentReceiptPdf: null,
  });

  // Manejar el estado del formulario en el contexto global
  useEffect(() => {
    if (isOpen) {
      openForm('policy-form');
    } else {
      closeForm('policy-form');
    }
  }, [isOpen, openForm, closeForm]);

  const insuranceCompanyOptions = [
    { value: '', label: 'Selecciona actividad...' },
    { value: 'la-caja', label: 'La Caja Seguros' },
    { value: 'federacion-patronal', label: 'Federación Patronal' },
    { value: 'mercantil-andina', label: 'Mercantil Andina' },
    { value: 'sancor', label: 'Sancor Seguros' },
    { value: 'mapfre', label: 'Mapfre' },
    { value: 'allianz', label: 'Allianz' }
  ];

  const resetForm = () => {
    setFormData({
      policyNumber: '',
      insuranceCompany: '',
      policyPdf: null,
      insuredListPdf: null,
      paymentReceiptPdf: null,
    });
  };

  const validarFormulario = (): boolean => {
    if (!formData.policyNumber.trim()) {
      alert('Por favor ingresa el número de póliza.');
      return false;
    }
    if (!formData.insuranceCompany) {
      alert('Por favor selecciona una compañía de seguros.');
      return false;
    }
    if (!formData.policyPdf) {
      alert('Por favor sube el PDF de la póliza.');
      return false;
    }
    if (!formData.insuredListPdf) {
      alert('Por favor sube el PDF de la nómina de asegurados.');
      return false;
    }
    if (!formData.paymentReceiptPdf) {
      alert('Por favor sube el PDF del comprobante de pago.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validarFormulario()) {
      onSubmit(formData);
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#eff3f6] border-2 border-[#0047bb] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#0047bb]/20 relative">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#041e42]">Cargar Póliza Particular</h2>
            <p className="text-[#041e42] mt-1 font-medium">Completa los datos de la póliza de forma rápida y sencilla</p>
            <div className="mt-3 flex items-center gap-2 bg-[#eaf3ff] border border-[#d0e3fa] rounded-lg shadow-sm px-3 py-2 min-w-[120px]">
              <div className="flex flex-col justify-center">
                <span className="text-[#0047bb] font-semibold text-xs leading-tight">
                  Póliza
                </span>
                <span className="text-xl font-normal text-[#041e42] leading-tight">
                  Particular
                </span>
              </div>
            </div>
          </div>
          
          {/* Botón de cerrar original pero estático */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 border-2 border-[#0047bb] rounded-full text-[#0047bb] hover:text-[#041e42] transition-all duration-200 shadow-md hover:shadow-lg z-10"
            title="Cerrar formulario"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Policy Details */}
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md p-6">
            <h3 className="text-lg font-bold text-[#041e42] tracking-wide mb-4">
              Detalles de la Póliza
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Nro de Póliza <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.policyNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, policyNumber: e.target.value }))}
                  className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                  placeholder="Ingresa el número de póliza"
                />
              </div>

              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Compañía de Seguros <span className="text-red-500">*</span>
                </label>
                <SelectField
                  value={formData.insuranceCompany}
                  onChange={(value) => setFormData(prev => ({ ...prev, insuranceCompany: value }))}
                  options={insuranceCompanyOptions}
                  placeholder="Selecciona compañía..."
                />
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md p-6">
            <h3 className="text-lg font-bold text-[#041e42] tracking-wide mb-4">
              Documentos Requeridos
            </h3>
            
            <div className="space-y-4">
              <FileUploadField
                label="PDF de la Póliza"
                file={formData.policyPdf}
                onFileChange={(file) => setFormData(prev => ({ ...prev, policyPdf: file }))}
                required
              />
              
              <FileUploadField
                label="PDF de la Nómina de Asegurados"
                file={formData.insuredListPdf}
                onFileChange={(file) => setFormData(prev => ({ ...prev, insuredListPdf: file }))}
                required
              />
              
              <FileUploadField
                label="PDF del Comprobante de Pago"
                file={formData.paymentReceiptPdf}
                onFileChange={(file) => setFormData(prev => ({ ...prev, paymentReceiptPdf: file }))}
                required
              />
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md p-6">
            <div className="bg-[#eaf3ff] border border-[#d0e3fa] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#041e42]">
                Si el trabajador ya posee cobertura de ART o Accidentes Personales, deberá cargar con fecha actualizada:
              </p>
            </div>

            {/* ART Section */}
            <div className="space-y-3 mb-6">
              <h4 className="font-medium text-[#041e42]">ART (Accidentes de Riesgos del Trabajo)</h4>
              <div className="space-y-2 text-sm text-[#041e42]">
                <p>• Póliza / Contrato de ART</p>
                <p>• Nómina de asegurados</p>
                <p>• Cláusula de no repetición: <span className="text-red-500 font-medium">Razón Social: BARRIO PRUEBA, CUIT: 30000000000</span></p>
              </div>
            </div>

            {/* Personal Accidents Section */}
            <div className="space-y-3">
              <h4 className="font-medium text-[#041e42]">Accidentes Personales</h4>
              <div className="bg-[#fff3cd] border border-[#ffeaa7] rounded-lg p-4">
                <p className="text-sm text-[#041e42] mb-3">
                  Tener en cuenta para que la póliza sea aprobada, deberá cumplir con los siguientes requisitos solicitados por el establecimiento:
                </p>
                <div className="space-y-2 text-sm text-[#041e42]">
                  <p>• Muerte e Invalidez total y/o parcial permanente por accidente: <span className="font-medium">$10.000.000</span></p>
                  <p>• Asist. Médica Farmacéutica: <span className="font-medium">$3.000.000</span></p>
                  <p>• Cobertura en Altura: <span className="font-medium">Hasta 8 metros</span></p>
                  <p>• Cláusula de no repetición: <span className="text-red-500 font-medium">Razón Social: BARRIO PRUEBA, CUIT: 30000000000</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 pt-2 md:pt-4 justify-center items-center p-6 border-t border-[#0047bb]/20">
          <ButtonGradient
            onClick={handleClose}
            className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white"
          >
            Cancelar
          </ButtonGradient>
          <ButtonGradient
            onClick={handleSubmit}
            className="w-full md:w-auto"
          >
            Cargar Póliza
          </ButtonGradient>
        </div>
      </div>
    </div>
  );
} 