"use client";

import { CreditsView } from '@/components';

export default function CreditosPage() {
  return (
    <CreditsView 
      mode="establecimiento"
      title="Créditos"
      description="Administra tus créditos y consulta tu historial de transacciones"
      initialCredits={150}
      initialTotalInvested={85000}
      initialUsedThisMonth={15}
    />
  );
}
