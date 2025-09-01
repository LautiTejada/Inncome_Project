"use client";

import { AseguradosView } from '@/components';

interface Worker {
  id: string;
  name: string;
  dni: string;
  role: string;
  department: string;
  location: string;
  status: 'active' | 'inactive';
  insuranceTypes: string[];
  coverageSince: string;
  isEnabled: boolean;
}

interface Visit {
  id: string;
  name: string;
  dni: string;
  type: 'visit' | 'delivery';
  status: 'active' | 'finished';
  host: string;
  entryTime: string;
  date: string;
  description: string;
  contact?: string;
  exitTime?: string;
  company?: string;
}

export default function AseguradosAdminPage() {
  const handleWorkerEdit = (worker: Worker) => {
    console.log('Editar trabajador:', worker);
    // Aquí iría la lógica para editar
  };

  const handleWorkerDelete = (workerId: string) => {
    console.log('Eliminar trabajador:', workerId);
    // Aquí iría la lógica para eliminar
  };

  const handleVisitEdit = (visit: Visit) => {
    console.log('Editar visita:', visit);
    // Aquí iría la lógica para editar
  };

  const handleVisitDelete = (visitId: string) => {
    console.log('Eliminar visita:', visitId);
    // Aquí iría la lógica para eliminar
  };

  return (
    <AseguradosView 
      mode="admin"
      title="Gestión de Asegurados"
      description="Administra todos los asegurados del sistema con funcionalidades avanzadas"
      showActions={true}
      onWorkerEdit={handleWorkerEdit}
      onWorkerDelete={handleWorkerDelete}
      onVisitEdit={handleVisitEdit}
      onVisitDelete={handleVisitDelete}
    />
  );
}
