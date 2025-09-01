"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AmenitiesView } from '@/components';

function AmenitiesPageContent() {
  const searchParams = useSearchParams();
  const formType = searchParams.get('form');

  return (
    <AmenitiesView 
      mode="establecimiento"
      title="Amenities"
      description="Gestiona los servicios y espacios disponibles en tu establecimiento"
      showReservations={false}
      showRatings={false}
      initialFormType={formType === 'new' ? 'create' : undefined}
    />
  );
}

export default function AmenitiesPage() {
  return (
    <Suspense fallback={<div className="text-white">Cargando...</div>}>
      <AmenitiesPageContent />
    </Suspense>
  );
}
