"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiShield, FiUsers, FiFileText, FiActivity, FiCreditCard, FiSettings, FiBarChart, FiPackage, FiCode, FiX, FiMenu } from 'react-icons/fi';
import Image from 'next/image';
import { useMode } from '@/contexts/ModeContext';
import { useForm } from '@/contexts/FormContext';

interface MobileNavigationProps {
  className?: string;
  mode?: 'admin' | 'cliente' | 'empresa' | 'establecimiento' | 'barrera';
  userType?: 'admin' | 'cliente' | 'empresa' | 'establecimiento' | 'barrera';
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  className = '', 
  mode: propMode = 'cliente', 
  userType 
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { mode: contextMode } = useMode();
  const { isAnyFormOpen } = useForm();
  const [mounted, setMounted] = useState(false);

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Usar el modo del contexto si está disponible, sino usar el prop o userType
  const currentMode = contextMode || propMode || userType || 'cliente';

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
    { icon: FiCode, label: 'QR', href: '/admin/qr', active: pathname.startsWith('/admin/qr') },
    { icon: FiBarChart, label: 'Gráficos', href: '/admin/graficos', active: pathname === '/admin/graficos' },
    { icon: FiSettings, label: 'Configuración', href: '/admin/configuracion', active: pathname === '/admin/configuracion' },
  ];

  const navigationItemsEmpresa = [
    { icon: FiHome, label: 'Dashboard', href: '/empresa', active: pathname === '/empresa' },
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

  if (!mounted) return null;

  return (
    <>
      {/* Botón Hamburguesa - Solo visible en móvil y cuando no hay formularios abiertos */}
      {!isAnyFormOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg border border-blue-500/50 text-white transition-all duration-200 shadow-lg bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg"
          aria-label="Abrir menú de navegación"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      )}

      {/* Overlay del menú móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menú lateral móvil */}
      <div className={`
        fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gray-950/95 backdrop-blur-xl border-r border-gray-800 
        transform transition-transform duration-300 ease-in-out z-50 lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header del menú móvil */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link 
              href={getLogoHref(currentMode)}
              className="flex items-center hover:opacity-80 transition-opacity"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-12 h-12 relative">
                <Image
                  src="/assets/img/Mesa de trabajo 8.png"
                  alt="Inncome Logo"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>
              <span className="text-white font-poppins font-semibold text-xl ml-3">Inncome</span>
            </Link>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
              aria-label="Cerrar menú"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
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
                  <span className="text-base">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer del menú móvil */}
          <div className="p-4 border-t border-gray-800">
            <div className="text-center text-gray-400 text-sm">
              <p>Modo: {currentMode.charAt(0).toUpperCase() + currentMode.slice(1)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
