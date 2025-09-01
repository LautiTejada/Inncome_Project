"use client";

import { CertificadosPenalesView } from '@/components';

export default function CertificadosPage() {
  return (
    <CertificadosPenalesView 
      mode="propietario"
      title="Antecedentes Penales"
      description="Gestiona los certificados y antecedentes de tu personal"
      showActions={true}
    />
  );
}
