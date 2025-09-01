"use client";

import { useEffect, useState } from 'react';
import { FiSearch, FiHelpCircle, FiFileText, FiCalendar, FiMapPin, FiUsers, FiStar, FiClock, FiCheck, FiX } from 'react-icons/fi';
import { Button, Dialog, CompactListbox, DatePicker, AmenityForm, ImageCarousel } from '@/components';
import type { AmenityFormData } from './ui/AmenityForm';

export interface Amenity {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  status: 'disponible' | 'ocupado' | 'mantenimiento' | 'desactivado';
  location: string;
  // Sistema de turnos para establecimiento
  shifts: {
    monday: { isOpen: boolean; shifts: string[] };
    tuesday: { isOpen: boolean; shifts: string[] };
    wednesday: { isOpen: boolean; shifts: string[] };
    thursday: { isOpen: boolean; shifts: string[] };
    friday: { isOpen: boolean; shifts: string[] };
    saturday: { isOpen: boolean; shifts: string[] };
    sunday: { isOpen: boolean; shifts: string[] };
  };
  // Horarios predefinidos para cliente (opcional, para compatibilidad)
  schedule?: {
    monday: { open: string; close: string; availableSlots: string[] };
    tuesday: { open: string; close: string; availableSlots: string[] };
    wednesday: { open: string; close: string; availableSlots: string[] };
    thursday: { open: string; close: string; availableSlots: string[] };
    friday: { open: string; close: string; availableSlots: string[] };
    saturday: { open: string; close: string; availableSlots: string[] };
    sunday: { open: string; close: string; availableSlots: string[] };
  };
  capacity: number;
  images: string[]; // Array de URLs de imágenes del amenity
  features: string[];
  price: number;
  // Nuevos campos para servicios adicionales
  cleaningService: {
    enabled: boolean;
    price: number;
    description: string;
  };
  penalty: {
    enabled: boolean;
    amount: number;
    description: string;
  };
}

interface TimeSlot {
    time: string;
    status: 'disponible' | 'no disponible';
  }

interface AmenitiesViewProps {
  mode?: 'cliente' | 'establecimiento';
  title?: string;
  description?: string;
  showReservations?: boolean;
  showRatings?: boolean;
  initialFormType?: 'create' | 'edit';
}

