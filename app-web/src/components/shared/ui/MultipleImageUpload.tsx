"use client";

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage, FiPlus } from 'react-icons/fi';

interface MultipleImageUploadProps {
  currentImages?: string[];
  onImagesChange: (imageFiles: File[], imageUrls: string[]) => void;
  className?: string;
  disabled?: boolean;
  maxImages?: number;
}

export default function MultipleImageUpload({ 
  currentImages = [], 
  onImagesChange, 
  className = "",
  disabled = false,
  maxImages = 5
}: MultipleImageUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>(currentImages);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList) => {
    const newFiles: File[] = [];
    const newUrls: string[] = [];
    
    Array.from(files).forEach((file) => {
      if (file && file.type.startsWith('image/') && previewUrls.length + newFiles.length < maxImages) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newUrls.push(result);
          
          if (newUrls.length === files.length) {
            const allUrls = [...previewUrls, ...newUrls];
            setPreviewUrls(allUrls);
            onImagesChange(newFiles, allUrls);
          }
        };
        reader.readAsDataURL(file);
        newFiles.push(file);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newUrls);
    // Convertir URLs a archivos simulados para mantener compatibilidad
    const dummyFiles = newUrls.map(() => new File([], 'dummy'));
    onImagesChange(dummyFiles, newUrls);
  };

  const handleAddImages = () => {
    fileInputRef.current?.click();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const canAddMore = previewUrls.length < maxImages;

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Imágenes del Amenity
      </label>
      
      {/* Área de upload principal */}
      {previewUrls.length === 0 && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${
            isDragging
              ? 'border-[#0047bb] bg-[#0047bb]/10'
              : 'border-gray-600 bg-gray-800/20 hover:border-gray-500 hover:bg-gray-800/30'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={disabled ? undefined : openFileDialog}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled}
          />

          <div className="space-y-2">
            <FiImage className="w-8 h-8 text-gray-400 mx-auto" />
            <div className="text-sm text-gray-400">
              <p className="font-medium">Haz clic o arrastra imágenes aquí</p>
              <p className="text-xs">PNG, JPG hasta 5MB • Máximo {maxImages} imágenes</p>
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={openFileDialog}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0047bb]/20 text-[#0047bb] border border-[#0047bb]/30 rounded-lg hover:bg-[#0047bb]/30 transition-all text-sm"
              >
                <FiUpload className="w-4 h-4" />
                Seleccionar Imágenes
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grid de imágenes existentes */}
      {previewUrls.length > 0 && (
        <div className="space-y-4">
          {/* Grid de imágenes */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="w-full h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {url.includes('piscina') ? '🏊' : 
                     url.includes('gimnasio') ? '💪' : 
                     url.includes('estacionamiento') ? '🚗' : 
                     url.includes('sala-reuniones') ? '💼' : 
                     url.includes('cafe') ? '☕' : 
                     url.includes('salon-eventos') ? '🎉' : '📷'}
                  </span>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            
            {/* Botón para agregar más imágenes */}
            {canAddMore && (
              <div
                className={`border-2 border-dashed border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 hover:bg-gray-800/30 transition-all ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={disabled ? undefined : handleAddImages}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={disabled}
                />
                <FiPlus className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-xs text-gray-400 text-center">
                  Agregar más
                </span>
              </div>
            )}
          </div>

          {/* Área de drag & drop para agregar más */}
          {canAddMore && (
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${
                isDragging
                  ? 'border-[#0047bb] bg-[#0047bb]/10'
                  : 'border-gray-600 bg-gray-800/20 hover:border-gray-500 hover:bg-gray-800/30'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="text-sm text-gray-400">
                <p>Arrastra más imágenes aquí para agregarlas</p>
                <p className="text-xs">Máximo {maxImages} imágenes en total</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Texto de ayuda */}
      <p className="text-xs text-gray-500 text-center">
        💡 Las imágenes se mostrarán a los usuarios en un carrusel para que puedan ver cómo se ve el amenity
      </p>
    </div>
  );
}
