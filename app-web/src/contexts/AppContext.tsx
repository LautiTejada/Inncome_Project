"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Tipos para el estado
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AppState {
  user: User | null;
  theme: 'dark' | 'light';
  sidebarCollapsed: boolean;
  notifications: number;
  loading: boolean;
}

// Acciones
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_THEME'; payload: 'dark' | 'light' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_NOTIFICATIONS'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean };

// Estado inicial
const initialState: AppState = {
  user: null,
  theme: 'dark',
  sidebarCollapsed: false,
  notifications: 0,
  loading: false,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

// Contexto
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook personalizado
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 