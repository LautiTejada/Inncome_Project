"use client";

import { PolizasView } from '@/components';

export default function EstablishmentPoliciesPage() {
  return (
    <PolizasView
      mode="propietario"
      title="Mis Pólizas"
      description="Gestiona todas tus pólizas de seguro y coberturas"
      showActions={false}
      showStats={false}
      showTabs={false}
    />
  );
}
