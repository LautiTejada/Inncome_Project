# 🏗️ Arquitectura del Proyecto Inncome

## 📁 Estructura de Carpetas

```
src/
├── app/                    # Páginas de Next.js App Router
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal con Poppins
│   └── page.tsx           # Página principal del dashboard
├── components/             # Componentes reutilizables
│   ├── ui/                # Componentes de UI básicos
│   │   ├── Button.tsx     # Botón reutilizable con variantes
│   │   └── Card.tsx       # Card con efectos glassmorphism
│   ├── layout/            # Componentes de layout
│   │   ├── Header.tsx     # Header de la aplicación
│   │   └── Sidebar.tsx    # Sidebar de navegación
│   ├── dashboard/         # Componentes específicos del dashboard
│   │   ├── DashboardCard.tsx    # Card genérica del dashboard
│   │   ├── AmenitiesCard.tsx    # Card específica de amenidades
│   │   └── ExampleCard.tsx      # Card de ejemplo
│   └── index.ts           # Exportaciones centralizadas
├── contexts/              # Contextos de React
│   └── AppContext.tsx     # Contexto global de la aplicación
├── hooks/                 # Hooks personalizados
│   ├── useLocalStorage.ts # Hook para localStorage
│   └── useTheme.ts        # Hook para manejo de tema
├── lib/                   # Utilidades y helpers
│   └── utils.ts           # Funciones utilitarias (clsx, twMerge)
├── services/              # Servicios de API
│   └── api.ts             # Servicio base para llamadas a API
├── types/                 # Definiciones de tipos TypeScript
│   └── index.ts           # Interfaces y tipos
├── utils/                 # Utilidades específicas
│   ├── validation.ts      # Validaciones de formularios
│   └── format.ts          # Utilidades de formateo
├── constants/             # Constantes y datos estáticos
│   └── index.ts           # Datos de navegación, cards, etc.
└── README.md              # Esta documentación
```

## 🧩 Componentes

### UI Components
- **Button**: Botón reutilizable con variantes (primary, secondary, danger, ghost)
- **Card**: Card con efectos glassmorphism y glow personalizable

### Layout Components
- **Header**: Barra superior con búsqueda, notificaciones y perfil
- **Sidebar**: Navegación lateral con logo y menú

### Dashboard Components
- **DashboardCard**: Card genérica para secciones del dashboard
- **AmenitiesCard**: Card específica para mostrar información de amenidades
- **ExampleCard**: Card de ejemplo con estilo de la imagen de referencia

## 🎣 Hooks Personalizados

### useLocalStorage
```tsx
const [value, setValue] = useLocalStorage('key', initialValue);
```

### useTheme
```tsx
const { theme, toggleTheme, isDark } = useTheme();
```

## 🔧 Utilidades

### Validación
```tsx
import { validators, validateField, validateForm } from '@/utils/validation';

// Validar un campo
const error = validateField(value, [validators.required, validators.email]);

// Validar un formulario completo
const { isValid, errors } = validateForm(data, schema);
```

### Formateo
```tsx
import { formatDate, formatCurrency, formatPhone } from '@/utils/format';

formatDate(new Date());           // "15 de enero de 2024"
formatCurrency(1234.56);         // "$1.234,56"
formatPhone("1123456789");       // "(11) 2345-6789"
```

## 🌐 Servicios

### API Service
```tsx
import { apiService } from '@/services/api';

// GET request
const response = await apiService.get<User[]>('/users');

// POST request
const newUser = await apiService.post<User>('/users', userData);
```

## 🎨 Estilos

### Efectos Glassmorphism
- Fondo semi-transparente con `backdrop-blur-xl`
- Bordes redondeados con `rounded-3xl`
- Efectos de glow sutiles en bordes superiores e izquierdos
- Sombras difusas para efecto de profundidad

### Paleta de Colores
- **Azul**: Elementos principales y navegación
- **Verde**: Gestión y acciones positivas
- **Púrpura**: Pólizas y documentos
- **Rojo**: Alertas y acciones críticas

### Fuente
- **Poppins**: Fuente principal de la aplicación

## 📦 Uso de Componentes

```tsx
import { Button, Card, Sidebar, Header } from '@/components';

// Uso básico
<Button variant="primary" size="lg">
  Mi Botón
</Button>

// Card con glow personalizado
<Card glowColor="blue" title="Mi Card">
  Contenido de la card
</Card>
```

## 🔧 Configuración

### Dependencias Necesarias
```json
{
  "dependencies": {
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "react-icons": "^4.12.0"
  }
}
```

### Path Mapping (tsconfig.json)
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🚀 Escalabilidad

Esta estructura permite:

### ✅ **Reutilización**
- Componentes modulares y reutilizables
- Hooks personalizados para lógica común
- Utilidades centralizadas

### ✅ **Mantenibilidad**
- Código organizado y documentado
- Separación clara de responsabilidades
- Tipos TypeScript para mayor seguridad

### ✅ **Escalabilidad**
- Fácil agregar nuevas páginas y componentes
- Estructura preparada para crecimiento
- Patrones consistentes

### ✅ **Consistencia**
- Estilos y patrones unificados
- Nomenclatura consistente
- Arquitectura predecible

## 🎯 Próximos Pasos

1. **Configurar dependencias**: Instalar `clsx` y `tailwind-merge`
2. **Configurar path mapping**: Actualizar `tsconfig.json`
3. **Crear nuevas páginas**: Seguir la estructura establecida
4. **Agregar tests**: Implementar testing con Jest/React Testing Library
5. **Optimización**: Implementar lazy loading y code splitting

## 📋 Checklist de Implementación

- [x] Estructura de carpetas organizada
- [x] Componentes UI básicos
- [x] Layout components
- [x] Hooks personalizados
- [x] Utilidades de validación y formateo
- [x] Servicio de API base
- [x] Contexto global
- [x] Documentación completa
- [ ] Configurar dependencias
- [ ] Implementar tests
- [ ] Optimizar performance 