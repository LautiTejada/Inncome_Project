"use client";

import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ImageCarouselProps {
  images: string[];
  className?: string;
  showNavigation?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export default function ImageCarousel({ 
  images, 
  className = "",
  showNavigation = true,
  autoPlay = false,
  interval = 3000
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const timer = setInterval(nextImage, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, images.length, interval, nextImage]);

  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-lg">📷</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`w-full h-32 rounded-lg overflow-hidden ${className}`}>
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">
            {images[0].includes('piscina') ? '🏊' : 
             images[0].includes('gimnasio') ? '💪' : 
             images[0].includes('estacionamiento') ? '🚗' : 
             images[0].includes('sala-reuniones') ? '💼' : 
             images[0].includes('cafe') ? '☕' : 
             images[0].includes('salon-eventos') ? '🎉' : '📷'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-32 rounded-lg overflow-hidden ${className}`}>
      {/* Imagen principal con fallback */}
      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <span className="text-white text-4xl font-bold">
          {images[currentIndex].includes('piscina') ? '🏊' : 
           images[currentIndex].includes('gimnasio') ? '💪' : 
           images[currentIndex].includes('estacionamiento') ? '🚗' : 
           images[currentIndex].includes('sala-reuniones') ? '💼' : 
           images[currentIndex].includes('cafe') ? '☕' : 
           images[currentIndex].includes('salon-eventos') ? '🎉' : '📷'}
        </span>
      </div>

      {/* Navegación izquierda */}
      {showNavigation && images.length > 1 && (
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all backdrop-blur-sm"
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Navegación derecha */}
      {showNavigation && images.length > 1 && (
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all backdrop-blur-sm"
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Indicadores de puntos */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}

      {/* Contador de imágenes */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
