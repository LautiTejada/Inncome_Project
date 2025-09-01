"use client";

import { PropietariosView } from '@/components';

export default function EstablishmentOwnersPage() {
  return (
    <PropietariosView 
      mode="establecimiento"
      title="Usuarios Propietario"
      description="Gestiona los propietarios de tu establecimiento"
      showActions={true}
    />
  );
}
