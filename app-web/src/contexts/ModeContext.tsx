"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export type Mode = 'admin' | 'cliente' | 'empresa' | 'establecimiento' | 'barrera';

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  isAdmin: boolean;
  isCliente: boolean;
  isEmpresa: boolean;
  isEstablecimiento: boolean;
  isBarrera: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};

interface ModeProviderProps {
  children: ReactNode;
}

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>('cliente');

  // Detectar automáticamente el modo basado en la ruta
  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      setMode('admin');
    } else if (pathname.startsWith('/empresa')) {
      setMode('empresa');
    } else if (pathname.startsWith('/establecimiento')) {
      setMode('establecimiento');
    } else if (pathname.startsWith('/barrera')) {
      setMode('barrera');
    } else {
      setMode('cliente');
    }
  }, [pathname]);

  const value: ModeContextType = {
    mode,
    setMode,
    isAdmin: mode === 'admin',
    isCliente: mode === 'cliente',
    isEmpresa: mode === 'empresa',
    isEstablecimiento: mode === 'establecimiento',
    isBarrera: mode === 'barrera',
  };

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
};
