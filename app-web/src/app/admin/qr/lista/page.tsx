"use client";

import React, { useState } from 'react';
import { FiCode, FiEdit, FiPlus, FiSearch, FiDownload, FiMapPin, FiArrowLeft } from 'react-icons/fi';
import { Button, QRModal } from '@/components/shared';
import Link from 'next/link';

interface QR {
  id: string;
  nombre: string;
  cuit: string;
  direccion: string;
  numero: string;
  localidad: string;
  provincia: string;
  qrCode?: string;
}

const MOCK_QRS: QR[] = [
  {
    id: '1',
    nombre: 'Villa Robert',
    cuit: '30715670190',
    direccion: 'Calle Roberts',
    numero: 'S/N',
    localidad: 'Junin',
    provincia: 'Mendoza',
    qrCode: '/assets/img/qr-villa-robert.png'
  },
  {
    id: '2',
    nombre: 'ALMA GARDENIA',
    cuit: '30-71746042-8',
    direccion: 'RUTA 60',
    numero: 'S/N',
    localidad: 'MAIPU',
    provincia: 'Mendoza',
    qrCode: '/assets/img/qr-alma-gardenia.png'
  },
  {
    id: '3',
    nombre: 'BARRIO TERRUÑOS DE ARAOZ II',
    cuit: '30-98765432-1',
    direccion: 'Av. San Martín',
    numero: '1234',
    localidad: 'Lujan de Cuyo',
    provincia: 'Mendoza',
    qrCode: '/assets/img/qr-terrunos-araoz.png'
  },
  {
    id: '4',
    nombre: 'EL MARQUESADO',
    cuit: '30-12345678-9',
    direccion: 'Ruta Provincial 82',
    numero: 'S/N',
    localidad: 'Lujan de Cuyo',
    provincia: 'Mendoza',
    qrCode: '/assets/img/qr-marquesado.png'
  },
  {
    id: '5',
    nombre: 'Inncome San Juan',
    cuit: '20-98765432-1',
    direccion: 'Av. Libertador',
    numero: '5678',
    localidad: 'SAN JUAN',
    provincia: 'San Juan',
    qrCode: '/assets/img/qr-inncome-san-juan.png'
  },
  {
    id: '6',
    nombre: 'MILCAYAC',
    cuit: '30-55556666-7',
    direccion: 'Ruta Nacional 7',
    numero: 'S/N',
    localidad: 'Lujan de Cuyo',
    provincia: 'Mendoza',
    qrCode: '/assets/img/qr-milcayac.png'
  },
  {
    id: '7',
    nombre: 'Consorcio de Propietarios Edificio Sarmiento 250',
    cuit: '30-11112222-3',
    direccion: 'Sarmiento',
    numero: '250',
    localidad: 'Coquimbito Maipu',
    provincia: 'Mendoza',
    qrCode: '/assets/img/qr-sarmiento-250.png'
  },
  {
    id: '8',
    nombre: 'Barrio Privado Distrito Alto',
    cuit: '30-44445555-6',
    direccion: 'Distrito Alto',
    numero: 'S/N',
    localidad: 'Lujan de Cuyo',
    provincia: 'Mendoza',
    qrCode: '/assets/img/qr-distrito-alto.png'
  },
  {
    id: '9',
    nombre: 'Barrio La Toscana',
    cuit: '30-77778888-9',
    direccion: 'La Toscana',
    numero: 'S/N',
    localidad: 'Lujan de Cuyo',
    provincia: 'Mendoza',
    qrCode: '/assets/img/qr-la-toscana.png'
  }
];

