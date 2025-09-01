"use client";

import { Sidebar, Header, MobileNavigation } from '@/components';
import { AppProvider } from '@/contexts/AppContext';
import { ModeProvider } from '@/contexts/ModeContext';

export default function EmpresaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <ModeProvider>
        <div className="flex h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute bottom-30 left-1/7 w-96 h-96 bg-gray-100/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-30 right-3/7 w-96 h-96 bg-gray-100/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-30 right-1/5 w-96 h-96 bg-gray-100/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-30 right-0 w-96 h-96 bg-gray-100/10 rounded-full blur-3xl"></div>

          {/* Left Sidebar - Modo Empresa (Solo Desktop) */}
          <Sidebar mode="empresa" />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative z-10">
            {/* Header - Modo Empresa */}
            <Header mode="empresa" />

            {/* Main Content */}
            <main className="flex-1 bg-transparent p-3 sm:p-4 lg:p-6 overflow-y-auto">
              {children}
            </main>
          </div>

          {/* Navegación Móvil */}
          <MobileNavigation mode="empresa" />
        </div>
      </ModeProvider>
    </AppProvider>
  );
}
