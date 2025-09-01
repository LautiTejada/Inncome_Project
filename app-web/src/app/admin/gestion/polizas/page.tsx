"use client";

import { PolizasView } from '@/components';

interface Poliza {
  id: string;
  numero: string;
  tipo: string;
  asegurado: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  prima: number;
  cobertura: string;
  descripcion: string;
}

interface TrabajadorConPoliza {
  id: string;
  nombreApellido: string;
  documento: string;
  establecimiento: string;
  estado: 'activo' | 'inactivo';
}

export default function PolizasAdminPage() {
  const handlePolizaEdit = (poliza: Poliza) => {
    console.log('Editar póliza:', poliza);
    // Aquí iría la lógica para editar
  };

  const handlePolizaDelete = (polizaId: string) => {
    console.log('Eliminar póliza:', polizaId);
    // Aquí iría la lógica para eliminar
  };

  const handlePolizaActivate = (polizaId: string) => {
    console.log('Activar póliza:', polizaId);
    // Aquí iría la lógica para activar
  };

  const handlePolizaCancel = (polizaId: string) => {
    console.log('Cancelar póliza:', polizaId);
    // Aquí iría la lógica para cancelar
  };

  const handleTrabajadorEdit = (trabajador: TrabajadorConPoliza) => {
    console.log('Editar trabajador:', trabajador);
    // Aquí iría la lógica para editar trabajador
  };

  const handleTrabajadorToggle = (trabajadorId: string, estado: boolean) => {
    console.log('Cambiar estado trabajador:', trabajadorId, 'Estado:', estado);
    // Aquí iría la lógica para cambiar estado
  };

  return (
    <PolizasView 
      mode="admin"
      title="Gestión de Pólizas"
      description="Administra todas las pólizas del sistema con funcionalidades avanzadas"
      showActions={true}
      onPolizaEdit={handlePolizaEdit}
      onPolizaDelete={handlePolizaDelete}
      onPolizaActivate={handlePolizaActivate}
      onPolizaCancel={handlePolizaCancel}
      onTrabajadorEdit={handleTrabajadorEdit}
      onTrabajadorToggle={handleTrabajadorToggle}
    />
  );
}
