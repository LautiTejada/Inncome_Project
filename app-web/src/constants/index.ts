
import { FiHome, FiShield, FiUsers, FiFileText, FiActivity, FiCreditCard } from 'react-icons/fi';
import { User } from '@/types';


// Navigation Items
export const NAVIGATION_ITEMS = [
  { icon: FiHome, label: "Dashboard", href: "#", active: true },
  { icon: FiShield, label: "Mis Asegurados", href: "#" },
  { icon: FiUsers, label: "Cobertura Particular", href: "#" },
  { icon: FiFileText, label: "Certificados", href: "#" },
  { icon: FiShield, label: "Mis Pólizas", href: "#" },
  { icon: FiActivity, label: "Amenities", href: "#" },
  { icon: FiCreditCard, label: "Créditos", href: "#" },
];

// Dashboard Cards Data
export const DASHBOARD_CARDS = [
  {

    title: 'Gestión',
    description: 'Acciones principales',
    glowColor: 'green' as const,
    primaryButton: { text: 'Alta Nueva Visita', href: '/asegurados?tab=visits&form=add' },
    secondaryButton: { text: 'Alta Nueva Trabajador', href: '/asegurados?tab=workers&form=add' },
    tertiaryButton: { text: 'Créditos', href: '/creditos' },
  },
  {
    title: 'Mis Asegurados',
    description: 'Ver mi cobertura actual',
    glowColor: 'blue' as const,
    primaryButton: { text: 'Mis Asegurados', href: '/asegurados' },
    secondaryButton: { text: 'Mis Ingresos', href: '/asegurados?tab=income' },
  },
  {
    title: 'Póliza Particular',
    description: 'Gestionar pólizas',
    glowColor: 'purple' as const,
    primaryButton: { text: 'Cargar Póliza', href: '/cobertura-particular?form=upload' },
    secondaryButton: { text: 'Ver Pólizas Cargadas', href: '/cobertura-particular' },

  },
  {
    title: 'Amenities',
    description: 'Gestionar amenities disponibles',
    glowColor: 'orange' as const,
    primaryButton: { text: 'Ver Amenities', href: '/amenities' },
    secondaryButton: { text: 'Reservar Amenity', href: '/amenities?tab=booking' },
  },
];

// Dashboard Cards Data para Usuario Barrera
export const BARRIER_DASHBOARD_CARDS = [
  {
    title: "Control de Acceso",
    description: "Panel unificado para gestión de ingresos, visitas y encomiendas",
    glowColor: "blue" as const,
    primaryButton: { text: "Acceder", href: "/barrera" },
  },
];

// Establishment Dashboard Cards Data
export const ESTABLISHMENT_DASHBOARD_CARDS = [
  {
    title: 'Pólizas',
    description: 'Gestionar pólizas del establecimiento',
    glowColor: 'blue' as const,
    primaryButton: { text: 'Ver Pólizas', href: '/establecimiento/polizas' },
    secondaryButton: { text: 'Nueva Póliza', href: '/establecimiento/polizas?form=new' },
  },
  {
    title: 'Asegurados',
    description: 'Administrar asegurados del establecimiento',
    glowColor: 'green' as const,
    primaryButton: { text: 'Ver Asegurados', href: '/establecimiento/asegurados' },
    secondaryButton: { text: 'Agregar Asegurado', href: '/establecimiento/asegurados?form=new' },
  },
  {
    title: 'Certificados',
    description: 'Gestionar certificados penales',
    glowColor: 'purple' as const,
    primaryButton: { text: 'Ver Certificados', href: '/establecimiento/certificados' },
    secondaryButton: { text: 'Nuevo Certificado', href: '/establecimiento/certificados?form=new' },
  },
  {
    title: 'Amenities',
    description: 'Gestionar amenities del establecimiento',
    glowColor: 'red' as const,
    primaryButton: { text: 'Ver Amenities', href: '/establecimiento/amenities' },
    secondaryButton: { text: 'Agregar Amenity', href: '/establecimiento/amenities?form=new' },
  },
];

