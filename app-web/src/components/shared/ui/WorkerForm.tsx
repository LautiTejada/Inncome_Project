"use client";

import { useState, useEffect } from 'react';
import { FiUser, FiX, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Listbox } from '@headlessui/react';
import { cn } from '@/lib/utils';
import ButtonGradient from './ButtonGradient';
import CreditsModal from './CreditsModal';
import { useForm } from '@/contexts/FormContext';

interface Worker {
  id: number;
  documento: string;
  nombreApellido: string;
  actividad: string;
  direccion: string;
  esExtranjero: boolean;
}

interface WorkerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (workers: Worker[]) => void;
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
            "w-full px-2 py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-xs disabled:bg-gray-100 disabled:text-gray-400 flex items-center justify-between min-h-[32px]",
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
            className="w-3 h-3 ml-1 text-[#0047bb]"
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
        <Listbox.Options className="absolute z-50 w-full mt-1 bg-white border border-[#0047bb] rounded-lg shadow-sm max-h-40 overflow-auto focus:outline-none text-xs animate-fade-in">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className={({ active, selected }) =>
                cn(
                  "cursor-pointer select-none py-1.5 px-3 rounded transition-colors",
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

export default function WorkerForm({ isOpen, onClose, onSubmit }: WorkerFormProps) {
  const { openForm, closeForm } = useForm();
  const [workers, setWorkers] = useState<Worker[]>([
    {
      id: 1,
      documento: "",
      nombreApellido: "",
      actividad: "",
      direccion: "",
      esExtranjero: false,
    },
  ]);

  // Manejar el estado del formulario en el contexto global
  useEffect(() => {
    if (isOpen) {
      openForm('worker-form');
    } else {
      closeForm('worker-form');
    }
  }, [isOpen, openForm, closeForm]);
  const [dniErrors, setDniErrors] = useState<{ [id: number]: boolean }>({});
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [creditosDisponibles, setCreditosDisponibles] = useState(15);
  const [expandedCards, setExpandedCards] = useState<{ [id: number]: boolean }>({ 1: true });

  const actividades = [
    "Ventas",
    "Administración",
    "IT",
    "Recursos Humanos",
    "Marketing",
    "Contabilidad",
    "Logística",
    "Atención al Cliente"
  ];

  const resetForm = () => {
    setWorkers([
      {
        id: 1,
        documento: "",
        nombreApellido: "",
        actividad: "",
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
    
    workers.forEach((worker) => {
      if (!worker.documento || !worker.nombreApellido || !worker.actividad || !worker.direccion) {
        valid = false;
      }
      if (!worker.esExtranjero && worker.documento && worker.documento.length !== 8) {
        newDniErrors[worker.id] = true;
        valid = false;
      } else {
        newDniErrors[worker.id] = false;
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

    // Verificar si hay suficientes créditos
    const trabajadoresCount = workers.length; // Todos los workers son trabajadores
    if (creditosDisponibles < trabajadoresCount) {
      alert(`No tienes suficientes créditos. Necesitas ${trabajadoresCount - creditosDisponibles} más.`);
      return;
    }

    onSubmit(workers);
    resetForm();
    onClose();
  };

  const handlePurchaseCredits = (newCredits: number) => {
    setCreditosDisponibles(prev => prev + newCredits);
  };

  const agregarTrabajador = () => {
    const newId = Math.max(...workers.map((w) => w.id)) + 1;
    setWorkers([
      ...workers,
      {
        id: newId,
        documento: "",
        nombreApellido: "",
        actividad: "",
        direccion: "",
        esExtranjero: false,
      },
    ]);
    // Expandir automáticamente la nueva tarjeta
    setExpandedCards(prev => ({ ...prev, [newId]: true }));
    // Si es la segunda tarjeta, mantener la primera expandida
    if (workers.length === 1) {
      setExpandedCards(prev => ({ ...prev, [workers[0].id]: true }));
    }
  };

  const eliminarTrabajador = (id: number) => {
    if (workers.length > 1) {
      setWorkers(workers.filter((w) => w.id !== id));
      // Remover el estado de expansión de la tarjeta eliminada
      setExpandedCards(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  const actualizarTrabajador = (
    id: number,
    field: keyof Worker,
    value: string | boolean
  ) => {
    setWorkers(
      workers.map((w) => (w.id === id ? { ...w, [field]: value } : w))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#eff3f6] border-2 border-[#0047bb] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#0047bb]/20">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#041e42]">Alta de Trabajadores</h2>
            <p className="text-[#041e42] mt-1 font-medium">Registra trabajadores y visitantes de forma rápida y sencilla</p>
            <div className="mt-3 flex items-center gap-2 bg-[#eaf3ff] border border-[#d0e3fa] rounded-lg shadow-sm px-3 py-2 min-w-[120px]">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0047bb] text-white">
                <FiUser className="w-4 h-4" />
              </span>
              <div className="flex flex-col justify-center">
                <span className="text-[#0047bb] font-semibold text-xs leading-tight">
                  Créditos Disponibles
                </span>
                <span className="text-xl font-normal text-[#041e42] leading-tight">
                  {creditosDisponibles}
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
          {workers.map((worker, index) => (
            <div key={worker.id} className="bg-white rounded-2xl border-2 border-[#0047bb]/40 shadow-md overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-[#0047bb]/20">
                                 <h3 className="text-lg font-bold text-[#041e42] tracking-wide">
                   Trabajador {index + 1}
                 </h3>
                                 <div className="flex items-center gap-2">
                   {workers.length > 1 && (
                     <button
                       onClick={() => eliminarTrabajador(worker.id)}
                       className="text-red-500 hover:text-red-700 transition-colors"
                       title="Eliminar trabajador"
                     >
                       <FiTrash2 className="w-5 h-5" />
                     </button>
                   )}
                   {workers.length > 1 && (
                     <button
                       onClick={() => setExpandedCards(prev => ({ ...prev, [worker.id]: !prev[worker.id] }))}
                       className="text-[#0047bb] hover:text-[#041e42] transition-colors"
                       title={expandedCards[worker.id] ? "Comprimir" : "Expandir"}
                     >
                       {expandedCards[worker.id] ? (
                         <FiChevronUp className="w-5 h-5" />
                       ) : (
                         <FiChevronDown className="w-5 h-5" />
                       )}
                     </button>
                   )}
                 </div>
              </div>

                             {(workers.length === 1 || expandedCards[worker.id]) && (
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
                          maxLength={worker.esExtranjero ? undefined : 8}
                          placeholder={
                            worker.esExtranjero
                              ? "Número de pasaporte"
                              : "Sin puntos o comas"
                          }
                          value={worker.documento}
                          onChange={(e) => actualizarTrabajador(worker.id, "documento", e.target.value)}
                          className={cn(
                            "flex-1 px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm",
                            dniErrors[worker.id] && triedSubmit ? "border-red-500" : ""
                          )}
                        />
                        <label className="flex items-center gap-1 px-2 py-1 md:px-2 md:py-1 rounded-full cursor-pointer transition-colors border-2 bg-gray-100 text-[#041e42] border-gray-200 text-xs md:text-sm">
                          <input
                            type="checkbox"
                            checked={worker.esExtranjero}
                            onChange={(e) => actualizarTrabajador(worker.id, "esExtranjero", e.target.checked)}
                            className="mr-1 accent-[#0047bb]"
                          />
                          <span className="font-semibold">Extranjero</span>
                        </label>
                      </div>
                      {dniErrors[worker.id] && triedSubmit && (
                        <div className="text-xs text-red-600 mt-1">
                          El DNI debe tener exactamente 8 dígitos.
                        </div>
                      )}
                    </div>

                    {/* Nombre y Apellido */}
                    <div className="space-y-2 md:space-y-1">
                      <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                        Nombre y Apellido
                      </label>
                      <input
                        type="text"
                        value={worker.nombreApellido}
                        onChange={(e) => actualizarTrabajador(worker.id, "nombreApellido", e.target.value)}
                        className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                        placeholder="Ingrese nombre completo"
                      />
                    </div>

                    {/* Actividad */}
                    <div className="space-y-2 md:space-y-1">
                      <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                        Actividad <span className="text-red-500">*</span>
                      </label>
                      <SelectField
                        value={worker.actividad as string}
                        onChange={(v) => actualizarTrabajador(worker.id, "actividad", v)}
                        options={[
                          { value: "", label: "Selecciona actividad..." },
                          ...actividades.map((actividad) => ({
                            value: actividad,
                            label: actividad,
                          })),
                        ]}
                        placeholder="Selecciona actividad..."
                      />
                    </div>

                    {/* Dirección/Manzana y Lote */}
                    <div className="space-y-2 md:space-y-1">
                      <label className="block text-sm font-semibold text-[#041e42] md:text-xs md:font-bold">
                        Manzana y Lote / Dirección <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={worker.direccion}
                        onChange={(e) => actualizarTrabajador(worker.id, "direccion", e.target.value)}
                        className="w-full px-3 py-2 md:px-2 md:py-1 border-2 border-[#0047bb] rounded-full bg-white text-[#041e42] placeholder-[#041e42] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047bb] focus:border-[#0047bb] text-sm"
                        placeholder="Ej: Manzana A - Lote 15 o Av. Corrientes 1234"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Agregar otro trabajador */}
          <div className="text-center">
            <button
              onClick={agregarTrabajador}
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
              Agregar otro trabajador
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
            Usar mis créditos
          </ButtonGradient>
          <ButtonGradient
            onClick={() => setShowCreditsModal(true)}
            className="w-full md:w-auto"
          >
            Comprar créditos
          </ButtonGradient>
        </div>

        {/* Credits Modal */}
        <CreditsModal
          isOpen={showCreditsModal}
          onClose={() => setShowCreditsModal(false)}
          onPurchase={handlePurchaseCredits}

        />
      </div>
    </div>
  );
} 