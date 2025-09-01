"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiSearch, FiX, FiHelpCircle, FiDownload, FiUpload, FiEye, FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { Button, Dialog, CompactListbox, CriminalRecordForm } from '@/components';

interface CriminalRecord {
  id: string;
  documentNumber: string;
  name: string;
  fileName: string;
  uploadDate: string;
  status: 'aprobado' | 'pendiente' | 'rechazado';
  comments?: string;
  establishment: string;
  block: string;
  lot: string;
}

interface RecordFormData {
  documentNumber: string;
  name: string;
  certificateFile: File | null;
}

interface CertificadosPenalesViewProps {
  mode?: 'admin' | 'propietario';
  title?: string;
  description?: string;
  showActions?: boolean;
  onRecordEdit?: (record: CriminalRecord) => void;
  onRecordDelete?: (recordId: string) => void;
  onRecordApprove?: (recordId: string) => void;
  onRecordReject?: (recordId: string, comments: string) => void;
}

function CertificadosPenalesViewContent({
  mode = 'propietario',
  title = 'Certificados Penales',
  description = 'Gestiona los certificados y antecedentes de tu personal',
  showActions = false,
  onRecordEdit,
  onRecordDelete,
  onRecordApprove,
  onRecordReject
}: CertificadosPenalesViewProps) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<CriminalRecord | null>(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isRecordFormOpen, setIsRecordFormOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<CriminalRecord | null>(null);
  
  // Leer el parámetro de URL para abrir el formulario automáticamente
  useEffect(() => {
    const formParam = searchParams.get('form');
    if (formParam === 'new') {
      setIsRecordFormOpen(true);
    }
  }, [searchParams]);
  
  // Handle record form submission
  const handleRecordFormSubmit = (recordData: RecordFormData) => {
    console.log('Certificado cargado:', recordData);
    
    // Aquí puedes agregar la lógica para procesar el certificado
    const newRecord: CriminalRecord = {
      id: `new-${Date.now()}`,
      documentNumber: recordData.documentNumber,
      name: recordData.name,
      fileName: recordData.certificateFile?.name || 'certificado.pdf',
      uploadDate: new Date().toLocaleString('es-AR'),
      status: 'pendiente',
      establishment: 'BARRIO PRUEBA',
      block: 'F',
      lot: '4'
    };

    setRecords(prev => [newRecord, ...prev]);
    
    // Mostrar notificación de éxito
    alert('✅ Certificado cargado correctamente. Está en revisión.');
  };

  const [records, setRecords] = useState<CriminalRecord[]>([
    {
      id: '1',
      documentNumber: '46912817',
      name: 'ACEVEDO PABLO LEONARDO TOMAS',
      fileName: 'certificado_antecedentes.pdf',
      uploadDate: '2025-03-16 21:01:40',
      status: 'aprobado',
      establishment: 'BARRIO PRUEBA',
      block: 'F',
      lot: '4'
    },
    {
      id: '2',
      documentNumber: '60001145',
      name: 'GONZALEZ JUAN DIEGO',
      fileName: 'antecedentes_penales.pdf',
      uploadDate: '2025-03-15 14:30:22',
      status: 'aprobado',
      establishment: 'BARRIO PRUEBA',
      block: 'A',
      lot: '12'
    },
    {
      id: '3',
      documentNumber: '60001109',
      name: 'RODRIGUEZ CARLOS ANTONIO',
      fileName: 'certificado_vencido.pdf',
      uploadDate: '2025-03-10 09:15:45',
      status: 'rechazado',
      comments: 'Certificado vencido. Se requiere documento actualizado.',
      establishment: 'BARRIO PRUEBA',
      block: 'C',
      lot: '8'
    }
  ]);

  // Filter options
  const [filterOptions] = useState([
    { value: 'all', label: 'Todos los certificados' },
    { value: 'aprobado', label: 'Solo aprobados' },
    { value: 'pendiente', label: 'Pendientes' },
    { value: 'rechazado', label: 'Rechazados' }
  ]);

  const filteredRecords = records.filter(record => {
    const term = searchTerm.toLowerCase().trim();
    
    // Search filter
    const searchMatch = !term || 
      record.name.toLowerCase().includes(term) ||
      record.documentNumber.toLowerCase().includes(term) ||
      record.establishment.toLowerCase().includes(term);
    
    // Status filter
    const statusMatch = selectedFilter === 'all' || record.status === selectedFilter;
    
    return searchMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprobado':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pendiente':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'rechazado':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleRecordClick = (record: CriminalRecord) => {
    setSelectedRecord(record);
    setIsRecordModalOpen(true);
  };

  const handleEdit = (record: CriminalRecord) => {
    setRecordToEdit(record);
    setIsEditModalOpen(true);
    onRecordEdit?.(record);
  };

  const handleApprove = (recordId: string) => {
    setRecords(prev => prev.map(record => 
      record.id === recordId 
        ? { ...record, status: 'aprobado' as const }
        : record
    ));
    onRecordApprove?.(recordId);
    alert('✅ Certificado aprobado correctamente');
  };

  const handleReject = (recordId: string) => {
    const comments = prompt('Ingrese el motivo del rechazo:');
    if (comments) {
      setRecords(prev => prev.map(record => 
        record.id === recordId 
          ? { ...record, status: 'rechazado' as const, comments }
          : record
      ));
      onRecordReject?.(recordId, comments);
      alert('❌ Certificado rechazado');
    }
  };

  const handleDelete = (recordId: string) => {
    if (confirm('¿Está seguro de que desea eliminar este certificado?')) {
      setRecords(prev => prev.filter(record => record.id !== recordId));
      onRecordDelete?.(recordId);
      alert('🗑️ Certificado eliminado correctamente');
    }
  };

  return (
    <>
      {/* Title Section */}
      <div className="mb-6 sm:mb-8">
        {mode === 'admin' && (
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/admin/gestion" 
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Volver a Gestión</span>
            </Link>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-sm sm:text-base text-gray-400">{description}</p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por beneficiario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <CompactListbox
          options={filterOptions}
          value={{ value: selectedFilter, label: filterOptions.find(f => f.value === selectedFilter)?.label || 'Todos los certificados' }}
          onChange={(value: { value: string; label: string }) => setSelectedFilter(value.value)}
          placeholder="Filtrar por estado"
          className="w-full sm:w-48"
        />
        
        <Button
          variant="primary"
          icon={<FiUpload className="w-4 h-4" />}
          onClick={() => setIsRecordFormOpen(true)}
          className="w-full sm:w-auto"
        >
          <span className="hidden sm:inline">Cargar Antecedentes Penales</span>
          <span className="sm:hidden">Cargar Antecedentes</span>
        </Button>
      </div>

      {/* Records Table - Desktop */}
      <div className="hidden lg:block bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Historial de Ingresos</h3>
          <Button
            variant="secondary"
            icon={<FiDownload className="w-4 h-4" />}
          >
            Exportar
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/70">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/4">
                  Beneficiario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                  Documento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                  Fecha de Carga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                  Establecimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/12">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap w-1/4">
                    <div className="text-sm font-medium text-white">{record.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/6">
                    <div className="text-sm text-gray-300">{record.documentNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/6">
                    <div className="text-sm text-gray-300">{record.uploadDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/6">
                    <div className="text-sm text-gray-300">{record.establishment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/6">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                      {record.status === 'aprobado' ? 'Aprobado' : 
                       record.status === 'pendiente' ? 'Pendiente' : 'Rechazado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/12">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleRecordClick(record)}
                        className="text-gray-400 hover:text-gray-300"
                        title="Ver detalles"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      
                      {/* Admin actions */}
                      {mode === 'admin' && showActions && (
                        <>
                          <button 
                            onClick={() => handleEdit(record)}
                            className="text-blue-400 hover:text-blue-300"
                            title="Editar"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          
                          {record.status === 'pendiente' && (
                            <>
                              <button 
                                onClick={() => handleApprove(record.id)}
                                className="text-green-400 hover:text-green-300"
                                title="Aprobar"
                              >
                                <FiEye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleReject(record.id)}
                                className="text-red-400 hover:text-red-300"
                                title="Rechazar"
                              >
                                <FiX className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          
                          <button 
                            onClick={() => handleDelete(record.id)}
                            className="text-red-400 hover:text-red-300"
                            title="Eliminar"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Mostrando 1-{filteredRecords.length} de {records.length} resultados
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-400 hover:text-white disabled:opacity-50">
                Anterior
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm text-gray-400 hover:text-white">2</button>
              <button className="px-3 py-1 text-sm text-gray-400 hover:text-white">3</button>
              <button className="px-3 py-1 text-sm text-gray-400 hover:text-white">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Records Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Historial de Ingresos</h3>
          <Button
            variant="secondary"
            icon={<FiDownload className="w-4 h-4" />}
            size="sm"
          >
            Exportar
          </Button>
        </div>
        
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white mb-1">{record.name}</h4>
                <p className="text-xs text-gray-400">DNI: {record.documentNumber}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                {record.status === 'aprobado' ? 'Aprobado' : 
                 record.status === 'pendiente' ? 'Pendiente' : 'Rechazado'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
              <div>
                <span className="font-medium">Fecha:</span> {record.uploadDate}
              </div>
              <div>
                <span className="font-medium">Establecimiento:</span> {record.establishment}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleRecordClick(record)}
                  className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-900/20"
                  title="Ver detalles"
                >
                  <FiEye className="w-4 h-4" />
                </button>
                
                {/* Admin actions */}
                {mode === 'admin' && showActions && (
                  <>
                    <button 
                      onClick={() => handleEdit(record)}
                      className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-900/20"
                      title="Editar"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    
                    {record.status === 'pendiente' && (
                      <>
                        <button 
                          onClick={() => handleApprove(record.id)}
                          className="text-green-400 hover:text-green-300 p-2 rounded-lg hover:bg-green-900/20"
                          title="Aprobar"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleReject(record.id)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20"
                          title="Rechazar"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    
                    <button 
                      onClick={() => handleDelete(record.id)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20"
                      title="Eliminar"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Help Icon - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg">
          <FiHelpCircle className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Record Details Modal */}
      <Dialog
        open={isRecordModalOpen}
        onOpenChange={setIsRecordModalOpen}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{`Detalles del Certificado - ${selectedRecord?.name}`}</Dialog.Title>
          </Dialog.Header>
        {selectedRecord && (
          <div className="space-y-6">
            <p className="text-gray-400 text-sm">
              Información completa del certificado de antecedentes penales.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
                  <p className="text-white font-semibold">{selectedRecord.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Número de Documento</label>
                  <p className="text-white font-semibold">{selectedRecord.documentNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Estado</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                    {selectedRecord.status === 'aprobado' ? 'Aprobado' : 
                     selectedRecord.status === 'pendiente' ? 'Pendiente' : 'Rechazado'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Fecha de Carga</label>
                  <p className="text-white font-semibold">{selectedRecord.uploadDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Establecimiento</label>
                  <p className="text-white font-semibold">{selectedRecord.establishment}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Ubicación</label>
                  <p className="text-white font-semibold">Manzana {selectedRecord.block} - Lote {selectedRecord.lot}</p>
                </div>
              </div>
            </div>

            {selectedRecord.comments && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Comentarios</label>
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{selectedRecord.comments}</p>
                </div>
              </div>
            )}

            <div className="flex space-x-4 pt-4">
              <Button
                variant="secondary"
                icon={<FiDownload className="w-4 h-4" />}
                className="flex-1"
              >
                Descargar PDF
              </Button>
              {selectedRecord.status === 'rechazado' && (
                <Button
                  variant="primary"
                  className="flex-1"
                >
                  Reenviar con Correcciones
                </Button>
              )}
            </div>
          </div>
        )}
        </Dialog.Content>
      </Dialog>

      {/* Edit Record Modal */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      >
        <Dialog.Content className="max-w-2xl">
          <Dialog.Header>
            <Dialog.Title>
              Editar Certificado Penal - {recordToEdit?.name}
            </Dialog.Title>
          </Dialog.Header>
          {recordToEdit && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Número de Documento
                  </label>
                  <input
                    type="text"
                    defaultValue={recordToEdit.documentNumber}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    defaultValue={recordToEdit.name}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Establecimiento
                  </label>
                  <input
                    type="text"
                    defaultValue={recordToEdit.establishment}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Estado
                  </label>
                  <select 
                    defaultValue={recordToEdit.status}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="aprobado">Aprobado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="rechazado">Rechazado</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Comentarios
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={recordToEdit.comments || ''}
                    placeholder="Agregar comentarios..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Reemplazar Certificado (Opcional)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Archivo actual: {recordToEdit.fileName}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  variant="secondary" 
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  variant="primary"
                  onClick={() => {
                    console.log('Guardando cambios...');
                    setIsEditModalOpen(false);
                  }}
                >
                  Guardar Cambios
                </Button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog>

      {/* Record Form Modal */}
      <CriminalRecordForm
        isOpen={isRecordFormOpen}
        onClose={() => setIsRecordFormOpen(false)}
        onSubmit={handleRecordFormSubmit}
      />
    </>
  );
} 

export default function CertificadosPenalesView(props: CertificadosPenalesViewProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CertificadosPenalesViewContent {...props} />
    </Suspense>
  );
}
