"use client";

import { CreditsView } from '@/components';

export default function CreditosPage() {
  return (
    <CreditsView 
      mode="cliente"
      title="Créditos"
      description="Administra tus créditos y consulta tu historial de transacciones"
      initialCredits={114}
      initialTotalInvested={70000}
      initialUsedThisMonth={10}
    />
  );
} 