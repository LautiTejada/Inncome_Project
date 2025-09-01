"use client";

import { useState, useRef, useEffect } from 'react';
import { FiUsers, FiPackage, FiLogIn, FiLogOut, FiClock, FiMapPin, FiHome, FiCreditCard, FiRefreshCw, FiCheckCircle, FiX, FiPlus } from 'react-icons/fi';
import { Button } from '@/components';

interface Persona {
  dni: string;
  nombre: string;
  apellido: string;
  manzana?: string;
  lote?: string;
  estado: 'dentro' | 'fuera';
  ultimoIngreso?: string;
  ultimaSalida?: string;
}

interface Registro {
  id: string;
  dni: string;
  nombre: string;
  tipo: 'visita' | 'encomienda' | 'ingreso' | 'egreso';
  manzana?: string;
  lote?: string;
  hora: string;
  estado: 'pendiente' | 'completado';
}

export default function BarreraDashboard() {
  const [dni, setDni] = useState('');
  const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState<'visita' | 'encomienda' | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    manzana: '',
    lote: ''
  });
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data de personas para autocompletado
  const personasMock: Persona[] = [
    { dni: '12345678', nombre: 'Juan', apellido: 'Pérez', manzana: 'A', lote: '15', estado: 'fuera' },
    { dni: '87654321', nombre: 'María', apellido: 'González', manzana: 'B', lote: '8', estado: 'dentro', ultimoIngreso: '08:30' },
    { dni: '11223344', nombre: 'Carlos', apellido: 'Rodríguez', manzana: 'C', lote: '22', estado: 'fuera' },
    { dni: '55667788', nombre: 'Ana', apellido: 'Martínez', manzana: 'A', lote: '12', estado: 'dentro', ultimoIngreso: '09:15' },
  ];

  // Mock data de registros recientes
  useEffect(() => {
    const registrosIniciales: Registro[] = [
      {
        id: '1',
        dni: '87654321',
        nombre: 'María González',
        tipo: 'ingreso',
        hora: '08:30',
        estado: 'completado'
      },
      {
        id: '2',
        dni: '55667788',
        nombre: 'Ana Martínez',
        tipo: 'ingreso',
        hora: '09:15',
        estado: 'completado'
      },
      {
        id: '3',
        dni: '12345678',
        nombre: 'Juan Pérez',
        tipo: 'visita',
        manzana: 'A',
        lote: '15',
        hora: '10:00',
        estado: 'completado'
      }
    ];
    setRegistros(registrosIniciales);
  }, []);

  const handleKeyPress = (button: string) => {
    if (button === 'C' && dni.length > 0) {
      setDni(dni.slice(0, -1));
    } else if (button === 'E' && dni.length === 8) {
      buscarPersona();
    } else if (dni.length < 8 && /^\d$/.test(button)) {
      setDni(dni + button);
    }
  };

  const buscarPersona = () => {
    if (dni.length !== 8) return;
    
    const persona = personasMock.find(p => p.dni === dni);
    if (persona) {
      setPersonaSeleccionada(persona);
      setFormData({
        nombre: persona.nombre,
        apellido: persona.apellido,
        manzana: persona.manzana || '',
        lote: persona.lote || ''
      });
    } else {
      setPersonaSeleccionada(null);
      setFormData({ nombre: '', apellido: '', manzana: '', lote: '' });
    }
  };

  const abrirFormulario = (tipo: 'visita' | 'encomienda') => {
    setMostrarFormulario(tipo);
    if (personaSeleccionada) {
      setFormData({
        nombre: personaSeleccionada.nombre,
        apellido: personaSeleccionada.apellido,
        manzana: personaSeleccionada.manzana || '',
        lote: personaSeleccionada.lote || ''
      });
    }
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(null);
    setFormData({ nombre: '', apellido: '', manzana: '', lote: '' });
  };

  const registrarVisita = () => {
    if (!formData.nombre || !formData.apellido || !formData.manzana || !formData.lote) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      const nuevoRegistro: Registro = {
        id: Date.now().toString(),
        dni: dni || 'N/A',
        nombre: `${formData.nombre} ${formData.apellido}`,
        tipo: 'visita',
        manzana: formData.manzana,
        lote: formData.lote,
        hora: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
        estado: 'completado'
      };
      
      setRegistros(prev => [nuevoRegistro, ...prev]);
      cerrarFormulario();
      setDni('');
      setIsProcessing(false);
    }, 1000);
  };

  const registrarEncomienda = () => {
    if (!formData.nombre || !formData.apellido || !formData.manzana || !formData.lote) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      const nuevoRegistro: Registro = {
        id: Date.now().toString(),
        dni: dni || 'N/A',
        nombre: `${formData.nombre} ${formData.apellido}`,
        tipo: 'encomienda',
        manzana: formData.manzana,
        lote: formData.lote,
        hora: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
        estado: 'completado'
      };
      
      setRegistros(prev => [nuevoRegistro, ...prev]);
      cerrarFormulario();
      setDni('');
      setIsProcessing(false);
    }, 1000);
  };

  const marcarEntradaSalida = () => {
    if (!personaSeleccionada) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      const esEntrada = personaSeleccionada.estado === 'fuera';
      const nuevoRegistro: Registro = {
        id: Date.now().toString(),
        dni: personaSeleccionada.dni,
        nombre: `${personaSeleccionada.nombre} ${personaSeleccionada.apellido}`,
        tipo: esEntrada ? 'ingreso' : 'egreso',
        hora: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
        estado: 'completado'
      };
      
      setRegistros(prev => [nuevoRegistro, ...prev]);
      
      // Actualizar estado de la persona
      setPersonaSeleccionada(prev => prev ? {
        ...prev,
        estado: esEntrada ? 'dentro' : 'fuera',
        ultimoIngreso: esEntrada ? nuevoRegistro.hora : prev.ultimoIngreso,
        ultimaSalida: !esEntrada ? nuevoRegistro.hora : prev.ultimaSalida
      } : null);
      
      setDni('');
      setIsProcessing(false);
    }, 1000);
  };

  const limpiarFormulario = () => {
    setDni('');
    setPersonaSeleccionada(null);
    setMostrarFormulario(null);
    setFormData({ nombre: '', apellido: '', manzana: '', lote: '' });
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'visita': return <FiUsers className="w-4 h-4 text-blue-400" />;
      case 'encomienda': return <FiPackage className="w-4 h-4 text-purple-400" />;
      case 'ingreso': return <FiLogIn className="w-4 h-4 text-green-400" />;
      case 'egreso': return <FiLogOut className="w-4 h-4 text-red-400" />;
      default: return <FiClock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'visita': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'encomienda': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'ingreso': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'egreso': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-2 sm:p-4">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center px-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">🚪 Control de Acceso</h1>
          <p className="text-sm sm:text-base text-gray-400">Panel unificado para guardia</p>
        </div>

        {/* Teclado Numérico */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700/50 p-3 sm:p-6">
          <div className="mb-4 sm:mb-6 text-center">
            <label className="block text-base sm:text-lg font-medium text-gray-300 mb-2 sm:mb-3">
              Ingresa DNI
            </label>
            <div className="text-3xl sm:text-5xl font-mono font-bold text-white tracking-widest mb-2 sm:mb-3 bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
              {dni || '--------'}
            </div>
            {personaSeleccionada && (
              <div className="text-green-400 text-sm sm:text-lg font-medium">
                ✓ {personaSeleccionada.nombre} {personaSeleccionada.apellido}
                <span className={`ml-2 sm:ml-3 px-2 py-1 rounded-full text-xs ${
                  personaSeleccionada.estado === 'dentro' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {personaSeleccionada.estado === 'dentro' ? 'DENTRO' : 'FUERA'}
                </span>
              </div>
            )}
          </div>
          
          {/* Teclado personalizado */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleKeyPress(num.toString())}
                disabled={dni.length >= 8}
                className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg sm:text-xl rounded-lg sm:rounded-xl border-2 border-blue-500/50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg touch-manipulation"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handleKeyPress('C')}
              disabled={dni.length === 0}
              title="Borrar último dígito"
              className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base sm:text-lg rounded-lg sm:rounded-xl border-2 border-red-500/50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg touch-manipulation"
            >
              ⌫
            </button>
            <button
              onClick={() => handleKeyPress('0')}
              disabled={dni.length >= 8}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg sm:text-xl rounded-lg sm:rounded-xl border-2 border-blue-500/50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg touch-manipulation"
            >
              0
            </button>
            <button
              onClick={() => handleKeyPress('E')}
              disabled={dni.length !== 8}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base sm:text-lg rounded-lg sm:rounded-xl border-2 border-green-500/50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg touch-manipulation"
            >
              E
            </button>
          </div>
        </div>

        {/* Botones de Acción */}
        {personaSeleccionada && (
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <Button
              variant="primary"
              onClick={() => abrirFormulario('visita')}
              className="w-full h-12 sm:h-14 text-base sm:text-lg"
              disabled={isProcessing}
            >
              <FiUsers className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Registrar Visita
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => abrirFormulario('encomienda')}
              className="w-full h-12 sm:h-14 text-base sm:text-lg"
              disabled={isProcessing}
            >
              <FiPackage className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Registrar Encomienda
            </Button>
            
            <Button
              variant={personaSeleccionada.estado === 'fuera' ? 'success' : 'danger'}
              onClick={marcarEntradaSalida}
              className="w-full h-12 sm:h-14 text-base sm:text-lg"
              disabled={isProcessing}
            >
              {personaSeleccionada.estado === 'fuera' ? (
                <>
                  <FiLogIn className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Marcar Entrada
                </>
              ) : (
                <>
                  <FiLogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Marcar Salida
                </>
              )}
            </Button>
          </div>
        )}

        {/* Tabla de Ingresos en Tiempo Real */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700/50 p-3 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white">Ingresos en Tiempo Real</h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={limpiarFormulario}
              className="text-xs sm:text-sm"
            >
              <FiRefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Limpiar
            </Button>
          </div>
          
          {/* Tabla responsive para móvil */}
          <div className="space-y-3">
            {registros.map((registro) => (
              <div key={registro.id} className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTipoIcon(registro.tipo)}
                    <span className="text-sm font-medium text-gray-200 capitalize">
                      {registro.tipo}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    registro.estado === 'completado' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {registro.estado}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Persona:</span>
                    <span className="text-gray-200 font-medium">{registro.nombre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">DNI:</span>
                    <span className="text-gray-300">{registro.dni}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ubicación:</span>
                    <span className="text-gray-300">
                      {registro.manzana && registro.lote ? `${registro.manzana} - ${registro.lote}` : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hora:</span>
                    <span className="text-gray-300">{registro.hora}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de Formulario */}
        {mostrarFormulario && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-700/50 p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-4">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {mostrarFormulario === 'visita' ? 'Registrar Visita' : 'Registrar Encomienda'}
                </h3>
                <button
                  onClick={cerrarFormulario}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                    className="w-full px-3 py-2 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingresa el nombre"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => setFormData(prev => ({ ...prev, apellido: e.target.value }))}
                    className="w-full px-3 py-2 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingresa el apellido"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                      Manzana
                    </label>
                    <input
                      type="text"
                      value={formData.manzana}
                      onChange={(e) => setFormData(prev => ({ ...prev, manzana: e.target.value }))}
                      className="w-full px-3 py-2 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="A, B, C..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                      Lote
                    </label>
                    <input
                      type="text"
                      value={formData.lote}
                      onChange={(e) => setFormData(prev => ({ ...prev, lote: e.target.value }))}
                      className="w-full px-3 py-2 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="15, 8, 22..."
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <Button
                    variant="secondary"
                    onClick={cerrarFormulario}
                    className="w-full sm:flex-1 h-11 sm:h-12 text-sm sm:text-base"
                    disabled={isProcessing}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={mostrarFormulario === 'visita' ? registrarVisita : registrarEncomienda}
                    className="w-full sm:flex-1 h-11 sm:h-12 text-sm sm:text-base"
                    disabled={isProcessing || !formData.nombre || !formData.apellido || !formData.manzana || !formData.lote}
                  >
                    {isProcessing ? (
                      <FiRefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <FiCheckCircle className="w-4 h-4 mr-2" />
                    )}
                    Confirmar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
