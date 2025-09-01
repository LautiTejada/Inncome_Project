
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiShield, FiUsers, FiFileText, FiActivity, FiCreditCard, FiSettings, FiBarChart, FiPackage, FiCode } from 'react-icons/fi';
import Image from 'next/image';
import { useMode } from '@/contexts/ModeContext';


interface SidebarProps {
  className?: string;
  mode?: 'admin' | 'cliente' | 'empresa' | 'establecimiento';
  userType?: 'admin' | 'cliente' | 'empresa' | 'establecimiento';
}

// ...existing code...
const Sidebar: React.FC<SidebarProps> = ({ className = '', mode: propMode = 'cliente', userType }) => {
  const pathname = usePathname();
  const logo = '/assets/img/Mesa de trabajo 8.png';
  const { mode: contextMode } = useMode();

  // Usar el modo del contexto si está disponible, sino usar el prop o userType
  const currentMode = contextMode || propMode || userType || 'cliente';

  // Rutas para cada modo
  const navigationItemsCliente = [
    { icon: FiHome, label: 'Dashboard', href: '/dashboard', active: pathname === '/dashboard' },
    { icon: FiShield, label: 'Mis Asegurados', href: '/asegurados', active: pathname === '/asegurados' },
    { icon: FiUsers, label: 'Cobertura Particular', href: '/cobertura-particular', active: pathname === '/cobertura-particular' },
    { icon: FiFileText, label: 'Certificados', href: '/certificados', active: pathname === '/certificados' },
    { icon: FiActivity, label: 'Amenities', href: '/amenities', active: pathname === '/amenities' },
    { icon: FiCreditCard, label: 'Créditos', href: '/creditos', active: pathname === '/creditos' },
  ];

  const navigationItemsAdmin = [
    { icon: FiHome, label: 'Dashboard', href: '/admin', active: pathname === '/admin' },
    { icon: FiUsers, label: 'Gestión', href: '/admin/gestion', active: pathname.startsWith('/admin/gestion') },
    { icon: FiShield, label: 'Usuarios', href: '/admin/usuarios', active: pathname.startsWith('/admin/usuarios') },
    { icon: FiHome, label: 'Establecimientos', href: '/admin/establecimientos', active: pathname.startsWith('/admin/establecimientos') },
    { icon: FiPackage, label: 'Productos', href: '/admin/productos', active: pathname.startsWith('/admin/productos') },
    { icon: FiCreditCard, label: 'Créditos', href: '/admin/creditos', active: pathname === '/admin/creditos' },
    { icon: FiCode, label: 'QR', href: '/admin/qr', active: pathname.startsWith('/admin/qr') },
    { icon: FiBarChart, label: 'Gráficos', href: '/admin/graficos', active: pathname === '/admin/graficos' },
    { icon: FiSettings, label: 'Configuración', href: '/admin/configuracion', active: pathname === '/admin/configuracion' },
  ];

  const navigationItemsEmpresa = [
    { icon: FiHome, label: 'Dashboard', href: '/empresa', active: pathname === '/empresa' },
    // Puedes agregar más secciones exclusivas de empresa aquí
  ];

  const navigationItemsEstablecimiento = [
    { icon: FiHome, label: 'Dashboard', href: '/establecimiento', active: pathname === '/establecimiento' },
    { icon: FiCreditCard, label: 'Créditos', href: '/establecimiento/creditos', active: pathname.startsWith('/establecimiento/creditos') },
    { icon: FiUsers, label: 'Mis Asegurados', href: '/establecimiento/asegurados', active: pathname.startsWith('/establecimiento/asegurados') },
    { icon: FiShield, label: 'Pólizas', href: '/establecimiento/polizas', active: pathname.startsWith('/establecimiento/polizas') },
    { icon: FiFileText, label: 'Certificados Penales', href: '/establecimiento/certificados', active: pathname.startsWith('/establecimiento/certificados') },
    { icon: FiHome, label: 'Propietarios', href: '/establecimiento/propietarios', active: pathname.startsWith('/establecimiento/propietarios') },
    { icon: FiActivity, label: 'Amenities', href: '/establecimiento/amenities', active: pathname.startsWith('/establecimiento/amenities') },
  ];

  const navigationItemsBarrera = [
    { icon: FiHome, label: 'Dashboard', href: '/barrera', active: pathname === '/barrera' },
  ];

  // Función helper para determinar la ruta del logo
  const getLogoHref = (mode: string) => {
    switch (mode) {
      case 'admin':
        return '/admin';
      case 'empresa':
        return '/empresa';
      case 'establecimiento':
        return '/establecimiento';
      case 'barrera':
        return '/barrera';
      default:
        return '/dashboard';
    }
  };

  // Mapeo de modos a arrays de navegación
  const navigationMap = {
    admin: navigationItemsAdmin,
    empresa: navigationItemsEmpresa,
    establecimiento: navigationItemsEstablecimiento,
    barrera: navigationItemsBarrera,
    cliente: navigationItemsCliente,
  };

  const navigationItems = navigationMap[currentMode as keyof typeof navigationMap] || navigationItemsCliente;

  return (
    <div className={`hidden lg:block w-64 bg-gray-950/30 backdrop-blur-3xl border-r border-gray-800 relative z-10 ${className}`}>
      <div className="p-6 pl-2">
        {/* Logo */}
        <Link 
          href={getLogoHref(currentMode)}
          className="flex items-center mb-8 hover:opacity-80 transition-opacity"
        >
          <div className="w-20 h-20 relative">
            <Image
              src={logo}
              alt="Inncome Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <span className="text-white font-poppins font-semibold text-3xl -ml-1">Inncome</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                item.active
                  ? "text-white bg-gradient-to-l from-blue-500 via-blue-700 to-blue-900 shadow-lg shadow-blue-500/25"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}>
              {item.active ? (
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4" />
                </div>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>


    </div>
  );
};

export default Sidebar;
