"use client";

import { Sidebar, Header, MobileNavigation } from '@/components';
import { AppProvider } from '@/contexts/AppContext';
import { ModeProvider } from '@/contexts/ModeContext';

export default function CertificadosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <ModeProvider>
        <div className="flex h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute bottom-30 left-1/7 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-30 right-3/7 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-30 right-1/5 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-30 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-gray-900/30"></div>

          {/* Left Sidebar - Modo Cliente */}
          <Sidebar mode="cliente" />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative z-10">
            {/* Header - Modo Cliente */}
            <Header mode="cliente" />

            {/* Main Content */}
            <main className="flex-1 bg-transparent p-3 sm:p-4 lg:p-6 overflow-y-auto">
              {children}
            </main>
          </div>

          {/* Navegación Móvil */}
          <MobileNavigation mode="cliente" />
        </div>
      </ModeProvider>
    </AppProvider>
  );
}
