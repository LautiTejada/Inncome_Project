"use client";

import { useState, useRef } from 'react';
import { FiCreditCard, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Button } from '@/components';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface RegistroDNI {
  id: string;
  dni: string;
  nombre: string;
  empresa: string;
  hora: string;
  estado: 'autorizado' | 'pendiente' | 'rechazado';
  ubicacion: string;
}

export default function RegistroDNIView() {
  const [dni, setDni] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastRegistro, setLastRegistro] = useState<RegistroDNI | null>(null);
  const keyboardRef = useRef<{ clearInput: () => void } | null>(null);

  const handleKeyPress = (button: string) => {
    if (button === '{bksp}' && dni.length > 0) {
      setDni(dni.slice(0, -1));
    } else if (button === '{enter}') {
      handleSubmitDNI();
    } else if (dni.length < 8 && /^\d$/.test(button)) {
      setDni(dni + button);
    }
  };

  const handleSubmitDNI = async () => {
    if (dni.length !== 8) {
      alert('El DNI debe tener 8 dígitos');
      return;
    }

    setIsProcessing(true);
    
    // Simular procesamiento
    setTimeout(() => {
      const mockRegistro: RegistroDNI = {
        id: Date.now().toString(),
        dni: dni,
        nombre: 'Usuario Registrado',
        empresa: 'Empresa Default',
        hora: new Date().toLocaleTimeString('es-AR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        estado: 'autorizado',
        ubicacion: 'Entrada Principal'
      };

      setLastRegistro(mockRegistro);
      setDni('');
      setIsProcessing(false);
      
      // Limpiar el registro después de 5 segundos
      setTimeout(() => setLastRegistro(null), 5000);
    }, 1500);
  };

  const clearDNI = () => {
    setDni('');
    if (keyboardRef.current) {
      keyboardRef.current.clearInput();
    }
  };

  const keyboardLayout = {
    default: [
      '1 2 3',
      '4 5 6',
      '7 8 9',
      '{bksp} 0 {enter}'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Registro de DNI</h1>
        <p className="text-gray-400">Ingresa el DNI de la persona para registrar su acceso</p>
      </div>

      {/* DNI Display */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            DNI Ingresado
          </label>
          <div className="text-6xl font-mono font-bold text-white tracking-widest">
            {dni || '--------'}
          </div>
          <div className="text-gray-400 text-sm mt-2">
            {dni.length}/8 dígitos
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            variant="secondary"
            onClick={clearDNI}
            disabled={!dni}
            className="px-6 py-3">
            Limpiar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitDNI}
            disabled={dni.length !== 8 || isProcessing}
            className="px-8 py-3 bg-[#06011A] hover:bg-[#0047bb]">
            {isProcessing ? 'Procesando...' : 'Registrar'}
          </Button>
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
              <span className="text-blue-400">Verificando DNI...</span>
            </div>
          </div>
        )}

        {/* Success/Error Message */}
        {lastRegistro && (
          <div className={`mt-4 p-4 rounded-lg border ${
            lastRegistro.estado === 'autorizado' 
              ? 'bg-green-500/20 border-green-500/30' 
              : 'bg-red-500/20 border-red-500/30'
          }`}>
            <div className="flex items-center space-x-2">
              {lastRegistro.estado === 'autorizado' ? (
                <FiCheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <FiXCircle className="w-5 h-5 text-red-400" />
              )}
              <span className={`font-medium ${
                lastRegistro.estado === 'autorizado' ? 'text-green-400' : 'text-red-400'
              }`}>
                DNI {lastRegistro.dni} {lastRegistro.estado === 'autorizado' ? 'autorizado' : 'rechazado'}
              </span>
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {lastRegistro.nombre} - {lastRegistro.empresa}
            </div>
          </div>
        )}
      </div>

      {/* Numeric Keyboard */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Teclado Numérico</h3>
        <div className="flex justify-center">
          <Keyboard
            keyboardRef={(r) => (keyboardRef.current = r)}
            layout={keyboardLayout}
            onKeyPress={handleKeyPress}
            theme="hg-theme-default"
            display={{
              '{bksp}': '⌫',
              '{enter}': '✓'
            }}
            buttonTheme={[
              {
                class: "hg-button-enter",
                buttons: "{enter}"
              }
            ]}
            className="custom-keyboard"
          />
        </div>
        
        {/* Keyboard Instructions */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            <span className="text-blue-400 font-medium">⌫</span> para borrar • 
            <span className="text-green-400 font-medium">✓</span> para confirmar
          </p>
        </div>
      </div>
    </div>
  );
}
