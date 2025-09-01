"use client";

import { CertificadosPenalesView } from '@/components';

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

export default function AnotacionesPenalesPage() {
  const handleRecordEdit = (record: CriminalRecord) => {
    console.log('Editar certificado:', record);
    // Aquí iría la lógica para editar
  };

  const handleRecordDelete = (recordId: string) => {
    console.log('Eliminar certificado:', recordId);
    // Aquí iría la lógica para eliminar
  };

  const handleRecordApprove = (recordId: string) => {
    console.log('Aprobar certificado:', recordId);
    // Aquí iría la lógica para aprobar
  };

  const handleRecordReject = (recordId: string, comments: string) => {
    console.log('Rechazar certificado:', recordId, 'Motivo:', comments);
    // Aquí iría la lógica para rechazar
  };

  return (
    <CertificadosPenalesView 
      mode="admin"
      title="Certificados Penales"
      description="Administra todos los certificados penales del sistema"
      showActions={true}
      onRecordEdit={handleRecordEdit}
      onRecordDelete={handleRecordDelete}
      onRecordApprove={handleRecordApprove}
      onRecordReject={handleRecordReject}
    />
  );
}
