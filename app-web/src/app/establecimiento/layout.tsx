import type { Metadata } from 'next';
import { Sidebar, Header, MobileNavigation } from '@/components';

export const metadata: Metadata = {
  title: 'Establecimiento - Inncome',
  description: 'Panel de gestión para administradores del establecimiento',
};

export default function EstablishmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="flex">
        {/* Sidebar - Solo Desktop */}
        <Sidebar userType="establecimiento" />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col relative z-10">
          {/* Header */}
          <Header userType="establecimiento" />
          
          {/* Page Content */}
          <main className="flex-1 p-3 sm:p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Navegación Móvil */}
      <MobileNavigation userType="establecimiento" />
    </div>
  );
}
