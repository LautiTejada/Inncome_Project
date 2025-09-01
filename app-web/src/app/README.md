# 📁 Estructura de la Carpeta App

Esta carpeta contiene todas las páginas y rutas de la aplicación usando Next.js App Router.

## 🗂️ Organización de Archivos

```
src/app/
├── root-layout.tsx          # Layout principal de la aplicación
├── styles/
│   └── globals.css          # Estilos globales
├── home/
│   └── page.tsx             # Página de inicio (redirige a dashboard)
├── dashboard/
│   └── page.tsx             # Página principal del dashboard
├── auth/
│   └── login/
│       └── page.tsx         # Página de login
├── error/
│   └── page.tsx             # Página de error personalizada
└── not-found/
    └── page.tsx             # Página 404 personalizada
```

## 🎯 Rutas de la Aplicación

### `/` (Home)
- **Archivo**: `home/page.tsx`
- **Función**: Redirige automáticamente a `/dashboard`
- **Componente**: `HomePage`

### `/dashboard`
- **Archivo**: `dashboard/page.tsx`
- **Función**: Página principal del dashboard
- **Componente**: `DashboardPage`

### `/auth/login`
- **Archivo**: `auth/login/page.tsx`
- **Función**: Página de inicio de sesión
- **Componente**: `LoginPage`

### `/error`
- **Archivo**: `error/page.tsx`
- **Función**: Página de error personalizada
- **Componente**: `ErrorPage`

### `/not-found`
- **Archivo**: `not-found/page.tsx`
- **Función**: Página 404 personalizada
- **Componente**: `NotFoundPage`

## 🎨 Características de Diseño

### Layout Principal (`root-layout.tsx`)
- Configuración de metadatos
- Fuente Poppins
- Configuración de idioma (español)
- Estructura HTML base

### Estilos Globales (`styles/globals.css`)
- Configuración de Tailwind CSS
- Fuente Poppins
- Estilos base personalizados
- Utilidades de scrollbar

## 🚀 Convenciones de Nomenclatura

### Archivos de Páginas
- **Nombres descriptivos**: `dashboard/page.tsx` en lugar de `page.tsx`
- **Funciones con nombres claros**: `DashboardPage` en lugar de `Page`
- **Organización por funcionalidad**: `/auth/login/` para páginas de autenticación

### Carpetas Organizadas
- **`dashboard/`**: Páginas del dashboard
- **`auth/`**: Páginas de autenticación
- **`error/`**: Páginas de error
- **`styles/`**: Archivos de estilos

## 📋 Beneficios de esta Estructura

### ✅ **Claridad**
- Nombres descriptivos y intuitivos
- Organización lógica por funcionalidad
- Fácil navegación del código

### ✅ **Escalabilidad**
- Fácil agregar nuevas páginas
- Estructura preparada para crecimiento
- Separación clara de responsabilidades

### ✅ **Mantenibilidad**
- Código bien organizado
- Fácil encontrar archivos específicos
- Documentación clara

### ✅ **SEO y UX**
- Páginas de error personalizadas
- Redirecciones automáticas
- Metadatos optimizados

## 🔧 Configuración

### Next.js Config
```typescript
// next.config.ts
async redirects() {
  return [
    {
      source: '/',
      destination: '/dashboard',
      permanent: true,
    },
  ];
}
```

### TypeScript
- Path mapping configurado: `@/*` → `./src/*`
- Tipos estrictos habilitados
- Verificación de errores en build

## 📝 Próximos Pasos

1. **Agregar nuevas páginas**: Seguir la estructura establecida
2. **Implementar autenticación**: Usar `/auth/` como base
3. **Crear páginas de perfil**: `/profile/` para gestión de usuario
4. **Agregar páginas de configuración**: `/settings/` para configuraciones
5. **Implementar lazy loading**: Para optimizar performance

## 🎯 Ejemplos de Uso

### Crear una Nueva Página
```typescript
// src/app/profile/page.tsx
export default function ProfilePage() {
  return (
    <div>
      <h1>Mi Perfil</h1>
      {/* Contenido de la página */}
    </div>
  );
}
```

### Agregar una Nueva Ruta
```typescript
// src/app/settings/page.tsx
export default function SettingsPage() {
  return (
    <div>
      <h1>Configuración</h1>
      {/* Contenido de configuración */}
    </div>
  );
}
``` 