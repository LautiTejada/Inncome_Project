"use client";

import { useState } from "react";
import { FiCalendar, FiCheck, FiClock, FiFileText, FiHome, FiMapPin, FiUsers, FiX } from "react-icons/fi";
import { Amenity } from "@/types";
import { Button, DatePicker, Dialog } from "@/components/shared";

interface BookingAmenitiesProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (timeSlot: string) => void;
  reservationData: {
    date: string;
    time: string;
    people: number;
    notes: string;
    isInsured: boolean;
  };
  setReservationData: (data: {
    date: string;
    time: string;
    people: number;
    notes: string;
    isInsured: boolean;
  } | ((prev: {
    date: string;
    time: string;
    people: number;
    notes: string;
    isInsured: boolean;
  }) => {
    date: string;
    time: string;
    people: number;
    notes: string;
    isInsured: boolean;
  })) => void;
  selectedAmenity: Amenity | null;
  setSelectedAmenity: (amenity: Amenity | null) => void;
  isNewReservationModalOpen: boolean;
  setIsNewReservationModalOpen: (isOpen: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}
const BookingAmenities: React.FC<BookingAmenitiesProps> = ({ selectedDate, setSelectedDate, selectedTimeSlot, setSelectedTimeSlot, reservationData, setReservationData, selectedAmenity, setSelectedAmenity, currentStep, setCurrentStep, isNewReservationModalOpen, setIsNewReservationModalOpen }) => {
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>(undefined);
  const [secure] = useState(1300);
  const [amenities] = useState<Amenity[]>([
    {
      id: '1',
      name: 'Piscina Principal',
      category: 'Recreación',
      description: 'Piscina climatizada de 25 metros con vista panorámica de la ciudad',
      rating: 4.2,
      status: 'disponible',
      location: 'Piso 5',
      hours: '6:00 - 22:00',
      capacity: 30,
      icon: '🏊‍♂️',
      features: ['Climatizada', 'Vista panorámica', 'Vestuarios', 'Ducha', 'Salvavidas'],
      price: 2000
    },
    {
      id: '2',
      name: 'Gimnasio',
      category: 'Fitness',
      description: 'Gimnasio completamente equipado con máquinas de última generación',
      rating: 4.7,
      status: 'ocupado',
      location: 'Piso 2',
      hours: '5:00 - 23:00',
      capacity: 20,
      icon: '💪',
      features: ['Máquinas cardio', 'Pesas libres', 'Sala de yoga', 'Instructor disponible'],
      price: 3000
    },
    {
      id: '3',
      name: 'Estacionamiento',
      category: 'Servicios',
      description: 'Estacionamiento cubierto con vigilancia 24hs y cámaras de seguridad',
      rating: 3.8,
      status: 'disponible',
      location: 'Subsuelo',
      hours: '24 horas',
      capacity: 100,
      icon: '🚗',
      features: ['Vigilancia 24hs', 'Cámaras de seguridad', 'Acceso controlado'],
      price: 3500
    },
    {
      id: '4',
      name: 'Sala de Coworking',
      category: 'Trabajo',
      description: 'Espacio de trabajo colaborativo con wifi de alta velocidad y ambiente moderno',
      rating: 4.5,
      status: 'disponible',
      location: 'Piso 3',
      hours: '7:00 - 21:00',
      capacity: 25,
      icon: '💻',
      features: ['WiFi alta velocidad', 'Impresora', 'Sala de reuniones', 'Café gratuito'],
      price: 1800
    },
    {
      id: '5',
      name: 'Cafetería',
      category: 'Gastronomía',
      description: 'Cafetería con variedad de opciones gastronómicas y ambiente acogedor',
      rating: 4.1,
      status: 'mantenimiento',
      location: 'Piso 1',
      hours: '8:00 - 20:00',
      capacity: 40,
      icon: '☕',
      features: ['Café de especialidad', 'Snacks saludables', 'Terraza', 'WiFi'],
      price: 1200
    },
    {
      id: '6',
      name: 'Salón de Eventos',
      category: 'Eventos',
      description: 'Salón elegante para eventos privados con servicio de catering disponible',
      rating: 4.8,
      status: 'disponible',
      location: 'Piso 4',
      hours: '9:00 - 23:00',
      capacity: 80,
      icon: '🎉',
      features: ['Catering disponible', 'Equipo de sonido', 'Proyector', 'Decoración'],
      price: 2300
    }
  ]);

  // Si el modal no está abierto, no renderizar nada
  if (!isNewReservationModalOpen) {
    return null;
  }

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
    setReservationData((prev: {
      date: string;
      time: string;
      people: number;
      notes: string;
      isInsured: boolean;
    }) => ({ ...prev, time }));
  };

  // Generate available time slots based on amenity hours
  const getAvailableTimeSlots = (amenity: Amenity) => {
    const slots = [];
    
    // Handle special cases like "24 horas"
    if (amenity.hours === '24 horas') {
      // For 24-hour amenities, show slots every 2 hours
      for (let hour = 0; hour < 24; hour += 2) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
      }
      return slots;
    }
    
    // Handle regular format "HH:MM - HH:MM"
    if (amenity.hours && amenity.hours.includes(' - ')) {
      const [startHour, endHour] = amenity.hours.split(' - ');
      const start = parseInt(startHour.split(':')[0]);
      const end = parseInt(endHour.split(':')[0]);
      
      for (let hour = start; hour < end; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
      }
    } else {
      // Fallback for other formats
      slots.push('09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00');
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

  const handleSelectAmenityForReservation = (amenity: Amenity) => {
    setSelectedAmenity(amenity);
    setSelectedDate('');
    setSelectedCalendarDate(undefined);
    setSelectedTimeSlot('');
    setReservationData(prev => ({ ...prev, time: '' }));
    setCurrentStep(2);
  };

  const handleContinueToStep3 = () => {
    setCurrentStep(3);
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
    setSelectedAmenity(null);
  };

  const handleBackToStep2 = () => {
    setCurrentStep(2);
    setSelectedDate('');
    setSelectedCalendarDate(undefined);
    setSelectedTimeSlot('');
    setReservationData(prev => ({ ...prev, time: '' }));
  };

  const handleCalendarDateSelect = (date: Date | undefined) => {
    setSelectedCalendarDate(date);
    if (date) {
      setSelectedDate(date.toISOString().split('T')[0]);
    } else {
      setSelectedDate('');
    }
  };
  
  return (
    <>
      {isNewReservationModalOpen && (
        <Dialog open={isNewReservationModalOpen} onOpenChange={setIsNewReservationModalOpen}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Nueva Reserva de Amenity</Dialog.Title>
              <button
                onClick={() => setIsNewReservationModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </Dialog.Header>
                 <div className="space-y-6">
                                       {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-400' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'
                        }`}>
                          1
                        </div>
                        <span className="text-sm">Amenity</span>
                      </div>
                      <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
                      <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-400' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'
                        }`}>
                          2
                        </div>
                        <span className="text-sm">Fecha & Horario</span>
                      </div>
                      <div className={`flex-1 h-1 mx-4 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
                      <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-blue-400' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'
                        }`}>
                          3
                        </div>
                        <span className="text-sm">Detalles</span>
                      </div>
                    </div>

                                       {/* Step 1: Amenity Selection */}
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <FiHome className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">Selecciona el amenity</h3>
                            <p className="text-gray-400 text-sm">Elige el servicio que deseas reservar</p>
                          </div>
                        </div>
                        
                                                 <div className="grid grid-cols-2 gap-4">
                           {amenities.filter(amenity => amenity.status === 'disponible').map((amenity) => (
                             <button
                               key={amenity.id}
                               onClick={() => handleSelectAmenityForReservation(amenity)}
                               className={`relative overflow-hidden p-4 rounded-xl transition-all duration-300 text-left group ${
                                 selectedAmenity?.id === amenity.id
                                   ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400 shadow-lg shadow-blue-500/25'
                                   : 'bg-gradient-to-br from-gray-800/80 to-gray-700/80 border border-gray-600 hover:border-blue-400 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-600/90 hover:shadow-lg hover:shadow-blue-500/10'
                               }`}
                             >
                               {/* Background gradient effect */}
                               <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-xl ${
                                 selectedAmenity?.id === amenity.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                               } transition-opacity duration-300`}></div>
                               
                               {/* Content */}
                               <div className="relative z-10">
                                 {/* Icon and Status */}
                                 <div className="flex items-start justify-between mb-3">
                                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                                     selectedAmenity?.id === amenity.id
                                       ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/50'
                                       : 'bg-gradient-to-br from-gray-600 to-gray-700 group-hover:from-blue-500 group-hover:to-purple-600'
                                   }`}>
                                     <span className="text-lg">{amenity.icon}</span>
                                   </div>
                                   <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                     selectedAmenity?.id === amenity.id
                                       ? 'bg-blue-500/20 text-blue-300 border border-blue-400/50'
                                       : 'bg-blue-500/20 text-blue-300 border border-blue-400/50'
                                   }`}>
                                     Disponible
                                   </div>
                                 </div>
                                 
                                 {/* Title */}
                                 <h4 className={`font-bold text-sm mb-2 leading-tight ${
                                   selectedAmenity?.id === amenity.id ? 'text-blue-100' : 'text-white'
                                 }`}>
                                   {amenity.name}
                                 </h4>
                                 
                                 {/* Details */}
                                 <div className="space-y-1">
                                   <div className="flex items-center text-xs text-gray-300">
                                     <FiMapPin className="w-3 h-3 mr-1 text-gray-400" />
                                     {amenity.location}
                                   </div>
                                   <div className="flex items-center text-xs text-gray-300">
                                     <FiUsers className="w-3 h-3 mr-1 text-gray-400" />
                                     {amenity.capacity} personas
                                   </div>
                                   <div className="flex items-center text-xs text-gray-300">
                                     <FiClock className="w-3 h-3 mr-1 text-gray-400" />
                                     {amenity.hours}
                                   </div>
                                 </div>
                                 
                                 {/* Selection indicator */}
                                 {selectedAmenity?.id === amenity.id && (
                                   <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                     <div className="w-2 h-2 bg-white rounded-full"></div>
                                   </div>
                                 )}
                               </div>
                             </button>
                           ))}
                         </div>
                        
                        {amenities.filter(amenity => amenity.status === 'disponible').length === 0 && (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                              <FiX className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-400">No hay amenities disponibles para reservar</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 2: Date, Time and People Selection */}
                    {currentStep === 2 && selectedAmenity && (
                     <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <FiCalendar className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">Completa los detalles</h3>
                            <p className="text-gray-400 text-sm">Selecciona fecha, horario y cantidad de personas</p>
                          </div>
                        </div>

                        {/* Selected Amenity Info */}
                        <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">{selectedAmenity.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">{selectedAmenity.name}</h3>
                            <p className="text-gray-400 text-sm">{selectedAmenity.location} • {selectedAmenity.hours}</p>
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
                          />
                        </div>

                        {/* Time Selection */}
                        <div>
                          <label className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                            <FiClock className="w-4 h-4 mr-2 text-blue-400" />
                            Horarios disponibles
                          </label>
                          <div className="grid grid-cols-6 gap-2">
                            {getAvailableTimeSlots(selectedAmenity).map((time) => (
                              <button
                                key={time}
                                onClick={() => handleTimeSlotSelect(time)}
                                className={`px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                                  selectedTimeSlot === time
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                    : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-white'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* People Selection */}
                        <div>
                          <label className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                            <FiUsers className="w-4 h-4 mr-2 text-blue-400" />
                            Número de personas
                          </label>
                          <div className="flex items-center justify-center space-x-4">
                            <button
                              onClick={() => setReservationData(prev => ({ ...prev, people: Math.max(1, prev.people - 1) }))}
                              className="w-10 h-10 bg-gray-700/50 border-2 border-gray-600 rounded-lg flex items-center justify-center text-white hover:border-blue-500 hover:bg-gray-600/50 transition-all duration-200 text-lg font-bold"
                            >
                              -
                            </button>
                            <div className="text-center">
                              <span className="text-2xl font-bold text-white block">{reservationData.people}</span>
                              <p className="text-xs text-gray-400">de {selectedAmenity.capacity} máximo</p>
                            </div>
                            <button
                              onClick={() => setReservationData(prev => ({ ...prev, people: Math.min(selectedAmenity.capacity, prev.people + 1) }))}
                              className="w-10 h-10 bg-gray-700/50 border-2 border-gray-600 rounded-lg flex items-center justify-center text-white hover:border-blue-500 hover:bg-gray-600/50 transition-all duration-200 text-lg font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Continue Button */}
                        {selectedDate && selectedTimeSlot && (
                          <div className="text-center pt-4">
                            <Button
                              variant="primary"
                              onClick={handleContinueToStep3}
                              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                            >
                              Continuar
                            </Button>
                          </div>
                        )}
                     </div>
                   )}

                                       {/* Step 3: Reservation Details */}
                    {currentStep === 3 && selectedAmenity && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <FiFileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">Detalles de la reserva</h3>
                            <p className="text-gray-400 text-sm">Revisa y confirma tu reserva</p>
                          </div>
                        </div>

                        {/* Reservation Summary */}
                        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <span className="mr-2">📋</span>
                            Resumen de reserva
                          </h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Amenity</p>
                              <p className="text-white font-medium">{selectedAmenity.name}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Fecha</p>
                              <p className="text-white font-medium">{selectedDate}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Hora</p>
                              <p className="text-white font-medium">{selectedTimeSlot}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Personas</p>
                              <p className="text-white font-medium">{reservationData.people}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Ubicación</p>
                              <p className="text-white font-medium">{selectedAmenity.location}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Capacidad</p>
                              <p className="text-white font-medium">{selectedAmenity.capacity} personas</p>
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
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
                            className="w-full px-3 py-2 bg-gray-800/50 border-2 border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-sm"
                          />
                        </div>
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
                      </div>
                    )}

                                       {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Button
                        variant="secondary"
                        onClick={() => setIsNewReservationModalOpen(false)}
                        className="flex-1 py-2 text-sm font-medium"
                      >
                        Cancelar
                      </Button>
                      
                      {/* Back Button */}
                      {currentStep > 1 && (
                        <Button
                          variant="secondary"
                          onClick={currentStep === 2 ? handleBackToStep1 : handleBackToStep2}
                          className="flex-1 py-2 text-sm font-medium"
                        >
                          Atrás
                        </Button>
                      )}
                      
                      {/* Confirm Button */}
                      {currentStep === 3 && (
                        <Button
                          variant="primary"
                          onClick={handleReservationSubmit}
                          className="flex-1 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        >
                          Confirmar Reserva
                        </Button>
                      )}
                    </div>
                 </div>
               </Dialog.Content>
             </Dialog>
      )}
    </>
  )
}

export default BookingAmenities;