// User Data
export const USER_DATA = {
  name: "CAMILA DIMARCO",
  role: "Client",
  avatar: "C",
  notifications: 3,
};

// Theme Colors
export const THEME_COLORS = {
  primary: {
    blue: "from-blue-600 to-blue-500",
    green: "from-green-600 to-green-500",
    purple: "from-purple-600 to-purple-500",
    orange: "from-orange-600 to-orange-500",
    red: "from-red-600 to-red-500",
  },
  glow: {
    blue: "from-blue-400/15 via-transparent to-transparent",
    green: "from-green-400/15 via-transparent to-transparent",
    purple: "from-purple-400/15 via-transparent to-transparent",
    orange: "from-orange-400/15 via-transparent to-transparent",
    red: "from-red-400/15 via-transparent to-transparent",
  },
};


// User Management Constants
export const USER_ROLES = [
  { value: 'admin', label: 'Administrador', color: 'bg-red-500' },
  { value: 'client', label: 'Cliente', color: 'bg-blue-500' },
  { value: 'manager', label: 'Gerente', color: 'bg-green-500' },
  { value: 'agent', label: 'Agente', color: 'bg-purple-500' },
];

export const USER_STATUSES = [
  { value: 'active', label: 'Activo', color: 'bg-green-500' },
  { value: 'inactive', label: 'Inactivo', color: 'bg-red-500' },
  { value: 'pending', label: 'Pendiente', color: 'bg-yellow-500' },
];

export const USER_PERMISSIONS = [
  'dashboard:read',
  'users:read',
  'users:write',
  'users:delete',
  'policies:read',
  'policies:write',
  'reports:read',
  'settings:read',
  'settings:write',
];

// Mock Users Data
export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Camila Dimarco',
    email: 'camila.dimarco@inncome.com',
    role: 'admin',
    status: 'active',
    avatar: 'CD',
    lastLogin: new Date('2024-01-15T10:30:00'),
    createdAt: new Date('2023-06-01'),
    permissions: ['dashboard:read', 'users:read', 'users:write', 'users:delete'],
    phone: '+54 11 1234-5678',
    company: 'Inncome'
  },
  {
    id: '2',
    name: 'Juan Pérez',
    email: 'juan.perez@empresa.com',
    role: 'client',
    status: 'active',
    avatar: 'JP',
    lastLogin: new Date('2024-01-14T15:45:00'),
    createdAt: new Date('2023-08-15'),
    permissions: ['dashboard:read', 'policies:read'],
    phone: '+54 11 9876-5432',
    company: 'Empresa ABC'
  },
  {
    id: '3',
    name: 'María González',
    email: 'maria.gonzalez@corp.com',
    role: 'manager',
    status: 'active',
    avatar: 'MG',
    lastLogin: new Date('2024-01-13T09:15:00'),
    createdAt: new Date('2023-09-20'),
    permissions: ['dashboard:read', 'users:read', 'policies:read', 'policies:write'],
    phone: '+54 11 5555-1234',
    company: 'Corporación XYZ'
  },
  {
    id: '4',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@agencia.com',
    role: 'agent',
    status: 'pending',
    avatar: 'CR',
    lastLogin: new Date('2024-01-10T14:20:00'),
    createdAt: new Date('2024-01-05'),
    permissions: ['dashboard:read', 'policies:read'],
    phone: '+54 11 3333-4444',
    company: 'Agencia 123'
  },
  {
    id: '5',
    name: 'Ana Martínez',
    email: 'ana.martinez@seguros.com',
    role: 'client',
    status: 'inactive',
    avatar: 'AM',
    lastLogin: new Date('2023-12-20T11:30:00'),
    createdAt: new Date('2023-07-10'),
    permissions: ['dashboard:read'],
    phone: '+54 11 7777-8888',
    company: 'Seguros Plus'
  }
]; 

