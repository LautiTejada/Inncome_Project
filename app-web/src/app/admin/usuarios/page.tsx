"use client";

import { FiUsers, FiHome, FiShield, FiUserPlus, FiEdit, FiEye } from 'react-icons/fi';
import { UserCard, PageLayout } from '@/components';
import { ComponentType } from 'react';

type GlowColor = "blue" | "green" | "purple" | "red";

export default function UsuariosPage() {
  const navigationItems: Array<{
    title: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    href: string;
    color: GlowColor;
  }> = [
    {
      title: 'Usuarios General',
      description: 'Gestión de todos los usuarios del sistema',
      icon: FiUsers,
      href: '/admin/usuarios/general',
      color: 'blue'
    },
    {
      title: 'Usuarios Establecimiento',
      description: 'Usuarios de establecimientos comerciales',
      icon: FiHome,
      href: '/admin/usuarios/establecimiento',
      color: 'green'
    },
    {
      title: 'Usuarios Propietario',
      description: 'Usuarios propietarios de propiedades',
      icon: FiShield,
      href: '/admin/usuarios/propietario',
      color: 'purple'
    },
    {
      title: 'Usuarios Barrera',
      description: 'Usuarios del sistema de barreras',
      icon: FiEye,
      href: '/admin/usuarios/barrera',
      color: 'red'
    },
    {
      title: 'Usuarios No Propietarios',
      description: 'Usuarios sin propiedades asignadas',
      icon: FiEdit,
      href: '/admin/usuarios/no-propietarios',
      color: 'blue'
    },

  ];

  return (
    <PageLayout
      title="Gestión de Usuarios"
      description="Administra todos los usuarios del sistema desde un solo lugar"
    >
      {/* Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <UserCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={<Icon className="w-8 h-8 text-white" />}
              glowColor={item.color}
              href={item.href}
            />
          );
        })}
      </div>
    </PageLayout>
  );
}
