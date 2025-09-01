"use client";

import { useMode } from '@/contexts/ModeContext';
import { BarreraDashboard } from '@/components';
import DashboardContent from './DashboardContent';

export default function DashboardPage() {
  const { mode } = useMode();

  // Si es modo barrera, mostrar el dashboard específico
  if (mode === 'barrera') {
    return <BarreraDashboard />;
  }

  // Para otros modos, mostrar el contenido dinámico
  return <DashboardContent />;
}

