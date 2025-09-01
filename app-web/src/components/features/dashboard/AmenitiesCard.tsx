"use client";

import React, { useState } from "react";
import { FiActivity, FiCalendar, FiMapPin } from "react-icons/fi";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import { Amenity } from "@/types";
import BookingAmenities from "./BookingAmenities";

interface AmenitiesCardProps {
  className?: string;
}

const AmenitiesCard: React.FC<AmenitiesCardProps> = ({ className = "" }) => {
  const [isNewReservationModalOpen, setIsNewReservationModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    people: 1,
    notes: '',
    isInsured: false
  });

  const handleNewReservation = () => {
    setIsNewReservationModalOpen(true);
    setCurrentStep(1);
    setSelectedAmenity(null);
    setSelectedDate('');
    setSelectedTimeSlot('');
    setReservationData({
      date: '',
      time: '',
      people: 1,
      notes: '',
      isInsured: false,
    });
  };

  return (
    <Card
      glowColor="blue"
      className={className}>
      <div className="flex items-center justify-center m-auto mb-4">
        <div className="flex mr-3 items-center justify-center w-12 h-12 bg-gradient-to-b from-blue-950 to-blue-800 rounded-xl shadow-lg shadow-blue-500/30 border border-blue-400/20">
          <FiActivity className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-white font-semibold text-lg">Amenities</h3>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex bg-blue-900/40 p-3 rounded-xl flex-col text-start gap-1 backdrop-blur-xs">
          <div className="flex items-start space-x-2 justify-start font-semibold">
            <FiCalendar className="w-4 h-4 text-blue-300" />
            <span className="text-blue-300 text-sm">Próxima reserva</span>
          </div>
          <div className="text-gray-100 text-sm font-medium">Piscina Principal</div>
          <div className="flex w-full text-gray-400 text-xs gap-10">
            <strong>25/7/2024</strong>
            <strong>10:00 - 12:00</strong>
          </div>
        </div>
        <div className="flex items-center space-x-2 py-2 justify-between">
            <div className="flex gap-2">
              <FiActivity className="w-4 h-4 text-gray-100" />
              <span className="text-gray-100 text-sm font-semibold">Piscina</span>
            </div>
            <span className="text-gray-400 text-sm font-semibold">10:00 AM</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant="primary"
          size="sm"
          className="w-full "
          icon={<FiMapPin className="w-4 h-4" />}>
          Ver Amenities
        </Button>
        <Button
        variant="primary"
        icon={<FiCalendar className="w-4 h-4" />}
        className="w-full bg-blue-800"
        onClick={handleNewReservation}>
          Nueva Reserva
        </Button>
      </div>
      {isNewReservationModalOpen && (
        <BookingAmenities
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          reservationData={reservationData}
          setReservationData={setReservationData}
          selectedAmenity={selectedAmenity}
          setSelectedAmenity={setSelectedAmenity}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isNewReservationModalOpen={isNewReservationModalOpen}
          setIsNewReservationModalOpen={setIsNewReservationModalOpen}
        />
      )}
    </Card>
  );
};

export default AmenitiesCard;
