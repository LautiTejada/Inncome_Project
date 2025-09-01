"use client";

import { useMode } from '@/contexts/ModeContext';

export default function BarreraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBarrera } = useMode();

  // Solo mostrar el layout si estamos en modo barrera
  if (!isBarrera) {
    return <div className="text-white">Acceso no autorizado</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Contenido principal sin sidebar ni header para interfaz móvil */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
