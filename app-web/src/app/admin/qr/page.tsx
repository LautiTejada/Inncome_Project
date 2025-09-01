"use client";

import React from 'react';
import { FiCode, FiPlus, FiTrendingUp } from 'react-icons/fi';
import { Card } from '@/components/shared';
import Link from 'next/link';

export default function QRPage() {
  const qrActions = [
    {
      title: 'QR',
      description: 'Gestión de todos los códigos QR del sistema',
      icon: FiCode,
      href: '/admin/qr/lista',
      color: 'blue' as const,
      stats: '9 códigos activos'
    },
    {
      title: 'Contrataciones QR',
      description: 'Ingresos y contrataciones de clubes',
      icon: FiTrendingUp,
      href: '/admin/qr/contrataciones',
      color: 'green' as const,
      stats: 'Ingresos Clubes'
    },
    {
      title: 'Crear QR',
      description: 'Registrar nuevos códigos QR',
      icon: FiPlus,
      href: '/admin/qr/crear',
      color: 'purple' as const,
      stats: 'Nuevo registro'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">QR</h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300">Gestión completa de códigos QR y contrataciones</p>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {qrActions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card
              className="h-full hover:scale-105 transition-transform duration-300 cursor-pointer group shadow-2xl hover:shadow-3xl"
              glowColor={action.color}
            >
              <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-${action.color}-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <action.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-${action.color}-400`} />
                  </div>
                  <div className={`text-xs sm:text-sm font-bold text-${action.color}-400 bg-${action.color}-500/10 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full border border-${action.color}-500/20`}>
                    {action.stats}
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                  {action.title}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-400 flex-1 leading-relaxed">
                  {action.description}
                </p>
                
                <div className="mt-4 sm:mt-6 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span className="text-sm sm:text-base font-semibold">Acceder</span>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform duration-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