export default function QRListaPage() {
  const [qrs, setQrs] = useState<QR[]>(MOCK_QRS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingQR, setEditingQR] = useState<QR | null>(null);

  const filteredQRs = qrs.filter(qr => {
    const matchesSearch = qr.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.cuit.includes(searchTerm) ||
                         qr.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.localidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.provincia.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleEdit = (qr: QR) => {
    setEditingQR(qr);
    setShowAddModal(true);
  };

  const handleSubmit = (qrData: Omit<QR, 'id'>) => {
    if (editingQR) {
      // Update existing QR
      setQrs(prev => prev.map(q => 
        q.id === editingQR.id 
          ? { ...qrData, id: q.id }
          : q
      ));
      setEditingQR(null);
    } else {
      // Create new QR
      const newQR: QR = {
        ...qrData,
        id: Date.now().toString()
      };
      setQrs(prev => [...prev, newQR]);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingQR(null);
  };

  const handleDownloadQR = (qr: QR) => {
    // En una implementación real, aquí se descargaría el QR
    console.log(`Descargando QR para: ${qr.nombre}`);
    // Simular descarga
    const link = document.createElement('a');
    link.href = qr.qrCode || '/assets/img/qr-placeholder.png';
    link.download = `qr-${qr.nombre.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.click();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Back Button */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/admin/qr"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Volver al Panel QR</span>
            <span className="sm:hidden">Volver</span>
          </Link>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Lista de Códigos QR</h1>
        <p className="text-sm sm:text-base text-gray-300">Gestión de todos los códigos QR del sistema</p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por nombre, CUIT, dirección, localidad o provincia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          icon={<FiPlus className="w-4 h-4" />}
          className="w-full sm:w-auto whitespace-nowrap"
        >
          <span className="hidden sm:inline">Crear QR</span>
          <span className="sm:hidden">Crear</span>
        </Button>
      </div>

      {/* QR Table - Desktop */}
      <div className="hidden lg:block flex-1 bg-gray-900/50 rounded-lg border border-gray-700/50 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Table Header */}
          <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-700/50">
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-300 uppercase tracking-wider">
              <div className="col-span-2">Nombre</div>
              <div className="col-span-2">CUIT</div>
              <div className="col-span-3">Dirección</div>
              <div className="col-span-2">Localidad</div>
              <div className="col-span-1">Provincia</div>
              <div className="col-span-1">QR</div>
              <div className="col-span-1 text-center">Acciones</div>
            </div>
          </div>

          {/* Table Body - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {filteredQRs.length > 0 ? (
              <div className="divide-y divide-gray-700/50">
                {filteredQRs.map((qr) => (
                  <div key={qr.id} className="px-6 py-4 hover:bg-gray-800/30 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2">
                        <div className="text-sm font-medium text-white">{qr.nombre}</div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-300">{qr.cuit}</div>
                      <div className="col-span-3 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <FiMapPin className="w-3 h-3 text-gray-400" />
                          {qr.direccion} {qr.numero}
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-300">{qr.localidad}</div>
                      <div className="col-span-1 text-sm text-gray-300">{qr.provincia}</div>
                      <div className="col-span-1">
                        <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                          {qr.qrCode ? (
                            <img 
                              src={qr.qrCode} 
                              alt={`QR ${qr.nombre}`}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <FiCode className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <button
                          onClick={() => handleDownloadQR(qr)}
                          className="w-full mt-1 text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-1"
                        >
                          <FiDownload className="w-3 h-3" />
                          Descargar QR
                        </button>
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => handleEdit(qr)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Modificar"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCode className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">No se encontraron códigos QR</h3>
                  <p className="text-gray-400 mb-4">
                    {searchTerm ? 'No hay códigos QR que coincidan con la búsqueda' : 'No hay códigos QR registrados'}
                  </p>
                  {searchTerm && (
                    <Button
                      variant="primary"
                      onClick={() => setSearchTerm('')}
                    >
                      Limpiar Búsqueda
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredQRs.length > 0 ? (
          filteredQRs.map((qr) => (
            <div key={qr.id} className="bg-gray-900/50 rounded-lg border border-gray-700/50 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1">{qr.nombre}</h3>
                  <div className="text-sm text-gray-400">CUIT: {qr.cuit}</div>
                </div>
                <button
                  onClick={() => handleEdit(qr)}
                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors flex-shrink-0"
                  title="Modificar"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                <div className="sm:col-span-2">
                  <span className="font-medium">Dirección:</span>
                  <div className="flex items-center gap-1 mt-1">
                    <FiMapPin className="w-3 h-3 text-gray-400" />
                    {qr.direccion} {qr.numero}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Localidad:</span> {qr.localidad}
                </div>
                <div>
                  <span className="font-medium">Provincia:</span> {qr.provincia}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    {qr.qrCode ? (
                      <img 
                        src={qr.qrCode} 
                        alt={`QR ${qr.nombre}`}
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      <FiCode className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <button
                    onClick={() => handleDownloadQR(qr)}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    <FiDownload className="w-3 h-3" />
                    Descargar QR
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCode className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">No se encontraron códigos QR</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm ? 'No hay códigos QR que coincidan con la búsqueda' : 'No hay códigos QR registrados'}
              </p>
              {searchTerm && (
                <Button
                  variant="primary"
                  onClick={() => setSearchTerm('')}
                >
                  Limpiar Búsqueda
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <QRModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        qr={editingQR}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
