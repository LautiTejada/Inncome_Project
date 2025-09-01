/**
 * Component Map - Define qué componentes son compartidos y cuáles son específicos de cada modo
 * 
 * Esta configuración ayuda a mantener la organización y facilita la reutilización
 * de componentes entre diferentes modos de usuario.
 */

export const COMPONENT_MAP = {
  // ===== COMPONENTES COMPARTIDOS (SHARED) =====
  // Estos componentes se pueden usar en TODOS los modos
  shared: {
    ui: [
      'Button',
      'ButtonGradient', 
      'Card',
      'Dialog',
      'Menu',
      'Combobox',
      'CompactListbox',
      'DatePicker',
      'Label',
      'Listbox',
      'Popover',
      'RadioGroup',
      'Switch',
      'Tab'
    ],
    layout: [
      'Header',
      'Sidebar',
    
    ],
    forms: [
      'PolicyForm',
      'WorkerForm',
      'CriminalRecordForm'
    ]
  },

  // ===== COMPONENTES POR FUNCIONALIDAD (FEATURES) =====
  // Estos componentes son independientes del modo pero específicos de una funcionalidad
  features: {
    dashboard: [
      'DashboardCard',
      'AmenitiesCard',
      'ExampleCard'
    ],
    auth: [
      'ProfileDropdown'
    ],
    notifications: [
      'NotificationDropdown',
      'NotificationModal'
    ]
  },

  // ===== COMPONENTES ESPECÍFICOS DE MODO =====
  // Estos componentes SOLO se usan en el modo especificado
  modeSpecific: {
    admin: [
      'AdminDashboard',
      'UserManagement',
      'SystemSettings'
    ],
    propietario: [
      'PropietarioDashboard',
      'MisAsegurados',
      'CoberturaParticular'
    ],
    empresa: [
      'EmpresaDashboard',
      'EmpleadosManagement',
      'PolizasEmpresa'
    ],
    barrera: [
      'BarreraDashboard',
      'ControlAcceso',
      'ReportesBarrera'
    ]
  }
};

/**
 * Función helper para obtener componentes disponibles para un modo específico
 */
export const getComponentsForMode = (mode: string) => {
  const availableComponents = {
    shared: [...COMPONENT_MAP.shared.ui, ...COMPONENT_MAP.shared.layout, ...COMPONENT_MAP.shared.forms],
    features: [...COMPONENT_MAP.features.dashboard, ...COMPONENT_MAP.features.auth, ...COMPONENT_MAP.features.notifications],
    modeSpecific: COMPONENT_MAP.modeSpecific[mode as keyof typeof COMPONENT_MAP.modeSpecific] || []
  };

  return availableComponents;
};

/**
 * Función helper para verificar si un componente está disponible en un modo
 */
export const isComponentAvailableInMode = (componentName: string, mode: string) => {
  const modeComponents = getComponentsForMode(mode);
  return modeComponents.shared.includes(componentName) || 
         modeComponents.features.includes(componentName) || 
         modeComponents.modeSpecific.includes(componentName);
};
