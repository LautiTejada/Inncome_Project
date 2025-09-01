"use client";

import { useState, useEffect } from 'react';
import { FiUser, FiX, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import ButtonGradient from './ButtonGradient';
import { useForm } from '@/contexts/FormContext';

interface Visit {
  id: number;
  documento: string;
  nombreApellido: string;
  direccion: string;
  esExtranjero: boolean;
}

interface VisitFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (visits: Visit[]) => void;
}

export default function VisitForm({ isOpen, onClose, onSubmit }: VisitFormProps) {
  const { openForm, closeForm } = useForm();
  const [visits, setVisits] = useState<Visit[]>([
    {
      id: 1,
      documento: "",
      nombreApellido: "",
      direccion: "",
      esExtranjero: false,
    },
  ]);

  // Manejar el estado del formulario en el contexto global
  useEffect(() => {
    if (isOpen) {
      openForm('visit-form');
    } else {
      closeForm('visit-form');
    }
  }, [isOpen, openForm, closeForm]);
  const [dniErrors, setDniErrors] = useState<{ [id: number]: boolean }>({});
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [expandedCards, setExpandedCards] = useState<{ [id: number]: boolean }>({ 1: true });

  const resetForm = () => {
    setVisits([
      {
        id: 1,
        documento: "",
        nombreApellido: "",
        direccion: "",
        esExtranjero: false,
      },
    ]);
    setDniErrors({});
    setTriedSubmit(false);
    setExpandedCards({ 1: true });
  };

  const validarFormulario = (): boolean => {
    let valid = true;
    const newDniErrors: { [id: number]: boolean } = {};
    
    visits.forEach((visit) => {
      if (!visit.documento || !visit.nombreApellido || !visit.direccion) {
        valid = false;
      }
      if (!visit.esExtranjero && visit.documento && visit.documento.length !== 8) {
        newDniErrors[visit.id] = true;
        valid = false;
      } else {
        newDniErrors[visit.id] = false;
      }
    });
    
    setDniErrors(newDniErrors);
    return valid;
  };

  const handleSubmit = () => {
    setTriedSubmit(true);
    if (!validarFormulario()) {
      return;
    }

    // Las visitas NO consumen créditos, van directo a la tabla de personas aseguradas
    onSubmit(visits);
    resetForm();
    onClose();
  };

  const agregarVisita = () => {
    const newId = Math.max(...visits.map((v) => v.id)) + 1;
    setVisits([
      ...visits,
      {
        id: newId,
        documento: "",
        nombreApellido: "",
        direccion: "",
        esExtranjero: false,
      },
    ]);
    // Expandir automáticamente la nueva tarjeta
    setExpandedCards(prev => ({ ...prev, [newId]: true }));
    // Si es la segunda tarjeta, mantener la primera expandida
    if (visits.length === 1) {
      setExpandedCards(prev => ({ ...prev, [visits[0].id]: true }));
    }
  };

  const eliminarVisita = (id: number) => {
    if (visits.length > 1) {
      setVisits(visits.filter((v) => v.id !== id));
      // Remover el estado de expansión de la tarjeta eliminada
      setExpandedCards(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  const actualizarVisita = (
    id: number,
    field: keyof Visit,
    value: string | boolean
  ) => {
    setVisits(
      visits.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#eff3f6] border-2 border-[#0047bb] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#0047bb]/20">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#041e42]">Alta de Visita</h2>
            <p className="text-[#041e42] mt-1 font-medium">Registra visitantes de forma rápida y sencilla</p>
            <div className="mt-3 flex items-center gap-2 bg-[#e8f5e8] border border-[#c8e6c8] rounded-lg shadow-sm px-3 py-2 min-w-[120px]">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white">
                <FiUser className="w-4 h-4" />
              </span>
              <div className="flex flex-col justify-center">
                <span className="text-green-600 font-semibold text-xs leading-tight">
                  Sin Consumo de Créditos
                </span>
                <span className="text-xl font-normal text-[#041e42] leading-tight">
                  Gratis
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
        <div className="p-6 space-y-6">
          {visits.map((visit, index) => (
            <div key={visit.id} className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-[#0047bb]/20">
                <h3 className="text-lg font-bold text-[#041e42] tracking-wide">
                  Visita {index + 1}
                </h3>
                <div className="flex items-center gap-2">
                  {visits.length > 1 && (
                    <button
                      onClick={() => eliminarVisita(visit.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Eliminar visita"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  )}
                  {visits.length > 1 && (
                    <button
                      onClick={() => setExpandedCards(prev => ({ ...prev, [visit.id]: !prev[visit.id] }))}
                      className="text-[#0047bb] hover:text-[#041e42] transition-colors"
                      title={expandedCards[visit.id] ? "Comprimir" : "Expandir"}
                    >
                      {expandedCards[visit.id] ? (
                        <FiChevronUp className="w-5 h-5" />
                      ) : (
                        <FiChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {(visits.length === 1 || expandedCards[visit.id]) && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Documento */}
                    <div className="space-y-2 md:space-y-1">
                      <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                        Documento <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-1 md:gap-1 items-center">
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]{8}"
                          maxLength={visit.esExtranjero ? undefined : 8}
                          placeholder={
                            visit.esExtranjero
                              ? "Número de pasaporte"
                              : "Sin puntos o comas"
                          }
                          value={visit.documento}
                          onChange={(e) => actualizarVisita(visit.id, "documento", e.target.value)}
                          className={cn(
                            "flex-1 px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm",
                            dniErrors[visit.id] && triedSubmit ? "border-red-500" : ""
                          )}
                        />
                        <label className="flex items-center gap-1 px-2 py-1 md:px-2 md:py-1 rounded-full cursor-pointer transition-colors border-2 bg-gray-100 text-[#041e42] border-gray-200 text-xs md:text-sm">
                          <input
                            type="checkbox"
                            checked={visit.esExtranjero}
                            onChange={(e) => actualizarVisita(visit.id, "esExtranjero", e.target.checked)}
                            className="mr-1 accent-[#0047bb]"
                          />
                          <span className="font-semibold">Extranjero</span>
                        </label>
                      </div>
                      {dniErrors[visit.id] && triedSubmit && (
                        <div className="text-xs text-red-600 mt-1">
                          El DNI debe tener exactamente 8 dígitos.
                        </div>
                      )}
                    </div>

                    {/* Nombre y Apellido */}
                    <div className="space-y-2 md:space-y-1">
                      <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                        Nombre y Apellido <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={visit.nombreApellido}
                        onChange={(e) => actualizarVisita(visit.id, "nombreApellido", e.target.value)}
                        className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                        placeholder="Ingrese nombre completo"
                      />
                    </div>

                    {/* Dirección/Manzana y Lote */}
                    <div className="space-y-2 md:space-y-1 md:col-span-2">
                      <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                        Manzana y Lote / Dirección <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={visit.direccion}
                        onChange={(e) => actualizarVisita(visit.id, "direccion", e.target.value)}
                        className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                        placeholder="Ej: Manzana A - Lote 15 o Av. Corrientes 1234"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Agregar otra visita */}
          <div className="text-center">
            <button
              onClick={agregarVisita}
              className="mt-2 flex items-center gap-2 text-[#041e42] hover:text-[#0047bb] font-semibold text-sm md:text-base px-0 py-0 bg-transparent shadow-none hover:underline mx-auto"
            >
              <span className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M12 8V16M8 12H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Agregar otra visita
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 pt-2 md:pt-4 justify-center items-center p-6 border-t border-[#0047bb]/20">
          <ButtonGradient
            onClick={onClose}
            className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white"
          >
            Cancelar
          </ButtonGradient>
          <ButtonGradient
            onClick={handleSubmit}
            className="w-full md:w-auto"
          >
            Cargar Visita
          </ButtonGradient>
        </div>
      </div>
    </div>
  );
}
