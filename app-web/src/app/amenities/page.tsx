"use client";

import { AmenitiesView } from '@/components';


interface TimeSlot {
    time: string;
    status: 'disponible' | 'no disponible';
}


export default function AmenitiesPage() {
  return (
    <AmenitiesView 
      mode="cliente"
      title="Amenities"
      description="Descubre y reserva los servicios disponibles en tu edificio"
      showReservations={true}
      showRatings={true}
    />
                   );
                 } 