export default function AmenitiesView({
  mode = 'cliente',
  title = 'Amenities',
  description = 'Descubre y reserva los servicios disponibles en tu edificio',
  showReservations = true,
  showRatings = true,
  initialFormType
}: AmenitiesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isNewReservationModalOpen, setIsNewReservationModalOpen] = useState(false);
  const [isCreateAmenityModalOpen, setIsCreateAmenityModalOpen] = useState(false);
  const [isEditAmenityModalOpen, setIsEditAmenityModalOpen] = useState(false);
  
  // Nuevo estado para la amenidad que se muestra en el modal de detalles
  const [amenityForModal, setAmenityForModal] = useState<Amenity | null>(null);
  const [amenityToEdit, setAmenityToEdit] = useState<Amenity | null>(null);

  // Reservation form state
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    people: 1,
    notes: '',
    isInsured: false
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>(undefined);
  const [secure] = useState(1300);

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  
  // useEffect para manejar la animación del botón cuando cambia el amenity seleccionado
  useEffect(() => {
    if (selectedAmenity) {
      // Ocultar el botón para que la animación se reinicie
      setIsButtonVisible(false);
      // Pequeño retraso para que React aplique el nuevo estado antes de animar
      const timer = setTimeout(() => {
        setIsButtonVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsButtonVisible(false);
    }
  }, [selectedAmenity]);

  const [amenities, setAmenities] = useState<Amenity[]>([
    {
      id: '1',
      name: 'Piscina Principal',
      category: 'Recreación',
      description: 'Piscina climatizada de 25 metros con vista panorámica de la ciudad',
      rating: 4.2,
      status: 'disponible',
      location: 'Piso 5',
      shifts: {
        monday: { isOpen: true, shifts: ['06:00 - 08:00', '08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00'] },
        tuesday: { isOpen: true, shifts: ['06:00 - 08:00', '08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00'] },
        wednesday: { isOpen: true, shifts: ['06:00 - 08:00', '08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00'] },
        thursday: { isOpen: true, shifts: ['06:00 - 08:00', '08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00'] },
        friday: { isOpen: true, shifts: ['06:00 - 08:00', '08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00'] },
        saturday: { isOpen: true, shifts: ['06:00 - 08:00', '08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00'] },
        sunday: { isOpen: true, shifts: ['06:00 - 08:00', '08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00'] },
      },
      schedule: {
        monday: { open: '06:00', close: '22:00', availableSlots: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'] },
        tuesday: { open: '06:00', close: '22:00', availableSlots: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'] },
        wednesday: { open: '06:00', close: '22:00', availableSlots: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'] },
        thursday: { open: '06:00', close: '22:00', availableSlots: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'] },
        friday: { open: '06:00', close: '22:00', availableSlots: ['06:00', '08:00', '12:00', '14:00', '16:00', '18:00', '20:00'] },
        saturday: { open: '06:00', close: '22:00', availableSlots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] },
        sunday: { open: '06:00', close: '22:00', availableSlots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] }
      },
      capacity: 30,
      images: ['/images/amenities/piscina.jpg', '/images/amenities/piscina-2.jpg'],
      features: ['Climatizada', 'Vista panorámica', 'Vestuarios', 'Ducha', 'Salvavidas'],
      price: 2000,
      cleaningService: {
        enabled: true,
        price: 500,
        description: 'Limpieza post-uso y desinfección de la piscina'
      },
      penalty: {
        enabled: true,
        amount: 1000,
        description: 'Por no respetar horarios o causar daños'
      }
    },
    {
      id: '2',
      name: 'Gimnasio',
      category: 'Fitness',
      description: 'Gimnasio completamente equipado con máquinas de última generación',
      rating: 4.7,
      status: 'ocupado',
      location: 'Piso 2',
      shifts: {
        monday: { isOpen: true, shifts: ['05:00 - 07:00', '07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        tuesday: { isOpen: true, shifts: ['05:00 - 07:00', '07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        wednesday: { isOpen: true, shifts: ['05:00 - 07:00', '07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        thursday: { isOpen: true, shifts: ['05:00 - 07:00', '07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        friday: { isOpen: true, shifts: ['05:00 - 07:00', '07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        saturday: { isOpen: true, shifts: ['05:00 - 07:00', '07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        sunday: { isOpen: true, shifts: ['05:00 - 07:00', '07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
      },
      schedule: {
        monday: { open: '05:00', close: '23:00', availableSlots: ['05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        tuesday: { open: '05:00', close: '23:00', availableSlots: ['05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        wednesday: { open: '05:00', close: '23:00', availableSlots: ['05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        thursday: { open: '05:00', close: '23:00', availableSlots: ['05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        friday: { open: '05:00', close: '23:00', availableSlots: ['05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        saturday: { open: '05:00', close: '23:00', availableSlots: ['05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        sunday: { open: '05:00', close: '23:00', availableSlots: ['05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] }
      },
      capacity: 20,
      images: ['/images/amenities/gimnasio.jpg', '/images/amenities/gimnasio-2.jpg'],
      features: ['Máquinas cardio', 'Pesas libres', 'Sala de yoga', 'Instructor disponible'],
      price: 3000,
      cleaningService: {
        enabled: true,
        price: 300,
        description: 'Limpieza diaria del gimnasio y equipos'
      },
      penalty: {
        enabled: true,
        amount: 800,
        description: 'Por no respetar las reglas del gimnasio'
      }
    },
    {
      id: '3',
      name: 'Estacionamiento',
      category: 'Servicios',
      description: 'Estacionamiento cubierto con vigilancia 24hs y cámaras de seguridad',
      rating: 3.8,
      status: 'disponible',
      location: 'Subsuelo',
      shifts: {
        monday: { isOpen: true, shifts: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00'] },
        tuesday: { isOpen: true, shifts: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00'] },
        wednesday: { isOpen: true, shifts: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00'] },
        thursday: { isOpen: true, shifts: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00'] },
        friday: { isOpen: true, shifts: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00'] },
        saturday: { isOpen: true, shifts: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00'] },
        sunday: { isOpen: true, shifts: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00'] },
      },
      schedule: {
        monday: { open: '00:00', close: '24:00', availableSlots: ['00:00', '06:00', '12:00', '18:00'] },
        tuesday: { open: '00:00', close: '24:00', availableSlots: ['00:00', '06:00', '12:00', '18:00'] },
        wednesday: { open: '00:00', close: '24:00', availableSlots: ['00:00', '06:00', '12:00', '18:00'] },
        thursday: { open: '00:00', close: '24:00', availableSlots: ['00:00', '06:00', '12:00', '18:00'] },
        friday: { open: '00:00', close: '24:00', availableSlots: ['00:00', '06:00', '12:00', '18:00'] },
        saturday: { open: '00:00', close: '24:00', availableSlots: ['00:00', '06:00', '12:00', '18:00'] },
        sunday: { open: '00:00', close: '24:00', availableSlots: ['00:00', '06:00', '12:00', '18:00'] }
      },
      capacity: 100,
      images: ['/images/amenities/estacionamiento.jpg'],
      features: ['Vigilancia 24hs', 'Cámaras de seguridad', 'Acceso controlado'],
      price: 3500,
      cleaningService: {
        enabled: false,
        price: 0,
        description: ''
      },
      penalty: {
        enabled: true,
        amount: 1500,
        description: 'Por estacionar en lugar incorrecto o bloquear salidas'
      }
    },
    {
      id: '4',
      name: 'Sala de Coworking',
      category: 'Trabajo',
      description: 'Espacio de trabajo colaborativo con wifi de alta velocidad y ambiente moderno',
      rating: 4.5,
      status: 'disponible',
      location: 'Piso 3',
      shifts: {
        monday: { isOpen: true, shifts: ['07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00'] },
        tuesday: { isOpen: true, shifts: ['07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00'] },
        wednesday: { isOpen: true, shifts: ['07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00'] },
        thursday: { isOpen: true, shifts: ['07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00'] },
        friday: { isOpen: true, shifts: ['07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00'] },
        saturday: { isOpen: true, shifts: ['07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00'] },
        sunday: { isOpen: true, shifts: ['07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00'] },
      },
      schedule: {
        monday: { open: '07:00', close: '21:00', availableSlots: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'] },
        tuesday: { open: '07:00', close: '21:00', availableSlots: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'] },
        wednesday: { open: '07:00', close: '21:00', availableSlots: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'] },
        thursday: { open: '07:00', close: '21:00', availableSlots: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'] },
        friday: { open: '07:00', close: '21:00', availableSlots: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'] },
        saturday: { open: '07:00', close: '21:00', availableSlots: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'] },
        sunday: { open: '07:00', close: '21:00', availableSlots: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'] }
      },
      capacity: 25,
      images: ['/images/amenities/sala-reuniones.jpg', '/images/amenities/sala-reuniones-2.jpg'],
      features: ['WiFi alta velocidad', 'Impresora', 'Sala de reuniones', 'Café gratuito'],
      price: 1800,
      cleaningService: {
        enabled: true,
        price: 200,
        description: 'Limpieza del espacio de trabajo y equipos'
      },
      penalty: {
        enabled: false,
        amount: 0,
        description: ''
      }
    },
    {
      id: '5',
      name: 'Cafetería',
      category: 'Gastronomía',
      description: 'Cafetería con variedad de opciones gastronómicas y ambiente acogedor',
      rating: 4.1,
      status: 'mantenimiento',
      location: 'Piso 1',
      shifts: {
        monday: { isOpen: true, shifts: ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
        tuesday: { isOpen: true, shifts: ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
        wednesday: { isOpen: true, shifts: ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
        thursday: { isOpen: true, shifts: ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
        friday: { isOpen: true, shifts: ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
        saturday: { isOpen: true, shifts: ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
        sunday: { isOpen: true, shifts: ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
      },
      schedule: {
        monday: { open: '08:00', close: '20:00', availableSlots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] },
        tuesday: { open: '08:00', close: '20:00', availableSlots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] },
        wednesday: { open: '08:00', close: '20:00', availableSlots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] },
        thursday: { open: '08:00', close: '20:00', availableSlots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] },
        friday: { open: '08:00', close: '20:00', availableSlots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] },
        saturday: { open: '08:00', close: '20:00', availableSlots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] },
        sunday: { open: '08:00', close: '20:00', availableSlots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] }
      },
      capacity: 40,
      images: ['/images/amenities/cafe.jpg', '/images/amenities/cafe-2.jpg'],
      features: ['Café de especialidad', 'Snacks saludables', 'Terraza', 'WiFi'],
      price: 1200,
      cleaningService: {
        enabled: true,
        price: 400,
        description: 'Limpieza de la cafetería y cocina'
      },
      penalty: {
        enabled: true,
        amount: 600,
        description: 'Por no respetar el orden o causar daños'
      }
    },
    {
      id: '6',
      name: 'Salón de Eventos',
      category: 'Eventos',
      description: 'Salón elegante para eventos privados con servicio de catering disponible',
      rating: 4.8,
      status: 'disponible',
      location: 'Piso 4',
      shifts: {
        monday: { isOpen: true, shifts: ['09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        tuesday: { isOpen: true, shifts: ['09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        wednesday: { isOpen: true, shifts: ['09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        thursday: { isOpen: true, shifts: ['09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        friday: { isOpen: true, shifts: ['09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        saturday: { isOpen: true, shifts: ['09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
        sunday: { isOpen: true, shifts: ['09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'] },
      },
      schedule: {
        monday: { open: '09:00', close: '23:00', availableSlots: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        tuesday: { open: '09:00', close: '23:00', availableSlots: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        wednesday: { open: '09:00', close: '23:00', availableSlots: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        thursday: { open: '09:00', close: '23:00', availableSlots: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        friday: { open: '09:00', close: '23:00', availableSlots: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        saturday: { open: '09:00', close: '23:00', availableSlots: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
        sunday: { open: '09:00', close: '23:00', availableSlots: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] }
      },
      capacity: 80,
      images: ['/images/amenities/salon-eventos.jpg', '/images/amenities/salon-eventos-2.jpg'],
      features: ['Catering disponible', 'Equipo de sonido', 'Proyector', 'Decoración'],
      price: 2300,
      cleaningService: {
        enabled: true,
        price: 800,
        description: 'Limpieza completa post-evento del salón'
      },
      penalty: {
        enabled: true,
        amount: 2000,
        description: 'Por daños al salón o equipos durante el evento'
      }
    }
  ]);

  // Filter options
  const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'Recreación', label: 'Recreación' },
    { value: 'Fitness', label: 'Fitness' },
    { value: 'Servicios', label: 'Servicios' },
    { value: 'Trabajo', label: 'Trabajo' },
    { value: 'Gastronomía', label: 'Gastronomía' },
    { value: 'Eventos', label: 'Eventos' }
  ];

  const filteredAmenities = amenities.filter(amenity => {
    const term = searchTerm.toLowerCase().trim();
    
    // Search filter
    const searchMatch = !term || 
      amenity.name.toLowerCase().includes(term) ||
      amenity.description.toLowerCase().includes(term) ||
      amenity.category.toLowerCase().includes(term);
    
    // Category filter
    const categoryMatch = selectedCategory === 'all' || amenity.category === selectedCategory;
    
    return searchMatch && categoryMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponible':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ocupado':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'mantenimiento':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'desactivado':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Recreación':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Fitness':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Servicios':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Trabajo':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Gastronomía':
        return 'bg-orange-500/20 text-orange-400 border-orange-400/30';
      case 'Eventos':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Función para mostrar horarios de manera visual
  const renderScheduleSummary = (shifts: Amenity['shifts'], amenity?: Amenity) => {
    // Para modo cliente, mostrar horarios originales si están disponibles
    if (mode === 'cliente' && amenity?.schedule) {
      const openDays = Object.entries(amenity.schedule).filter(([, hours]) => 
        hours.open !== '' && hours.close !== ''
      );
      
      if (openDays.length === 0) return <span className="text-red-400 text-xs">Cerrado</span>;
      
      if (openDays.length === 7) {
        return <span className="text-[#0047bb] text-xs">Todos los días</span>;
      }
      
      // Días específicos
      const dayLabels = openDays.map(([day, ]) => {
        const dayMap: Record<string, string> = {
          monday: 'Lun',
          tuesday: 'Mar',
          wednesday: 'Mié',
          thursday: 'Jue',
          friday: 'Vie',
          saturday: 'Sáb',
          sunday: 'Dom'
        };
        return dayMap[day];
      });
      
      return <span className="text-blue-400 text-xs">{dayLabels.join(', ')}</span>;
    }
    
    // Para modo establecimiento, usar el sistema de turnos
    const openDays = Object.entries(shifts).filter(([, day]) => day.isOpen);
    
    if (openDays.length === 0) return <span className="text-red-400 text-xs">Cerrado</span>;
    
    if (openDays.length === 7) {
      const firstDay = openDays[0][1];
      if (firstDay.shifts.length > 0) {
        return <span className="text-[#0047bb] text-xs">Todos los días</span>;
      }
      return <span className="text-[#0047bb] text-xs">Todos los días</span>;
    }
    
    // Días específicos
    const dayLabels = openDays.map(([day, ]) => {
      const dayMap: Record<string, string> = {
        monday: 'Lun',
        tuesday: 'Mar',
        wednesday: 'Mié',
        thursday: 'Jue',
        friday: 'Vie',
        saturday: 'Sáb',
        sunday: 'Dom'
      };
      return dayMap[day];
    });
    
    return <span className="text-blue-400 text-xs">{dayLabels.join(', ')}</span>;
  };

  // Función para mostrar horarios detallados por día
  const renderDetailedSchedule = (shifts: Amenity['shifts'], amenity?: Amenity) => {
    const days = [
      { key: 'monday', label: 'Lunes' },
      { key: 'tuesday', label: 'Martes' },
      { key: 'wednesday', label: 'Miércoles' },
      { key: 'thursday', label: 'Jueves' },
      { key: 'friday', label: 'Viernes' },
      { key: 'saturday', label: 'Sábado' },
      { key: 'sunday', label: 'Domingo' }
    ] as const;

    // Para modo cliente, mostrar horarios originales si están disponibles
    if (mode === 'cliente' && amenity?.schedule) {
      return (
        <div className="space-y-2">
          {days.map(({ key, label }) => {
            const daySchedule = amenity.schedule![key];
            const isOpen = daySchedule.open !== '' && daySchedule.close !== '';
            return (
              <div key={key} className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{label}:</span>
                {isOpen ? (
                  <span className="text-white font-medium">
                    {daySchedule.open} - {daySchedule.close}
                  </span>
                ) : (
                  <span className="text-red-400">Cerrado</span>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Para modo establecimiento, usar el sistema de turnos
    return (
      <div className="space-y-2">
        {days.map(({ key, label }) => {
          const dayShifts = shifts[key];
          return (
            <div key={key} className="flex justify-between items-center text-sm">
              <span className="text-gray-400">{label}:</span>
              {dayShifts.isOpen ? (
                <span className="text-white font-medium">
                  {dayShifts.shifts.length > 0 ? dayShifts.shifts.join(', ') : 'Sin turnos'}
                </span>
              ) : (
                <span className="text-red-400">Cerrado</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const handleAmenityClick = (amenity: Amenity) => {
    setIsDetailsModalOpen(true);
    setAmenityForModal(amenity);
  };
  
  // Funciones de administración para establecimiento
  const handleCreateAmenity = () => {
    setIsCreateAmenityModalOpen(true);
  };

  const handleEditAmenity = (amenity: Amenity) => {
    setAmenityToEdit(amenity);
    setIsEditAmenityModalOpen(true);
  };

  const handleToggleAmenityStatus = (amenity: Amenity) => {
    const newStatus = amenity.status === 'disponible' ? 'desactivado' : 'disponible';
    setAmenities(prev => prev.map(a => 
      a.id === amenity.id ? { ...a, status: newStatus } : a
    ));
  };

  const handleDeleteAmenity = (amenity: Amenity) => {
    if (confirm(`¿Estás seguro de que quieres eliminar "${amenity.name}"? Esta acción no se puede deshacer.`)) {
      setAmenities(prev => prev.filter(a => a.id !== amenity.id));
    }
  };

  const handleSaveAmenity = (amenityData: AmenityFormData) => {
    if (amenityToEdit) {
      // Editar amenity existente
      setAmenities(prev => prev.map(a => 
        a.id === amenityToEdit.id ? { ...amenityData, id: amenityToEdit.id } : a
      ));
      setIsEditAmenityModalOpen(false);
      setAmenityToEdit(null);
    } else {
      // Crear nuevo amenity
      const newAmenity: Amenity = {
        ...amenityData,
        id: Date.now().toString(), // ID temporal
      };
      setAmenities(prev => [...prev, newAmenity]);
      setIsCreateAmenityModalOpen(false);
    }
  };

  // New function to select/deselect an amenity card
  const handleSelectAmenityForReservation = (amenity: Amenity) => {
    if (!showReservations) return;
    
    // Si se hace clic en la misma tarjeta, la deselecciona
    if (selectedAmenity?.id === amenity.id) {
      setSelectedAmenity(null);
    } else {
      // Si ya hay un amenity seleccionado, lo deseleccionamos primero para reiniciar la animación
      if (selectedAmenity) {
        setSelectedAmenity(null);
        // Usamos un pequeño retraso para que la animación de "ocultar" se complete
        setTimeout(() => {
          setSelectedAmenity(amenity);
        }, 100);
      } else {
        // Si no hay ninguno seleccionado, simplemente seleccionamos el nuevo
        setSelectedAmenity(amenity);
      }
    }
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
    setReservationData(prev => ({ ...prev, time }));
  };

  // Generate available time slots based on amenity hours
  const getAvailableTimeSlots = (
    amenity: Amenity,
    selectedDate: Date | null
  ): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const now: Date = new Date();

    // Condición para deshabilitar también la siguiente hora
    const nowPlusOneHour: Date = new Date(now.getTime() + 60 * 60 * 1000);

    if (!selectedDate) {
      return [];
    }

    const isSelectedDateToday: boolean =
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate();

    // Función auxiliar para generar y verificar los slots
    const generateSlots = (
      startHour: number,
      endHour: number,
      step: number = 1
    ): void => {
      for (let hour = startHour; hour < endHour; hour += step) {
        const slotTime: Date = new Date(selectedDate);
        slotTime.setHours(hour, 0, 0, 0);

        const status: TimeSlot['status'] =
          isSelectedDateToday && slotTime.getTime() < nowPlusOneHour.getTime()
            ? 'no disponible'
            : 'disponible';

        slots.push({ time: `${hour.toString().padStart(2, '0')}:00`, status });
      }
    };

    // Para modo cliente, usar slots predefinidos si están disponibles
    if (mode === 'cliente' && amenity.schedule) {
      const dayOfWeek = selectedDate
        ? [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
          ][selectedDate.getDay()]
        : undefined;

      if (dayOfWeek) {
        const daySchedule = amenity.schedule[dayOfWeek as keyof typeof amenity.schedule];
        if (daySchedule.availableSlots && daySchedule.availableSlots.length > 0) {
          // Usar los slots predefinidos del día
          daySchedule.availableSlots.forEach(slotTime => {
            const [hourStr] = slotTime.split(':');
            const hour: number = parseInt(hourStr);
            const slotTimeDate: Date = new Date(selectedDate);
            slotTimeDate.setHours(hour, 0, 0, 0);

            const status: TimeSlot['status'] =
              isSelectedDateToday && slotTimeDate.getTime() < nowPlusOneHour.getTime()
                ? 'no disponible'
                : 'disponible';

            slots.push({ time: slotTime, status });
          });
          return slots;
        }
      }
      
      // Si no hay slots predefinidos, usar horarios por defecto
      generateSlots(9, 19);
      return slots;
    }

    // Handle special case: all days open with shifts
    const isAllDaysOpen =
      Object.values(amenity.shifts).every(
        (day) => day.isOpen && day.shifts.length > 0
      );

    if (isAllDaysOpen) {
      // Generate slots based on available shifts
      const allShifts = Object.values(amenity.shifts)
        .flatMap(day => day.shifts)
        .filter((shift, index, arr) => arr.indexOf(shift) === index); // Remove duplicates
      
      allShifts.forEach(shift => {
        const [startTime] = shift.split(' - ');
        slots.push({ time: startTime, status: 'disponible' });
      });
    } else {
      // Find the selected day of week
      const dayOfWeek = selectedDate
        ? [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
          ][selectedDate.getDay()]
        : undefined;

      const dayShifts = dayOfWeek ? amenity.shifts[dayOfWeek as keyof typeof amenity.shifts] : undefined;

      if (dayShifts && dayShifts.isOpen && dayShifts.shifts.length > 0) {
        // Generate slots based on available shifts for the selected day
        dayShifts.shifts.forEach(shift => {
          const [startTime] = shift.split(' - ');
          slots.push({ time: startTime, status: 'disponible' });
        });
      } else {
        // Default slots if closed or no shifts
        const defaultHours: string[] = [
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
        ];
        defaultHours.forEach((time: string) => {
          const [hourStr] = time.split(':');
          const hour: number = parseInt(hourStr);
          const slotTime: Date = new Date(selectedDate);
          slotTime.setHours(hour, 0, 0, 0);

          const status: TimeSlot['status'] =
            isSelectedDateToday && slotTime.getTime() < nowPlusOneHour.getTime()
              ? 'no disponible'
              : 'disponible';

          slots.push({ time, status });
        });
      }
    }

    return slots;
  };

  const handleReservationSubmit = () => {
    if (!reservationData.time) {
      alert('Por favor selecciona la hora de la reserva');
      return;
    }
    
    const finalDate = selectedDate || new Date().toISOString().split('T')[0];
    
    console.log('Reserva confirmada:', {
      amenity: selectedAmenity?.name,
      selectedDate: finalDate,
      ...reservationData
    });
    
    // Aquí iría la lógica para guardar la reserva
    alert('✅ Reserva confirmada exitosamente!');
    setIsNewReservationModalOpen(false);
  };
  
  const handleContinueReservation = () => {
    if (selectedAmenity) {
      // Reset all reservation-related states before opening the modal
      setReservationData({
        date: '',
        time: '',
        people: 1,
        notes: '',
        isInsured: false,
      });
      setSelectedTimeSlot('');
      setSelectedDate('');
      setSelectedCalendarDate(undefined);
      setIsNewReservationModalOpen(true);
    }
  };

  const handleCalendarDateSelect = (date: Date | undefined) => {
    setSelectedCalendarDate(date);
    if (date) {
      setSelectedDate(date.toISOString().split('T')[0]);
    } else {
      setSelectedDate('');
    }
    setSelectedTimeSlot('');
    setReservationData(prev => ({ ...prev, time: '' }));
  };

  const renderStars = (rating: number) => {
    if (!showRatings) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current opacity-50" />);
      } else {
        stars.push(<FiStar key={i} className="w-4 h-4 text-gray-400" />);
      }
    }

    return (
      <div className="flex items-center space-x-2 mb-3">
        <div className="flex space-x-1">
          {stars}
        </div>
        <span className="text-sm text-gray-400">({rating})</span>
      </div>
    );
  };

  // useEffect para abrir el modal de creación/edición si se proporciona initialFormType
  useEffect(() => {
    if (initialFormType === 'create') {
      setIsCreateAmenityModalOpen(true);
    } else if (initialFormType === 'edit' && amenityToEdit) {
      setIsEditAmenityModalOpen(true);
    }
  }, [initialFormType, amenityToEdit]);

  return (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-400 text-lg">{description}</p>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <CompactListbox
          options={categoryOptions}
          value={{ value: selectedCategory, label: categoryOptions.find(f => f.value === selectedCategory)?.label || 'Todas las categorías' }}
          onChange={(value) => setSelectedCategory(value.value)}
          placeholder="Filtrar por categoría"
          className="w-48"
        />

        {/* Botón de crear amenity solo para establecimiento */}
        {mode === 'establecimiento' && (
          <Button
            variant="primary"
            onClick={handleCreateAmenity}
            className="px-6 py-2 bg-[#06011A] hover:bg-[#0047bb] shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            + Crear Amenity
          </Button>
        )}
      </div>

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAmenities.map((amenity) => (
          <div 
            key={amenity.id} 
            className={`bg-gray-800/50 border rounded-lg p-6 hover:bg-gray-800/70 transition-colors text-left
              ${selectedAmenity?.id === amenity.id ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-lg' : 'border-gray-700'}`}
          >
            {/* Clickable area for selection */}
            <div 
              className="cursor-pointer"
              onClick={() => handleSelectAmenityForReservation(amenity)}
            >
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-lg overflow-hidden ${selectedAmenity?.id === amenity.id ? 'ring-2 ring-blue-600' : ''}`}>
              {amenity.images && amenity.images.length > 0 ? (
                <img 
                  src={amenity.images[0]} 
                  alt={amenity.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">📷</span>
                </div>
              )}
            </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(amenity.status)}`}>
                  {amenity.status === 'disponible' ? 'Disponible' : 
                   amenity.status === 'ocupado' ? 'Ocupado' : 
                   amenity.status === 'mantenimiento' ? 'Mantenimiento' : 'Desactivado'}
                </span>
              </div>

              {/* Title and Category */}
              <h3 className="text-lg font-semibold text-white mb-2">{amenity.name}</h3>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(amenity.category)} mb-3`}>
                {amenity.category}
              </span>

              {/* Rating */}
              {renderStars(amenity.rating)}

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{amenity.description}</p>

              {/* Details */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-400">
                  <FiMapPin className="w-4 h-4 mr-2" />
                  {amenity.location}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <FiClock className="w-4 h-4 mr-2" />
                  {renderScheduleSummary(amenity.shifts, amenity)}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <FiUsers className="w-4 h-4 mr-2" />
                  Capacidad: {amenity.capacity} personas
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 overflow-hidden">
              {mode === 'establecimiento' ? (
                // Acciones de administración para establecimiento
                <div className="flex space-x-2 w-full">
                  <Button
                    variant="secondary"
                    onClick={() => handleEditAmenity(amenity)}
                    className="flex-1 text-sm py-2 focus:ring-0 focus:ring-offset-0"
                  >
                    Editar
                  </Button>
                  <Button
                    variant={amenity.status === 'desactivado' ? 'primary' : 'secondary'}
                    onClick={() => handleToggleAmenityStatus(amenity)}
                    className="px-3 py-2 text-sm focus:ring-0 focus:ring-offset-0"
                    title={amenity.status === 'desactivado' ? 'Activar amenity' : 'Desactivar amenity'}
                  >
                    {amenity.status === 'desactivado' ? 'Activar' : 'Desactivar'}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleDeleteAmenity(amenity)}
                    className="px-3 py-2 text-sm bg-red-600/20 text-red-400 border-red-600/30 hover:bg-red-600/30 focus:ring-0 focus:ring-offset-0"
                    title="Eliminar amenity"
                  >
                    Eliminar
                  </Button>
                </div>
              ) : (
                // Acciones normales para cliente
                selectedAmenity?.id === amenity.id && showReservations ? (
                  <div className="flex-1 flex justify-center">
                    <Button
                      variant="primary"
                      onClick={() => handleContinueReservation()}
                      className={`transition-all duration-500 ease-out overflow-hidden whitespace-nowrap focus:ring-0 focus:ring-offset-0 ${isButtonVisible ? 'w-full px-6' : 'w-0 px-0'}`}
                    >
                      {selectedAmenity?.status !== "disponible" ? "Reservar para otro dia" : "Continuar con la Reserva"}
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => handleAmenityClick(amenity)}
                    className="flex-1 focus:ring-0 focus:ring-offset-0"
                  >
                    Ver Detalles
                  </Button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Help Icon - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg">
          <FiHelpCircle className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Amenity Details Modal */}
      <Dialog
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
      >
        <Dialog.Content>
          <Dialog.Header className="relative">
            <Dialog.Title>{`Detalles - ${selectedAmenity?.name}`}</Dialog.Title>
            <button
              onClick={() => setIsDetailsModalOpen(false)}
              className="absolute top-0 right-0 p-2 text-blue-400 hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-900/20"
              aria-label="Cerrar modal"
            >
              <FiX className="w-6 h-6" />
            </button>
          </Dialog.Header>
        {amenityForModal && (
          <div className="space-y-6">
            <p className="text-gray-400 text-sm">
              Información completa sobre {amenityForModal.name}, incluyendo características, horarios, capacidad y calificaciones.
            </p>
            
            {/* Carrusel de imágenes prominente */}
            {amenityForModal.images && amenityForModal.images.length > 0 && (
              <div className="w-full">
                <ImageCarousel 
                  images={amenityForModal.images}
                  className="w-full h-48"
                  showNavigation={true}
                  autoPlay={false}
                />
              </div>
            )}

            {/* Información del amenity */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-white mb-2">{amenityForModal.name}</h3>
              <p className="text-gray-300 text-lg">{amenityForModal.description}</p>
            </div>

            {showRatings && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Calificación promedio:</span>
                <div className="flex space-x-1">
                  {renderStars(amenityForModal.rating)}
                </div>
                <span className="text-sm text-gray-400">({amenityForModal.rating})</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Categoría</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(amenityForModal.category)}`}>
                    {amenityForModal.category}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Ubicación</label>
                  <p className="text-white font-semibold">{amenityForModal.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Capacidad</label>
                  <p className="text-white font-semibold">{amenityForModal.capacity} personas</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Estado</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(amenityForModal.status)}`}>
                    {amenityForModal.status === 'disponible' ? 'Disponible' : 
                     amenityForModal.status === 'ocupado' ? 'Ocupado' : 
                     amenityForModal.status === 'mantenimiento' ? 'Mantenimiento' : 'Desactivado'}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Horarios</label>
                  <div className="bg-gray-800/30 rounded-lg p-3">
                    {renderDetailedSchedule(amenityForModal.shifts, amenityForModal)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Reservable</label>
                  <p className="text-white font-semibold">{amenityForModal.status === 'disponible' ? 'Sí' : 'No'}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Características disponibles</label>
              <div className="flex flex-wrap gap-2">
                {amenityForModal.features.map((feature, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Servicios Adicionales - Solo mostrar si están habilitados */}
            {(amenityForModal.cleaningService.enabled || amenityForModal.penalty.enabled) && (
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  🧹 Servicios Adicionales
                </h3>
                
                {/* Servicio de Limpieza */}
                {amenityForModal.cleaningService.enabled && (
                  <div className="mb-4 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        🧽 Servicio de Limpieza
                      </span>
                      <span className="text-sm font-bold text-green-400">
                        ${amenityForModal.cleaningService.price}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {amenityForModal.cleaningService.description}
                    </p>
                  </div>
                )}
                
                {/* Multa por Incumplimiento */}
                {amenityForModal.penalty.enabled && (
                  <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        ⚠️ Multa por Incumplimiento
                      </span>
                      <span className="text-sm font-bold text-red-400">
                        ${amenityForModal.penalty.amount}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {amenityForModal.penalty.description}
                    </p>
                  </div>
                )}
                
                <div className="mt-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-xs text-blue-300 text-center">
                    💡 <strong>Nota:</strong> Estos servicios se aplicarán según corresponda al reservar este amenity
                  </p>
                </div>
              </div>
            )}

            {showRatings && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">¿Cómo calificarías este amenity?</label>
                <div className="flex space-x-1">
                  <span className="text-sm text-gray-400">Tu calificación:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar key={star} className="w-5 h-5 text-gray-400 hover:text-yellow-400 cursor-pointer" />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        </Dialog.Content>
      </Dialog>

      {/* Reservation Modal - Solo si showReservations es true */}
      {showReservations && (
        <Dialog
          open={isNewReservationModalOpen}
          onOpenChange={setIsNewReservationModalOpen}
        >
          <Dialog.Content>
            <Dialog.Header className="relative">
              <Dialog.Title>{`Reservar ${selectedAmenity?.name}`}</Dialog.Title>
              <button
                onClick={() => setIsNewReservationModalOpen(false)}
                className="absolute top-0 right-0 p-2 text-blue-400 hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-900/20"
                aria-label="Cerrar modal"
              >
                <FiX className="w-6 h-6" />
              </button>
            </Dialog.Header>
            {selectedAmenity && (
              <div className="space-y-6">
                {/* Header - More Compact */}
                <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg overflow-hidden">
                    {selectedAmenity.images && selectedAmenity.images.length > 0 ? (
                      <img 
                        src={selectedAmenity.images[0]} 
                        alt={selectedAmenity.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">📷</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{selectedAmenity.name}</h3>
                    <p className="text-gray-400 text-sm">{selectedAmenity.location} • {renderScheduleSummary(selectedAmenity.shifts, selectedAmenity)}</p>
                    <p className="text-gray-400 text-xs">Capacidad: {selectedAmenity.capacity} personas</p>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                    <label className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                        <FiCalendar className="w-4 h-4 mr-2 text-blue-400" />
                          Fecha de reserva
                      </label>
                    <DatePicker
                        date={selectedCalendarDate}
                        onDateChange={handleCalendarDateSelect}
                        placeholder="Selecciona una fecha"
                        className="w-full"
                        minDate={selectedAmenity.status !== 'disponible' ? new Date(new Date().setDate(new Date().getDate() + 1)) : new Date()}
                        />
                </div>

                {/* Time Selection - More Compact */}
                <div>
                  <label className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                    <FiClock className="w-4 h-4 mr-2 text-blue-400" />
                    Horarios disponibles
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {selectedCalendarDate ? getAvailableTimeSlots(selectedAmenity, selectedCalendarDate ?? null).map((slot) => (
                              <button
                                key={slot.time}
                                onClick={() => handleTimeSlotSelect(slot.time)}
                                disabled={slot.status === 'no disponible'}
                                className={`px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                                  selectedTimeSlot === slot.time
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                    : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-white'
                                } ${slot.status === 'no disponible' ? 'opacity-50 bg-gray-900' : ''}`}
                              >
                                {slot.time}
                              </button>
                            )) : (
                              <div className="col-span-6 text-center text-gray-400">
                                No hay horarios disponibles
                              </div>
                            )}
                  </div>
                </div>

                {/* People Selection - More Compact */}
                <div>
                  <label className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                    <FiUsers className="w-4 h-4 mr-2 text-blue-400" />
                    Número de personas
                  </label>
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setReservationData(prev => ({ ...prev, people: Math.max(1, prev.people - 1) }))}
                      className="w-10 h-10 bg-gray-700/50 border border-gray-600 rounded-lg flex items-center justify-center text-white hover:border-blue-500 hover:bg-gray-600/50 transition-all duration-200 text-lg font-bold"
                    >
                      -
                    </button>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-white block">{reservationData.people}</span>
                      <p className="text-xs text-gray-400">de {selectedAmenity.capacity} máximo</p>
                    </div>
                    <button
                      onClick={() => setReservationData(prev => ({ ...prev, people: Math.min(selectedAmenity.capacity, prev.people + 1) }))}
                      className="w-10 h-10 bg-gray-700/50 border border-gray-600 rounded-lg flex items-center justify-center text-white hover:border-blue-500 hover:bg-gray-600/50 transition-all duration-200 text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Notes - More Compact */}
                <div>
                  <label className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                    <FiFileText className="w-4 h-4 mr-2 text-blue-400" />
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    value={reservationData.notes}
                    onChange={(e) => setReservationData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Comentarios o solicitudes especiales..."
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-sm"
                  />
                </div>

                {/* Summary Card - More Compact */}
                {reservationData.time && (
                  <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                      <span className="mr-2">📋</span>
                      Resumen de reserva
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-gray-400">Amenity</p>
                        <p className="text-white font-medium">{selectedAmenity.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Fecha</p>
                        <p className="text-white font-medium">{selectedDate || new Date().toISOString().split('T')[0]}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Hora</p>
                        <p className="text-white font-medium">{reservationData.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Personas</p>
                        <p className="text-white font-medium">{reservationData.people}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Servicios Adicionales - Solo mostrar si están habilitados */}
                {(selectedAmenity.cleaningService.enabled || selectedAmenity.penalty.enabled) && (
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      🧹 Servicios Adicionales
                    </h4>
                    
                    {/* Servicio de Limpieza */}
                    {selectedAmenity.cleaningService.enabled && (
                      <div className="mb-3 p-2 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-300 flex items-center gap-1">
                            🧽 Limpieza
                          </span>
                          <span className="text-xs font-bold text-green-400">
                            ${selectedAmenity.cleaningService.price}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          {selectedAmenity.cleaningService.description}
                        </p>
                      </div>
                    )}
                    
                    {/* Multa por Incumplimiento */}
                    {selectedAmenity.penalty.enabled && (
                      <div className="p-2 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-300 flex items-center gap-1">
                            ⚠️ Multa
                          </span>
                          <span className="text-xs font-bold text-red-400">
                            ${selectedAmenity.penalty.amount}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          {selectedAmenity.penalty.description}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-2 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-xs text-blue-300 text-center">
                        💡 <strong>Nota:</strong> Estos servicios se aplicarán según corresponda
                      </p>
                    </div>
                  </div>
                )}

                <button onClick={() => setReservationData(prev => ({ ...prev, isInsured: !prev.isInsured }))} className="w-full flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-200">
                          <div className="flex items-center">
                              <div className={`w-6 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${reservationData.isInsured ? 'bg-blue-600 border-blue-600' : 'bg-gray-700 border border-gray-600'}`}>
                                {reservationData.isInsured && (
                                  <FiCheck className="text-white animate-fade-in" />
                                )}
                              </div>
                              <span className="ml-3 text-sm font-medium text-white text-left">Asegurar mi reserva por $ {secure}</span>
                          </div>
                          <span className="text-sm text-gray-400 text-right">(Protección contra cancelaciones)</span>
                        </button>

                {/* Footer Buttons - More Compact */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="secondary"
                    onClick={() => setIsNewReservationModalOpen(false)}
                    className="flex-1 py-2 text-sm font-medium"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleReservationSubmit}
                    disabled={!reservationData.time}
                    className="flex-1 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirmar Reserva
                  </Button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog>
      )}

      {/* Modal para crear/editar amenities */}
      <Dialog
        open={isCreateAmenityModalOpen || isEditAmenityModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateAmenityModalOpen(false);
            setIsEditAmenityModalOpen(false);
            setAmenityToEdit(null);
          }
        }}
      >
        <Dialog.Content className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <Dialog.Header className="border-b border-gray-700 pb-4 relative">
            <Dialog.Title className="text-2xl font-bold text-white">
              {amenityToEdit ? `✏️ Editar ${amenityToEdit.name}` : '✨ Crear Nuevo Amenity'}
            </Dialog.Title>
            <p className="text-gray-400 text-sm mt-2">
              {amenityToEdit 
                ? 'Modifica la información del amenity existente' 
                : 'Completa la información para crear un nuevo amenity'
              }
            </p>
            <button
              onClick={() => {
                setIsCreateAmenityModalOpen(false);
                setIsEditAmenityModalOpen(false);
                setAmenityToEdit(null);
              }}
              className="absolute top-0 right-0 p-2 text-blue-400 hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-900/20"
              aria-label="Cerrar modal"
            >
              <FiX className="w-6 h-6" />
            </button>
          </Dialog.Header>
          <div className="py-6">
            <AmenityForm
              amenity={amenityToEdit}
              onSave={handleSaveAmenity}
              onCancel={() => {
                setIsCreateAmenityModalOpen(false);
                setIsEditAmenityModalOpen(false);
                setAmenityToEdit(null);
              }}
              isOpen={isCreateAmenityModalOpen || isEditAmenityModalOpen}
            />
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
