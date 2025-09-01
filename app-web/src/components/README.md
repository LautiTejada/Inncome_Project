# Estructura de Componentes

Esta carpeta contiene todos los componentes de la aplicación, organizados de manera lógica para facilitar la reutilización y el mantenimiento.

## 📁 Estructura de Carpetas

```
src/components/
├── shared/                 # Componentes compartidos entre TODOS los modos
│   ├── ui/                # Componentes de UI básicos (Button, Card, etc.)
│   ├── layout/            # Componentes de estructura (Header, Sidebar, etc.)
│   └── forms/             # Formularios genéricos
│
├── features/               # Componentes por funcionalidad (independiente del modo)
│   ├── dashboard/         # Componentes de dashboard
│   ├── auth/              # Componentes de autenticación
│   └── notifications/     # Componentes de notificaciones
│
├── mode-specific/          # Componentes específicos de cada modo
│   ├── admin/             # Solo para modo administrador
│   ├── propietario/       # Solo para modo propietario
│   ├── empresa/           # Solo para modo empresa
│   └── barrera/           # Solo para modo barrera
│
└── index.ts               # Archivo principal de exportaciones
```

## 🔄 Tipos de Componentes

### 1. **Componentes Compartidos (Shared)**
- **Propósito**: Se pueden usar en TODOS los modos de usuario
- **Ejemplos**: Button, Card, Header, Sidebar, formularios básicos
- **Ubicación**: `src/components/shared/`
- **Importación**: `import { Button } from '@/components';`

### 2. **Componentes por Funcionalidad (Features)**
- **Propósito**: Son independientes del modo pero específicos de una funcionalidad
- **Ejemplos**: DashboardCard, NotificationDropdown, ProfileDropdown
- **Ubicación**: `src/components/features/`
- **Importación**: `import { DashboardCard } from '@/components';`

### 3. **Componentes Específicos de Modo (Mode-Specific)**
- **Propósito**: SOLO se usan en el modo especificado
- **Ejemplos**: AdminDashboard, PropietarioDashboard, EmpresaDashboard
- **Ubicación**: `src/components/mode-specific/[modo]/`
- **Importación**: `import { AdminDashboard } from '@/components';`

## 📋 Reglas de Organización

### ✅ **SÍ hacer:**
- Colocar componentes básicos de UI en `shared/ui/`
- Colocar componentes de layout en `shared/layout/`
- Colocar componentes por funcionalidad en `features/[funcionalidad]/`
- Colocar componentes específicos de modo en `mode-specific/[modo]/`
- Usar el archivo `index.ts` de cada carpeta para exportaciones

### ❌ **NO hacer:**
- Duplicar componentes en múltiples carpetas
- Colocar componentes compartidos en carpetas específicas de modo
- Crear carpetas anidadas innecesarias
- Olvidar actualizar los archivos de índice

## 🚀 Cómo Agregar Nuevos Componentes

### 1. **Componente Compartido:**
```typescript
// Crear en: src/components/shared/ui/NewComponent.tsx
export default function NewComponent() {
  // ...
}

// Agregar a: src/components/shared/index.ts
export { default as NewComponent } from './ui/NewComponent';
```

### 2. **Componente por Funcionalidad:**
```typescript
// Crear en: src/components/features/[funcionalidad]/NewComponent.tsx
export default function NewComponent() {
  // ...
}

// Agregar a: src/components/features/index.ts
export { default as NewComponent } from './[funcionalidad]/NewComponent';
```

### 3. **Componente Específico de Modo:**
```typescript
// Crear en: src/components/mode-specific/[modo]/NewComponent.tsx
export default function NewComponent() {
  // ...
}

// Agregar a: src/components/mode-specific/[modo]/index.ts
export { default as NewComponent } from './NewComponent';
```

## 🔍 Cómo Encontrar Componentes

### **Por Tipo:**
- **UI básicos**: `src/components/shared/ui/`
- **Layout**: `src/components/shared/layout/`
- **Dashboard**: `src/components/features/dashboard/`
- **Admin**: `src/components/mode-specific/admin/`

### **Por Modo de Usuario:**
- **Admin**: `shared/` + `features/` + `mode-specific/admin/`
- **Propietario**: `shared/` + `features/` + `mode-specific/propietario/`
- **Empresa**: `shared/` + `features/` + `mode-specific/empresa/`
- **Barrera**: `shared/` + `features/` + `mode-specific/barrera/`

## 📚 Ejemplos de Uso

### **En modo Admin:**
```typescript
import { 
  Button,           // shared/ui
  Header,           // shared/layout
  DashboardCard,    // features/dashboard
  // AdminDashboard  // mode-specific/admin (cuando se cree)
} from '@/components';
```

### **En modo Propietario:**
```typescript
import { 
  Button,           // shared/ui
  Sidebar,          // shared/layout
  AmenitiesCard,    // features/dashboard
  // PropietarioDashboard // mode-specific/propietario (cuando se cree)
} from '@/components';
```

## 🛠️ Mantenimiento

- **Revisar regularmente** que los componentes estén en la carpeta correcta
- **Actualizar** los archivos de índice cuando se agreguen nuevos componentes
- **Verificar** que no haya duplicaciones innecesarias
- **Documentar** cualquier cambio en la estructura

---

**Nota**: Esta estructura está diseñada para escalar fácilmente cuando se agreguen nuevos modos de usuario o funcionalidades.
