"use client";

import { useState, useEffect } from 'react';
import { FiUsers, FiPlus, FiFileText, FiAlertTriangle, FiDownload, FiShield, FiActivity, FiStar, FiCreditCard, FiAward, FiHome } from 'react-icons/fi';
import { DashboardCard, Button, AmenitiesCard, BarreraDashboard } from '@/components';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { useMode } from '@/contexts/ModeContext';
import { useNewFeatures } from '@/contexts/NewFeaturesContext';
import NewFeatureBadge from '@/components/shared/ui/NewFeatureBadge';

export default function DashboardContent() {
  const router = useRouter();
  const { state } = useApp();
  const { mode } = useMode();
  const { newFeatures, markFeatureAsSeen } = useNewFeatures();
  const userName = state.user?.name || 'Usuario';
  const [mounted, setMounted] = useState(false);

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div className="text-left space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Cargando...</h1>
        </div>
      </div>
    );
  }

  // Si es modo barrera, mostrar el dashboard específico
  if (mode === 'barrera') {
    return <BarreraDashboard />;
  }

  const handleCardAction = (href: string) => {
    if (href.startsWith('/')) {
      router.push(href);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header con saludo personalizado */}
      <div className="text-left space-y-2 sm:space-y-3">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">¡Hola, {userName}!</h1>
        <p className="text-gray-300 text-base sm:text-lg">Bienvenido a tu panel de control</p>
      </div>

      {/* Botones de acción integrados sin recuadro */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
        <Button
          variant="primary"
          size="lg"
          className="bg-[#06011A] hover:bg-[#0047bb] w-full sm:w-auto"
          icon={<FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />}>
          Descargar Certificados
        </Button>
        <Button
          variant="danger"
          size="lg"
          className="bg-red-950 hover:bg-red-900 w-full sm:w-auto"
          icon={<FiAlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />}>
          Tuve un Siniestro
        </Button>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-start">
        {/* Primera tarjeta - Gestión */}
        <DashboardCard
          title="Gestión"
          description="Acciones principales"
          glowColor="green"
          primaryButton={{ 
            text: 'Alta Nueva Visita', 
            href: '/asegurados?tab=visits&form=add',
            badge: newFeatures.altaNuevaVisita ? (
              <NewFeatureBadge 
                size="sm" 
                onClick={() => markFeatureAsSeen('altaNuevaVisita')}
              />
            ) : undefined
          }}
          secondaryButton={{ text: 'Alta Nueva Trabajador', href: '/asegurados?tab=workers&form=add' }}
          tertiaryButton={{ text: 'Créditos', href: '/creditos' }}
          icon={<FiUsers className="w-6 h-6 text-white" />}
        />
        
        {/* Segunda tarjeta - Mis Asegurados */}
        <DashboardCard
          title="Mis Asegurados"
          description="Ver mi cobertura actual"
          glowColor="blue"
          primaryButton={{ text: 'Mis Asegurados', href: '/asegurados' }}
          secondaryButton={{ text: 'Mis Ingresos', href: '/asegurados?tab=income' }}
          icon={<FiActivity className="w-6 h-6 text-white" />}
        />
        
        {/* Tercera tarjeta - Póliza Particular */}
        <DashboardCard
          title="Póliza Particular"
          description="Gestionar pólizas"
          glowColor="purple"
          primaryButton={{ text: 'Cargar Póliza', href: '/cobertura-particular?form=upload' }}
          secondaryButton={{ text: 'Ver Pólizas Cargadas', href: '/cobertura-particular' }}
          icon={<FiShield className="w-6 h-6 text-white" />}
        />
        
        {/* Cuarta tarjeta - Amenities (usando AmenitiesCard específico) */}
        <div className="relative">
          <AmenitiesCard />
          {newFeatures.amenitiesDashboard && (
            <div className="absolute -top-1 -right-1 z-10">
              <NewFeatureBadge 
                size="sm"
                onClick={() => markFeatureAsSeen('amenitiesDashboard')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
