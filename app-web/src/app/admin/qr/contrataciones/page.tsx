"use client";

import React, { useState } from 'react';
import { FiArrowLeft, FiDownload, FiMail, FiSearch, FiFilter, FiEye, FiDollarSign, FiCalendar, FiUser, FiMapPin } from 'react-icons/fi';
import { Button } from '@/components/shared';
import Link from 'next/link';

interface Contratacion {
  id: string;
  documento: string;
  nombre: string;
  email: string;
  fechaCompra: string;
  club: string;
  pagado: 'Sí' | 'No';
}

const MOCK_CONTRATACIONES: Contratacion[] = [
  {
    id: '1',
    documento: '24634377',
    nombre: 'FERNANDEZ PABLO SEBASTIAN',
    email: 'pf78329@mail.com',
    fechaCompra: '2025-07-24 09:27:10',
    club: 'ALMA GARDENIA',
    pagado: 'Sí'
  },
  {
    id: '2',
    documento: '12345678',
    nombre: 'GONZALEZ MARIA JOSE',
    email: 'mgonzalez@email.com',
    fechaCompra: '2025-07-24 08:15:30',
    club: 'Asociación civil Barrio Las Pircas',
    pagado: 'Sí'
  },
  {
    id: '3',
    documento: '87654321',
    nombre: 'LOPEZ CARLOS ALBERTO',
    email: 'clopez@email.com',
    fechaCompra: '2025-07-23 16:45:22',
    club: 'Villa Robert',
    pagado: 'No'
  },
  {
    id: '4',
    documento: '11223344',
    nombre: 'MARTINEZ ANA LUCIA',
    email: 'amartinez@email.com',
    fechaCompra: '2025-07-23 14:20:15',
    club: 'EL MARQUESADO',
    pagado: 'Sí'
  },
  {
    id: '5',
    documento: '55667788',
    nombre: 'RODRIGUEZ JUAN PABLO',
    email: 'jrodriguez@email.com',
    fechaCompra: '2025-07-23 11:30:45',
    club: 'MILCAYAC',
    pagado: 'Sí'
  },
  {
    id: '6',
    documento: '99887766',
    nombre: 'SANCHEZ LUCIA MARIA',
    email: 'lsanchez@email.com',
    fechaCompra: '2025-07-22 17:15:30',
    club: 'Barrio La Toscana',
    pagado: 'No'
  },
  {
    id: '7',
    documento: '44332211',
    nombre: 'TORRES ROBERTO CARLOS',
    email: 'rtorres@email.com',
    fechaCompra: '2025-07-22 15:45:20',
    club: 'Distrito Alto',
    pagado: 'Sí'
  },
  {
    id: '8',
    documento: '66778899',
    nombre: 'VARGAS PATRICIA ELENA',
    email: 'pvargas@email.com',
    fechaCompra: '2025-07-22 13:20:10',
    club: 'Sarmiento 250',
    pagado: 'Sí'
  }
];

