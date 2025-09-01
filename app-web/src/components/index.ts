// ===== COMPONENTES COMPARTIDOS =====
// Estos componentes se pueden usar en TODOS los modos
export * from './shared';

// ===== COMPONENTES POR FUNCIONALIDAD =====
// Estos componentes son independientes del modo pero específicos de una funcionalidad
export * from './features';

// ===== COMPONENTES ESPECÍFICOS DE MODO =====
// Estos componentes SOLO se usan en el modo especificado
export * from './mode-specific/admin';
export * from './mode-specific/propietario';
export * from './mode-specific/empresa';
export * from './mode-specific/barrera';

// Re-export hooks
export { useLocalStorage } from '@/hooks/useLocalStorage';
export { useTheme } from '@/hooks/useTheme';

// Re-export contexts
export { AppProvider, useApp } from '@/contexts/AppContext'; 