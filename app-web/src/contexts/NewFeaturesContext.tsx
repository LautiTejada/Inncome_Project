"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NewFeaturesState {
  altaNuevaVisita: boolean;
  amenitiesDashboard: boolean;
}

interface NewFeaturesContextType {
  newFeatures: NewFeaturesState;
  markFeatureAsSeen: (feature: keyof NewFeaturesState) => void;
  resetAllFeatures: () => void;
}

const NewFeaturesContext = createContext<NewFeaturesContextType | undefined>(undefined);

// Clave para localStorage
const NEW_FEATURES_KEY = 'inncome-new-features';

// Estado inicial - todas las funcionalidades son nuevas
const initialFeatures: NewFeaturesState = {
  altaNuevaVisita: true,
  amenitiesDashboard: true,
};

export function NewFeaturesProvider({ children }: { children: ReactNode }) {
  const [newFeatures, setNewFeatures] = useState<NewFeaturesState>(initialFeatures);
  const [mounted, setMounted] = useState(false);

  // Cargar estado desde localStorage al montar
  useEffect(() => {
    setMounted(true);
    try {
      const savedFeatures = localStorage.getItem(NEW_FEATURES_KEY);
      if (savedFeatures) {
        const parsedFeatures = JSON.parse(savedFeatures);
        setNewFeatures(parsedFeatures);
      }
    } catch (error) {
      console.error('Error loading new features state:', error);
    }
  }, []);

  // Marcar una funcionalidad como vista
  const markFeatureAsSeen = (feature: keyof NewFeaturesState) => {
    setNewFeatures(prev => {
      const updatedFeatures = { ...prev, [feature]: false };
      
      // Guardar en localStorage
      try {
        localStorage.setItem(NEW_FEATURES_KEY, JSON.stringify(updatedFeatures));
      } catch (error) {
        console.error('Error saving new features state:', error);
      }
      
      return updatedFeatures;
    });
  };

  // Resetear todas las funcionalidades (para testing)
  const resetAllFeatures = () => {
    setNewFeatures(initialFeatures);
    try {
      localStorage.removeItem(NEW_FEATURES_KEY);
    } catch (error) {
      console.error('Error resetting new features state:', error);
    }
  };

  return (
    <NewFeaturesContext.Provider value={{
      newFeatures,
      markFeatureAsSeen,
      resetAllFeatures
    }}>
      {children}
    </NewFeaturesContext.Provider>
  );
}

export function useNewFeatures() {
  const context = useContext(NewFeaturesContext);
  if (context === undefined) {
    throw new Error('useNewFeatures must be used within a NewFeaturesProvider');
  }
  return context;
}
