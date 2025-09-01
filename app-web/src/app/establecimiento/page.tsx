"use client";

import { FiUsers, FiPlus, FiFileText, FiAlertTriangle, FiDownload, FiShield, FiCreditCard, FiHome, FiStar } from 'react-icons/fi';
import { DashboardCard, Button } from '@/components';
import { ESTABLISHMENT_DASHBOARD_CARDS } from '@/constants';

export default function EstablishmentDashboardPage() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">¡Hola, ESTABLECIMIENTO!</h1>
        <p className="text-sm sm:text-base text-gray-400">Panel de gestión para administradores del establecimiento</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
        <Button
          variant="danger"
          size="lg"
          className="bg-red-950 w-full sm:w-auto"
          icon={<FiAlertTriangle className="w-5 h-5" />}>
          <span className="hidden sm:inline">Reportar Siniestro</span>
          <span className="sm:hidden">Reportar</span>
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="bg-[#06011A] w-full sm:w-auto"
          icon={<FiDownload className="w-5 h-5" />}>
          <span className="hidden sm:inline">Descargar Documentos</span>
          <span className="sm:hidden">Descargar</span>
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Dashboard Cards */}
        {ESTABLISHMENT_DASHBOARD_CARDS.map((card, index) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            description={card.description}
            glowColor={card.glowColor}
            primaryButton={card.primaryButton}
            secondaryButton={card.secondaryButton}
            icon={
              index === 0 ? (
                <FiCreditCard className="w-6 h-6 text-white" />
              ) : index === 1 ? (
                <FiUsers className="w-6 h-6 text-white" />
              ) : index === 2 ? (
                <FiShield className="w-6 h-6 text-white" />
              ) : index === 3 ? (
                <FiHome className="w-6 h-6 text-white" />
              ) : (
                <FiStar className="w-6 h-6 text-white" />
              )
            }
          />
        ))}
      </div>
    </>
  );
}
