"use client";

import { useState, useRef, useEffect } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import ButtonGradient from './ButtonGradient';
import { useForm } from '@/contexts/FormContext';

interface CriminalRecordFormData {
  documentNumber: string;
  name: string;
  certificateFile: File | null;
}

interface CriminalRecordFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (record: CriminalRecordFormData) => void;
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

export default function CriminalRecordForm({ isOpen, onClose, onSubmit }: CriminalRecordFormProps) {
  const { openForm, closeForm } = useForm();
  const [formData, setFormData] = useState<CriminalRecordFormData>({
    documentNumber: '',
    name: '',
    certificateFile: null,
  });

  // Manejar el estado del formulario en el contexto global
  useEffect(() => {
    if (isOpen) {
      openForm('criminal-record-form');
    } else {
      closeForm('criminal-record-form');
    }
  }, [isOpen, openForm, closeForm]);

  const resetForm = () => {
    setFormData({
      documentNumber: '',
      name: '',
      certificateFile: null,
    });
  };

  const validarFormulario = (): boolean => {
    if (!formData.documentNumber.trim()) {
      alert('Por favor ingresa el número de documento.');
      return false;
    }
    if (!formData.name.trim()) {
      alert('Por favor ingresa el nombre completo.');
      return false;
    }
    if (!formData.certificateFile) {
      alert('Por favor sube el PDF del certificado.');
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
        <div className="flex items-start justify-between p-6 border-b border-[#0047bb]/20">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#041e42]">Cargar Certificado Antecedentes Penales</h2>
            <p className="text-[#041e42] mt-1 font-medium">Completa los datos del certificado de forma rápida y sencilla</p>
                         <div className="mt-3 flex items-center gap-2 bg-[#eaf3ff] border border-[#d0e3fa] rounded-lg shadow-sm px-3 py-2 min-w-[120px]">
               <div className="flex flex-col justify-center">
                 <span className="text-[#0047bb] font-semibold text-xs leading-tight">
                   Certificado
                 </span>
                 <span className="text-xl font-normal text-[#041e42] leading-tight">
                   Antecedentes
                 </span>
               </div>
             </div>
          </div>
          <button
            onClick={handleClose}
            className="text-[#0047bb] hover:text-[#041e42] transition-colors ml-4 mt-1"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Document Details */}
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md p-6">
            <h3 className="text-lg font-bold text-[#041e42] tracking-wide mb-4">
              Datos del Certificado
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Nro de Documento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.documentNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, documentNumber: e.target.value }))}
                  className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                  placeholder="Ingresa el número de documento"
                />
              </div>

              <div className="space-y-2 md:space-y-1">
                <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                  placeholder="Ingresa el nombre completo"
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md p-6">
            <h3 className="text-lg font-bold text-[#041e42] tracking-wide mb-4">
              Documento Requerido
            </h3>
            
            <div className="space-y-4">
              <FileUploadField
                label="PDF del certificado"
                file={formData.certificateFile}
                onFileChange={(file) => setFormData(prev => ({ ...prev, certificateFile: file }))}
                required
              />
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md p-6">
            <div className="bg-[#eaf3ff] border border-[#d0e3fa] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#041e42]">
                <strong>Importante:</strong> El certificado de antecedentes penales debe estar actualizado y ser válido para el establecimiento.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-[#041e42]">Requisitos del Certificado</h4>
              <div className="space-y-2 text-sm text-[#041e42]">
                <p>• Debe ser un PDF válido y legible</p>
                <p>• El certificado debe estar vigente</p>
                <p>• Debe corresponder al documento ingresado</p>
                <p>• El nombre debe coincidir con el documento</p>
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
            Cargar Certificado
          </ButtonGradient>
        </div>
      </div>
    </div>
  );
} 