"use client";

import { FiUsers, FiFileText, FiShield, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Detectar si estamos en una vista individual
  const isIndividualView = pathname !== '/admin/gestion';

  const navigationItems = [
    {
      href: '/admin/gestion/asegurados',
      label: 'Mis Asegurados',
      icon: FiUsers,
      description: 'Gestión de asegurados del sistema'
    },
    {
      href: '/admin/gestion/anotaciones-penales',
      label: 'Anotaciones Penales',
      icon: FiFileText,
      description: 'Certificados penales y antecedentes'
    },
    {
      href: '/admin/gestion/polizas',
      label: 'Pólizas',
      icon: FiShield,
      description: 'Gestión de pólizas y coberturas'
    },

  ];

  // Si estamos en una vista individual, mostrar solo el contenido sin navegación
  if (isIndividualView) {
    return (
      <div className="w-full">
        {children}
      </div>
    );
  }

  // Si estamos en la vista principal de gestión, mostrar el nuevo orden visual
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Bienvenido al Panel de Gestión</h2>
        <p className="text-gray-400">Aquí puedes administrar todos los aspectos del sistema Inncome</p>
      </div>

      {/* Navigation Grid - Ahora debajo del header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <div className={`
                relative bg-gradient-to-b from-gray-950 via-blue-950 via-30% to-blue-950 
                backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-gray-900/50 
                border transition-all duration-300 hover:scale-105 cursor-pointer
                ${isActive 
                  ? 'border-blue-400/50 shadow-blue-500/20' 
                  : 'border-gray-700/50 hover:border-blue-400/30'
                }
              `}>
                {/* Glow effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-950 via-blue-800/30 via-30% to-gray-950 backdrop-blur-2xl rounded-3xl"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30 border border-blue-400/20 mx-auto">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.label}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Content from the page (stats and activities) */}
      <div className="bg-gradient-to-b from-gray-950 via-blue-950 via-30% to-blue-950 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-gray-900/50 border border-gray-700/50">
        {children}
      </div>
    </div>
  );
}
