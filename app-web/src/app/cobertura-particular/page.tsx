"use client";

import { useState } from 'react';
import { FiShield, FiSearch, FiHelpCircle, FiDownload, FiUpload, FiEye, FiFileText, FiHome, FiHeart, FiTruck, FiEdit3 } from 'react-icons/fi';
import { Button, Dialog, CompactListbox, PolicyForm } from '@/components';
import { useMode } from '@/contexts/ModeContext';


interface Policy {
  id: string;
  name: string;
  type: 'automotor' | 'hogar' | 'vida' | 'comercial';
  company: string;
  policyNumber: string;
  coverage: string;
  expiration: string;
  status: 'aprobado' | 'en_revision' | 'desaprobado';
  monthlyPremium?: string;
  mainBeneficiary?: string;
  comments?: string;
}

interface PolicyFormData {
  policyNumber: string;
  insuranceCompany: string;
}

export default function CoberturaParticularPage() {
  const { isAdmin } = useMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isPolicyFormOpen, setIsPolicyFormOpen] = useState(false);

  
  // Handle policy form submission
  const handlePolicyFormSubmit = (policyData: PolicyFormData) => {
    console.log('Póliza cargada:', policyData);
    
    // Aquí puedes agregar la lógica para procesar la póliza
    // Por ejemplo, agregarla a la lista de policies existente
    const newPolicy: Policy = {
      id: `new-${Date.now()}`,
      name: `Póliza ${policyData.policyNumber}`,
      type: 'automotor', // Por defecto, se puede ajustar
      company: insuranceCompanies.find(c => c.value === policyData.insuranceCompany)?.label || 'Compañía no especificada',
      policyNumber: policyData.policyNumber,
      coverage: '$0', // Se puede calcular o pedir en el formulario
      expiration: new Date().toLocaleDateString('es-AR'),
      status: 'en_revision',
      monthlyPremium: '$0'
    };

    setPolicies(prev => [newPolicy, ...prev]);
    
    // Mostrar notificación de éxito
    alert('✅ Póliza cargada correctamente. Está en revisión.');
  };

  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: '1',
      name: 'Póliza Automotor',
      type: 'automotor',
      company: 'La Caja Seguros',
      policyNumber: 'LC-2024-001234',
      coverage: '$2.500.000',
      expiration: '30/12/2024',
      status: 'aprobado',
      monthlyPremium: '$4.500'
    },
    {
      id: '2',
      name: 'Seguro del Hogar',
      type: 'hogar',
      company: 'Federación Patronal',
      policyNumber: 'FP-2024-005678',
      coverage: '$5.000.000',
      expiration: '14/11/2024',
      status: 'en_revision',
      monthlyPremium: '$8.200'
    },
    {
      id: '3',
      name: 'Seguro de Vida',
      type: 'vida',
      company: 'Mercantil Andina',
      policyNumber: 'MA-2024-009876',
      coverage: '$1.000.000',
      expiration: '29/8/2024',
      status: 'desaprobado',
      monthlyPremium: '$3.800',
      comments: 'Rechazado por pre-existencias médicas no declaradas. Se requiere examen médico completo y certificado de salud actualizado.'
    }
  ]);

  // Options for dropdowns
  const insuranceCompanies = [
    { value: 'la-caja', label: 'La Caja Seguros' },
    { value: 'federacion-patronal', label: 'Federación Patronal' },
    { value: 'mercantil-andina', label: 'Mercantil Andina' },
    { value: 'sancor', label: 'Sancor Seguros' },
    { value: 'mapfre', label: 'Mapfre' },
    { value: 'allianz', label: 'Allianz' }
  ];



  // Filter options
  const filterOptions = [
    { value: 'all', label: 'Todas las pólizas' },
    { value: 'aprobado', label: 'Solo aprobadas' },
    { value: 'en_revision', label: 'En revisión' },
    { value: 'desaprobado', label: 'Desaprobadas' }
  ];



  const filteredPolicies = policies.filter(policy => {
    const term = searchTerm.toLowerCase().trim();
    
    // Search filter
    const searchMatch = !term || 
      policy.name.toLowerCase().includes(term) ||
      policy.company.toLowerCase().includes(term) ||
      policy.policyNumber.toLowerCase().includes(term) ||
      policy.type.toLowerCase().includes(term);
    
    // Status filter
    const statusMatch = selectedFilter === 'all' || policy.status === selectedFilter;
    
    return searchMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprobado':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'en_revision':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'desaprobado':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'automotor':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'hogar':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'vida':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'comercial':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'automotor':
        return <FiTruck className="w-5 h-5 text-blue-400" />;
      case 'hogar':
        return <FiHome className="w-5 h-5 text-green-400" />;
      case 'vida':
        return <FiHeart className="w-5 h-5 text-purple-400" />;
      case 'comercial':
        return <FiFileText className="w-5 h-5 text-orange-400" />;
      default:
        return <FiShield className="w-5 h-5 text-gray-400" />;
    }
  };

  const handlePolicyClick = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsPolicyModalOpen(true);
  };



  return (
    <>
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Cobertura Particular</h1>
              <p className="text-gray-400 text-lg">
                Configura tus seguros personales y familiares
              </p>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, compañía o número de póliza..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <CompactListbox
                options={filterOptions}
                value={{ value: selectedFilter, label: filterOptions.find(f => f.value === selectedFilter)?.label || 'Todas las pólizas' }}
                onChange={(value) => setSelectedFilter(value.value)}
                placeholder="Filtrar por estado"
                className="w-48"
              />
              

              
              <Button
                variant="primary"
                icon={<FiUpload className="w-4 h-4" />}
                onClick={() => setIsPolicyFormOpen(true)}
              >
                Cargar Póliza
              </Button>
            </div>

            {/* Policies List */}
            <div className="space-y-2">
              {filteredPolicies.map((policy) => (
                <div 
                  key={policy.id} 
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 hover:bg-gray-800/70 transition-colors cursor-pointer"
                  onClick={() => handlePolicyClick(policy)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600/20 p-2 rounded-lg flex-shrink-0">
                      {getTypeIcon(policy.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-semibold text-white">{policy.name}</h3>
                          <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(policy.type)}`}>
                            {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)}
                          </span>
                        </div>
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                          {policy.status === 'aprobado' ? 'Aprobado' : 
                           policy.status === 'en_revision' ? 'En Revisión' : 'Desaprobado'}
                        </span>
                      </div>
                      <div className="text-gray-400 text-xs space-y-0.5">
                        <p className="truncate">Compañía: {policy.company}</p>
                        <p className="truncate">Nº Póliza: {policy.policyNumber}</p>
                        <p className="truncate">Cobertura: {policy.coverage}</p>
                        <p className="truncate">Vencimiento: {policy.expiration}</p>
                      </div>
                      {policy.status === 'desaprobado' && policy.comments && (
                        <button 
                          className="text-red-400 text-xs hover:text-red-300 transition-colors mt-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePolicyClick(policy);
                          }}
                        >
                          Ver comentarios para más detalles
                        </button>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <FiEye className="w-4 h-4 text-gray-400" />
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

            {/* Policy Details Modal */}
            <Dialog
              open={isPolicyModalOpen}
              onOpenChange={setIsPolicyModalOpen}
            >
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>{`Detalles de Póliza - ${selectedPolicy?.name}`}</Dialog.Title>
                </Dialog.Header>
              {selectedPolicy && (
                <div className="space-y-6">
                  <p className="text-gray-400 text-sm">
                    Información completa de la póliza incluyendo estado, cobertura y comentarios si los hay.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Compañía Aseguradora</label>
                        <p className="text-white font-semibold">{selectedPolicy.company}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Tipo de Seguro</label>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedPolicy.type)}`}>
                          {selectedPolicy.type.charAt(0).toUpperCase() + selectedPolicy.type.slice(1)}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Monto de Cobertura</label>
                        <p className="text-white font-semibold">{selectedPolicy.coverage}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Número de Póliza</label>
                        <p className="text-white font-semibold">{selectedPolicy.policyNumber}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Estado</label>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPolicy.status)}`}>
                          {selectedPolicy.status === 'aprobado' ? 'Aprobado' : 
                           selectedPolicy.status === 'en_revision' ? 'En Revisión' : 'Desaprobado'}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Fecha de Vencimiento</label>
                        <p className="text-white font-semibold">{selectedPolicy.expiration}</p>
                      </div>
                    </div>
                  </div>

                  {selectedPolicy.comments && (
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Comentarios</label>
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 text-sm">{selectedPolicy.comments}</p>
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
                    {selectedPolicy.status === 'desaprobado' && (
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

            {/* Policy Form Modal */}
            <PolicyForm
              isOpen={isPolicyFormOpen}
              onClose={() => setIsPolicyFormOpen(false)}
              onSubmit={handlePolicyFormSubmit}
            />


          </>
        );
      } 