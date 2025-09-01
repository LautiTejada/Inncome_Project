"use client";

import { AseguradosView } from '@/components';

export default function AseguradosPage() {
  return (
    <AseguradosView 
      mode="propietario"
      title="Mis Asegurados"
      description="Gestiona tus empleados asegurados, sus ingresos y controla visitantes"
      showActions={false}
    />
  );
} 