export default function ContratacionesQRPage() {
  const [contrataciones, setContrataciones] = useState<Contratacion[]>(MOCK_CONTRATACIONES);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const filteredContrataciones = contrataciones.filter(contratacion => {
    const matchesSearch = contratacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contratacion.documento.includes(searchTerm) ||
                         contratacion.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contratacion.club.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredContrataciones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContrataciones = filteredContrataciones.slice(startIndex, endIndex);

  const handleReenviarCertificado = (contratacion: Contratacion) => {
    console.log(`Reenviando certificado a: ${contratacion.email}`);
    // Aquí iría la lógica para reenviar el certificado
  };

  const handleDescargarCertificados = (contratacion: Contratacion) => {
    console.log(`Descargando certificados para: ${contratacion.nombre}`);
    // Aquí iría la lógica para descargar los certificados
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Back Button */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/qr"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Volver al Panel QR</span>
            <span className="sm:hidden">Volver</span>
          </Link>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">Ingresos Clubes</h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300">Gestión de contrataciones y ingresos de clubes</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, documento, email o club..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800/60 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-base"
          />
        </div>

        <Button
          variant="secondary"
          icon={<FiFilter className="w-5 h-5" />}
          className="w-full sm:w-auto whitespace-nowrap px-6 py-4 text-base"
        >
          <span className="hidden sm:inline">Filtros</span>
          <span className="sm:hidden">Filtros</span>
        </Button>
      </div>

      {/* Contrataciones Table - Desktop */}
      <div className="hidden lg:block flex-1 bg-gray-900/40 rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 px-8 py-6 border-b border-gray-600/50">
          <div className="grid grid-cols-12 gap-8 text-sm font-bold text-gray-100 uppercase tracking-wider">
            <div className="col-span-2 flex items-center gap-2">
              <FiUser className="w-4 h-4 text-blue-400" />
              Documento
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <FiUser className="w-4 h-4 text-green-400" />
              Nombre
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <FiMail className="w-4 h-4 text-purple-400" />
              Email
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <FiCalendar className="w-4 h-4 text-yellow-400" />
              Fecha Compra
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <FiMapPin className="w-4 h-4 text-red-400" />
              Club
            </div>
            <div className="col-span-1 text-center">Estado</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-700/50">
          {currentContrataciones.length > 0 ? (
            currentContrataciones.map((contratacion, index) => (
              <div 
                key={contratacion.id} 
                className="px-8 py-6 hover:bg-gray-800/30 transition-all duration-300 group"
              >
                <div className="grid grid-cols-12 gap-8 items-center">
                  {/* Documento */}
                  <div className="col-span-2">
                    <div className="text-sm font-semibold text-white bg-gradient-to-r from-blue-600/20 to-blue-500/20 px-4 py-2 rounded-xl inline-block border border-blue-500/30 shadow-lg">
                      {contratacion.documento}
                    </div>
                  </div>
                  
                  {/* Nombre */}
                  <div className="col-span-3">
                    <div className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {contratacion.nombre}
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="col-span-2">
                    <div className="text-sm text-gray-300 truncate group-hover:text-white transition-colors" title={contratacion.email}>
                      {contratacion.email}
                    </div>
                  </div>
                  
                  {/* Fecha Compra */}
                  <div className="col-span-2">
                    <div className="text-sm text-gray-300 font-mono bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-600/30">
                      {formatDate(contratacion.fechaCompra)}
                    </div>
                  </div>
                  
                  {/* Club */}
                  <div className="col-span-2">
                    <div className="text-sm text-gray-300 truncate group-hover:text-white transition-colors" title={contratacion.club}>
                      {contratacion.club}
                    </div>
                  </div>
                  
                  {/* Estado */}
                  <div className="col-span-1 text-center">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold shadow-lg ${
                      contratacion.pagado === 'Sí' 
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/40' 
                        : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/40'
                    }`}>
                      {contratacion.pagado === 'Sí' ? (
                        <>
                          <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          Pagado
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                          Pendiente
                        </>
                      )}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons Row */}
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-700/30">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FiEye className="w-4 h-4" />
                    <span className="font-mono">ID: {contratacion.id}</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleReenviarCertificado(contratacion)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600/20 to-blue-500/20 hover:from-blue-600/30 hover:to-blue-500/30 text-blue-400 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-3 border border-blue-500/40 hover:border-blue-500/60 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                    >
                      <FiMail className="w-4 h-4" />
                      Reenviar
                    </button>
                    <button
                      onClick={() => handleDescargarCertificados(contratacion)}
                      className="px-6 py-3 bg-gradient-to-r from-gray-600/20 to-gray-500/20 hover:from-gray-600/30 hover:to-gray-500/30 text-gray-300 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-3 border border-gray-500/40 hover:border-gray-500/60 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                    >
                      <FiDownload className="w-4 h-4" />
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-700/50 to-gray-600/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FiDollarSign className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-200 mb-3">No se encontraron contrataciones</h3>
                <p className="text-gray-400 mb-6 text-lg">
                  {searchTerm ? 'No hay contrataciones que coincidan con la búsqueda' : 'No hay contrataciones registradas'}
                </p>
                {searchTerm && (
                  <Button
                    variant="primary"
                    onClick={() => setSearchTerm('')}
                    className="px-8 py-3 text-base"
                  >
                    Limpiar Búsqueda
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contrataciones Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {currentContrataciones.length > 0 ? (
          currentContrataciones.map((contratacion) => (
            <div key={contratacion.id} className="bg-gray-900/40 rounded-2xl border border-gray-700/50 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white bg-gradient-to-r from-blue-600/20 to-blue-500/20 px-3 py-1 rounded-lg inline-block border border-blue-500/30 mb-2">
                    {contratacion.documento}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{contratacion.nombre}</h3>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                  contratacion.pagado === 'Sí' 
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/40' 
                    : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/40'
                }`}>
                  {contratacion.pagado === 'Sí' ? (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                      Pagado
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-1 animate-pulse"></div>
                      Pendiente
                    </>
                  )}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                <div className="sm:col-span-2">
                  <span className="font-medium">Email:</span> {contratacion.email}
                </div>
                <div>
                  <span className="font-medium">Fecha:</span> {formatDate(contratacion.fechaCompra)}
                </div>
                <div>
                  <span className="font-medium">Club:</span> {contratacion.club}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-700/30">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FiEye className="w-3 h-3" />
                  <span className="font-mono">ID: {contratacion.id}</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReenviarCertificado(contratacion)}
                    className="px-3 py-2 bg-gradient-to-r from-blue-600/20 to-blue-500/20 hover:from-blue-600/30 hover:to-blue-500/30 text-blue-400 text-xs font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 border border-blue-500/40 hover:border-blue-500/60"
                  >
                    <FiMail className="w-3 h-3" />
                    Reenviar
                  </button>
                  <button
                    onClick={() => handleDescargarCertificados(contratacion)}
                    className="px-3 py-2 bg-gradient-to-r from-gray-600/20 to-gray-500/20 hover:from-gray-600/30 hover:to-gray-500/30 text-gray-300 text-xs font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 border border-gray-500/40 hover:border-gray-500/60"
                  >
                    <FiDownload className="w-3 h-3" />
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-700/50 to-gray-600/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FiDollarSign className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-3">No se encontraron contrataciones</h3>
              <p className="text-gray-400 mb-6 text-lg">
                {searchTerm ? 'No hay contrataciones que coincidan con la búsqueda' : 'No hay contrataciones registradas'}
              </p>
              {searchTerm && (
                <Button
                  variant="primary"
                  onClick={() => setSearchTerm('')}
                  className="px-8 py-3 text-base"
                >
                  Limpiar Búsqueda
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm font-semibold text-gray-300 bg-gray-800/60 border border-gray-600/50 rounded-xl hover:bg-gray-700/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              <span className="hidden sm:inline">Anterior</span>
              <span className="sm:hidden">←</span>
            </button>
            
            <div className="flex items-center gap-2 sm:gap-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 sm:px-6 py-2 sm:py-3 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105 ${
                        page === currentPage
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-xl shadow-blue-600/25'
                          : 'text-gray-300 bg-gray-800/60 border border-gray-600/50 hover:bg-gray-700/60 hover:border-gray-500/50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2 sm:px-3 text-gray-400">...</span>;
                }
                return null;
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm font-semibold text-gray-300 bg-gray-800/60 border border-gray-600/50 rounded-xl hover:bg-gray-700/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <span className="sm:hidden">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
