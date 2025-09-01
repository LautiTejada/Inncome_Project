"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  FiBarChart, FiTrendingUp, FiUsers, FiShield, FiPackage, FiCode, 
  FiCalendar, FiFilter, FiDownload, FiRefreshCw, FiEye, FiEyeOff,
  FiDollarSign, FiActivity, FiTarget, FiTrendingDown, FiX, FiChevronDown,
  FiSearch, FiClock, FiZap
} from 'react-icons/fi';

// Datos mock más realistas y detallados
const MOCK_DATA = {
  usuarios: [
    { mes: 'Ene', activos: 120, nuevos: 25, inactivos: 15, premium: 18 },
    { mes: 'Feb', activos: 135, nuevos: 30, inactivos: 12, premium: 22 },
    { mes: 'Mar', activos: 150, nuevos: 28, inactivos: 18, premium: 25 },
    { mes: 'Abr', activos: 165, nuevos: 35, inactivos: 20, premium: 28 },
    { mes: 'May', activos: 180, nuevos: 40, inactivos: 22, premium: 32 },
    { mes: 'Jun', activos: 195, nuevos: 45, inactivos: 25, premium: 35 },
  ],
  establecimientos: [
    { nombre: 'Villa Robert', usuarios: 45, ingresos: 125000, crecimiento: 12.5, rating: 4.8 },
    { nombre: 'ALMA GARDENIA', usuarios: 38, ingresos: 98000, crecimiento: 8.2, rating: 4.6 },
    { nombre: 'EL MARQUESADO', usuarios: 52, ingresos: 145000, crecimiento: 15.3, rating: 4.9 },
    { nombre: 'MILCAYAC', usuarios: 29, ingresos: 78000, crecimiento: 5.8, rating: 4.4 },
    { nombre: 'Distrito Alto', usuarios: 41, ingresos: 112000, crecimiento: 10.1, rating: 4.7 },
    { nombre: 'Barrio Las Pircas', usuarios: 33, ingresos: 89000, crecimiento: 7.4, rating: 4.5 },
  ],
  productos: [
    { nombre: 'ESPECTADOR', cantidad: 156, porcentaje: 35, crecimiento: 12.5, precio: 1500 },
    { nombre: 'BALNEARIO', cantidad: 98, porcentaje: 22, crecimiento: 8.2, precio: 2500 },
    { nombre: 'TRABAJADOR', cantidad: 134, porcentaje: 30, crecimiento: 15.3, precio: 1800 },
    { nombre: 'VISITA', cantidad: 52, porcentaje: 13, crecimiento: 5.8, precio: 800 },
  ],
  qrContrataciones: [
    { fecha: '2025-01', contrataciones: 45, ingresos: 67500, nuevosUsuarios: 23, satisfaccion: 4.6 },
    { fecha: '2025-02', contrataciones: 52, ingresos: 78000, nuevosUsuarios: 28, satisfaccion: 4.7 },
    { fecha: '2025-03', contrataciones: 48, ingresos: 72000, nuevosUsuarios: 25, satisfaccion: 4.5 },
    { fecha: '2025-04', contrataciones: 61, ingresos: 91500, nuevosUsuarios: 32, satisfaccion: 4.8 },
    { fecha: '2025-05', contrataciones: 55, ingresos: 82500, nuevosUsuarios: 29, satisfaccion: 4.6 },
    { fecha: '2025-06', contrataciones: 68, ingresos: 102000, nuevosUsuarios: 38, satisfaccion: 4.9 },
  ],
  tendencias: [
    { mes: 'Ene', usuarios: 120, ingresos: 180000, contrataciones: 45, conversion: 12.5 },
    { mes: 'Feb', usuarios: 135, ingresos: 202500, contrataciones: 52, conversion: 13.8 },
    { mes: 'Mar', usuarios: 150, ingresos: 225000, contrataciones: 48, conversion: 14.2 },
    { mes: 'Abr', usuarios: 165, ingresos: 247500, contrataciones: 61, conversion: 15.1 },
    { mes: 'May', usuarios: 180, ingresos: 270000, contrataciones: 55, conversion: 15.8 },
    { mes: 'Jun', usuarios: 195, ingresos: 292500, contrataciones: 68, conversion: 16.5 },
  ],
  rendimiento: [
    { metric: 'Usuarios Activos', valor: 95, objetivo: 100, unidad: '%' },
    { metric: 'Satisfacción', valor: 4.7, objetivo: 4.5, unidad: '/5' },
    { metric: 'Conversión', valor: 16.5, objetivo: 15, unidad: '%' },
    { metric: 'Retención', valor: 88, objetivo: 85, unidad: '%' },
    { metric: 'Tiempo Respuesta', valor: 2.3, objetivo: 3, unidad: 'min' },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

// Tipos de vista disponibles
const VIEW_TYPES = {
  overview: { name: 'Vista General', icon: FiBarChart, description: 'Resumen completo del sistema' },
  usuarios: { name: 'Usuarios', icon: FiUsers, description: 'Análisis detallado de usuarios' },
  establecimientos: { name: 'Establecimientos', icon: FiShield, description: 'Métricas de establecimientos' },
  productos: { name: 'Productos', icon: FiPackage, description: 'Distribución y rendimiento de productos' },
  qr: { name: 'QR y Contrataciones', icon: FiCode, description: 'Análisis de códigos QR y contrataciones' }
};

export default function GraficosPage() {
  const [currentView, setCurrentView] = useState('overview');
  const [dateRange, setDateRange] = useState('6m');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    establecimiento: '',
    producto: '',
    tipoUsuario: '',
    rangoIngresos: '',
    satisfaccion: ''
  });

  // Simular carga
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [currentView]);

  // Función para manejar el cambio de período
  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    // Aquí puedes agregar lógica adicional cuando cambie el período
    console.log('Período cambiado a:', value);
  };

  // Calcular KPIs en tiempo real
  const kpis = useMemo(() => {
    const lastMonth = MOCK_DATA.tendencias[MOCK_DATA.tendencias.length - 1];
    const previousMonth = MOCK_DATA.tendencias[MOCK_DATA.tendencias.length - 2];
    
    return {
      totalUsuarios: lastMonth.usuarios,
      totalIngresos: lastMonth.ingresos,
      totalContrataciones: lastMonth.contrataciones,
      crecimientoUsuarios: ((lastMonth.usuarios - previousMonth.usuarios) / previousMonth.usuarios * 100).toFixed(1),
      crecimientoIngresos: ((lastMonth.ingresos - previousMonth.ingresos) / previousMonth.ingresos * 100).toFixed(1),
      crecimientoContrataciones: ((lastMonth.contrataciones - previousMonth.contrataciones) / previousMonth.contrataciones * 100).toFixed(1)
    };
  }, []);

  // Contar filtros activos
  const activeFiltersCount = useMemo(() => {
    return Object.values(filters).filter(value => value !== '').length;
  }, [filters]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getGrowthColor = (growth: string) => {
    const num = parseFloat(growth);
    if (num > 0) return 'text-green-400';
    if (num < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getGrowthIcon = (growth: string) => {
    const num = parseFloat(growth);
    if (num > 0) return <FiTrendingUp className="w-4 h-4" />;
    if (num < 0) return <FiTrendingDown className="w-4 h-4" />;
    return <FiTarget className="w-4 h-4" />;
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      establecimiento: '',
      producto: '',
      tipoUsuario: '',
      rangoIngresos: '',
      satisfaccion: ''
    });
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    // Scroll suave al contenido
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="bg-gray-800/40 rounded-2xl border border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-700/50 rounded w-48"></div>
          <div className="h-4 bg-gray-700/50 rounded w-32"></div>
        </div>
        <div className="h-80 bg-gray-700/30 rounded-lg"></div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* KPIs Destacados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Total Usuarios */}
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-2xl border border-blue-500/30 p-4 lg:p-6 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm font-medium">Total Usuarios</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{kpis.totalUsuarios.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                {getGrowthIcon(kpis.crecimientoUsuarios)}
                <span className={`text-sm font-semibold ${getGrowthColor(kpis.crecimientoUsuarios)}`}>
                  {kpis.crecimientoUsuarios}%
                </span>
                <span className="text-gray-400 text-xs">vs mes anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
              <FiUsers className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Total Ingresos */}
        <div className="bg-gradient-to-br from-green-600/20 to-green-500/20 rounded-2xl border border-green-500/30 p-4 lg:p-6 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Total Ingresos</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{formatCurrency(kpis.totalIngresos)}</p>
              <div className="flex items-center gap-2 mt-2">
                {getGrowthIcon(kpis.crecimientoIngresos)}
                <span className={`text-sm font-semibold ${getGrowthColor(kpis.crecimientoIngresos)}`}>
                  {kpis.crecimientoIngresos}%
                </span>
                <span className="text-gray-400 text-xs">vs mes anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-500/20 rounded-2xl flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 lg:w-8 lg:h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Total Contrataciones */}
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/20 rounded-2xl border border-purple-500/30 p-4 lg:p-6 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm font-medium">Total Contrataciones</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{kpis.totalContrataciones}</p>
              <div className="flex items-center gap-2 mt-2">
                {getGrowthIcon(kpis.crecimientoContrataciones)}
                <span className={`text-sm font-semibold ${getGrowthColor(kpis.crecimientoContrataciones)}`}>
                  {kpis.crecimientoContrataciones}%
                </span>
                <span className="text-gray-400 text-xs">vs mes anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
              <FiActivity className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Tendencias Generales */}
      <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-2xl border border-gray-700/50 p-4 lg:p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <h3 className="text-lg lg:text-xl font-bold text-white flex items-center gap-2">
            <FiTrendingUp className="w-5 h-5 text-pink-400" />
            Tendencias Generales del Sistema
          </h3>
          <div className="text-sm text-gray-400">
            Análisis completo de métricas clave
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300} className="min-h-[300px]">
          <LineChart data={MOCK_DATA.tendencias}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="mes" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '12px',
                color: '#F9FAFB',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
              }}
              formatter={(value, name) => [
                name === 'ingresos' ? formatCurrency(value as number) : 
                name === 'conversion' ? `${value}%` : value,
                name === 'ingresos' ? 'Ingresos' : 
                name === 'usuarios' ? 'Usuarios' : 
                name === 'contrataciones' ? 'Contrataciones' : 'Tasa de Conversión'
              ]}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="usuarios" stroke="#3B82F6" strokeWidth={3} name="Usuarios" dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="ingresos" stroke="#F59E0B" strokeWidth={3} name="Ingresos" dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} />
            <Line yAxisId="left" type="monotone" dataKey="contrataciones" stroke="#10B981" strokeWidth={3} name="Contrataciones" dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
            <Line yAxisId="left" type="monotone" dataKey="conversion" stroke="#8B5CF6" strokeWidth={3} name="Tasa de Conversión" dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderUsuarios = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-2xl border border-gray-700/50 p-4 lg:p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <h3 className="text-lg lg:text-xl font-bold text-white flex items-center gap-2">
            <FiUsers className="w-5 h-5 text-blue-400" />
            Evolución de Usuarios
          </h3>
          <div className="text-sm text-gray-400">
            Últimos 6 meses
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300} className="min-h-[300px]">
          <BarChart data={MOCK_DATA.usuarios}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="mes" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '12px',
                color: '#F9FAFB',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
              }}
            />
            <Legend />
            <Bar dataKey="activos" fill="#3B82F6" name="Usuarios Activos" radius={[4, 4, 0, 0]} />
            <Bar dataKey="nuevos" fill="#10B981" name="Usuarios Nuevos" radius={[4, 4, 0, 0]} />
            <Bar dataKey="inactivos" fill="#EF4444" name="Usuarios Inactivos" radius={[4, 4, 0, 0]} />
            <Bar dataKey="premium" fill="#F59E0B" name="Usuarios Premium" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderEstablecimientos = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-2xl border border-gray-700/50 p-4 lg:p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <h3 className="text-lg lg:text-xl font-bold text-white flex items-center gap-2">
            <FiShield className="w-5 h-5 text-green-400" />
            Establecimientos vs Ingresos
          </h3>
          <div className="text-sm text-gray-400">
            Top 6 establecimientos
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300} className="min-h-[300px]">
          <ComposedChart data={MOCK_DATA.establecimientos}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="nombre" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '12px',
                color: '#F9FAFB',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
              }}
              formatter={(value, name) => [
                name === 'ingresos' ? formatCurrency(value as number) : value,
                name === 'ingresos' ? 'Ingresos' : 'Usuarios'
              ]}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="usuarios" fill="#10B981" name="Usuarios" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="ingresos" stroke="#F59E0B" strokeWidth={3} name="Ingresos" dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderProductos = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-2xl border border-gray-700/50 p-4 lg:p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <h3 className="text-lg lg:text-xl font-bold text-white flex items-center gap-2">
            <FiPackage className="w-5 h-5 text-purple-400" />
            Distribución de Productos
          </h3>
          <div className="text-sm text-gray-400">
            Por cantidad y precio
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300} className="min-h-[300px]">
          <PieChart>
            <Pie
              data={MOCK_DATA.productos}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ nombre, porcentaje }) => `${nombre}: ${porcentaje}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="cantidad"
            >
              {MOCK_DATA.productos.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '12px',
                color: '#F9FAFB',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
              }}
              formatter={(value, name, props) => [
                `${value} unidades - ${formatCurrency(props.payload.precio)}`,
                props.payload.nombre
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderQR = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-2xl border border-gray-700/50 p-4 lg:p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <h3 className="text-lg lg:text-xl font-bold text-white flex items-center gap-2">
            <FiCode className="w-5 h-5 text-yellow-400" />
            Contrataciones QR
          </h3>
          <div className="text-sm text-gray-400">
            Evolución mensual
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300} className="min-h-[300px]">
          <AreaChart data={MOCK_DATA.qrContrataciones}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="fecha" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '12px',
                color: '#F9FAFB',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
              }}
              formatter={(value, name) => [
                name === 'ingresos' ? formatCurrency(value as number) : value,
                name === 'ingresos' ? 'Ingresos' : name === 'contrataciones' ? 'Contrataciones' : 'Nuevos Usuarios'
              ]}
            />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="contrataciones" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Contrataciones" />
            <Area yAxisId="right" type="monotone" dataKey="ingresos" stackId="2" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="Ingresos" />
            <Area yAxisId="left" type="monotone" dataKey="nuevosUsuarios" stackId="3" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Nuevos Usuarios" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );



  const renderCurrentView = () => {
    if (isLoading) {
      return <SkeletonLoader />;
    }

    switch (currentView) {
      case 'overview':
        return renderOverview();
      case 'usuarios':
        return renderUsuarios();
      case 'establecimientos':
        return renderEstablecimientos();
      case 'productos':
        return renderProductos();
      case 'qr':
        return renderQR();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Mejorado */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-3">Dashboard de Gráficos</h1>
        <p className="text-gray-300 text-base lg:text-lg">Análisis completo y métricas en tiempo real de todas las secciones</p>
      </div>

      {/* Búsqueda Global */}
      <div className="mb-6 lg:mb-8">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar en todos los gráficos y métricas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 lg:py-4 bg-gray-800/60 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
          />
        </div>
      </div>

      {/* Controls Mejorados */}
      <div className="bg-gray-900/40 rounded-2xl border border-gray-700/50 p-4 lg:p-6 mb-6 lg:mb-8 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center">
          {/* Date Range Selector Mejorado */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="text-white font-semibold text-sm">Período:</label>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
                className="appearance-none px-4 lg:px-6 py-2 lg:py-3 bg-gray-800/80 border border-gray-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 pr-10 cursor-pointer hover:border-gray-400/50 hover:bg-gray-700/80 text-sm lg:text-base font-medium"
              >
                <option value="1m" className="bg-gray-800 text-white">Último mes</option>
                <option value="3m" className="bg-gray-800 text-white">Últimos 3 meses</option>
                <option value="6m" className="bg-gray-800 text-white">Últimos 6 meses</option>
                <option value="1y" className="bg-gray-800 text-white">Último año</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-4 h-4 pointer-events-none" />
            </div>
            {/* Indicador del período seleccionado */}
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <FiCalendar className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">
                {dateRange === '1m' && 'Último mes'}
                {dateRange === '3m' && 'Últimos 3 meses'}
                {dateRange === '6m' && 'Últimos 6 meses'}
                {dateRange === '1y' && 'Último año'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 lg:gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl transition-all duration-200 flex items-center gap-2 hover:scale-105 text-sm lg:text-base ${
                showFilters 
                  ? 'bg-blue-600/60 text-white shadow-lg shadow-blue-500/25' 
                  : 'bg-gray-800/60 hover:bg-gray-700/60 text-white'
              }`}
            >
              <FiFilter className="w-4 h-4" />
              Filtros {activeFiltersCount > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <button className="px-4 lg:px-6 py-2 lg:py-3 bg-blue-600/60 hover:bg-blue-500/60 text-white rounded-xl transition-all duration-200 flex items-center gap-2 hover:scale-105 text-sm lg:text-base">
              <FiDownload className="w-4 h-4" />
              Exportar
            </button>
            <button className="px-4 lg:px-6 py-2 lg:py-3 bg-green-600/60 hover:bg-green-500/60 text-white rounded-xl transition-all duration-200 flex items-center gap-2 hover:scale-105 text-sm lg:text-base">
              <FiRefreshCw className="w-4 h-4" />
              Actualizar
            </button>
          </div>
        </div>

        {/* Filtros Avanzados Expandibles */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Establecimiento</label>
                <select
                  value={filters.establecimiento}
                  onChange={(e) => handleFilterChange('establecimiento', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                >
                  <option value="">Todos</option>
                  <option value="villa-robert">Villa Robert</option>
                  <option value="alma-gardenia">ALMA GARDENIA</option>
                  <option value="el-marquesado">EL MARQUESADO</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Producto</label>
                <select
                  value={filters.producto}
                  onChange={(e) => handleFilterChange('producto', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                >
                  <option value="">Todos</option>
                  <option value="espectador">ESPECTADOR</option>
                  <option value="balneario">BALNEARIO</option>
                  <option value="trabajador">TRABAJADOR</option>
                  <option value="visita">VISITA</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Tipo Usuario</label>
                <select
                  value={filters.tipoUsuario}
                  onChange={(e) => handleFilterChange('tipoUsuario', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                >
                  <option value="">Todos</option>
                  <option value="activo">Activo</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Rango Ingresos</label>
                <select
                  value={filters.rangoIngresos}
                  onChange={(e) => handleFilterChange('rangoIngresos', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                >
                  <option value="">Todos</option>
                  <option value="0-50000">$0 - $50,000</option>
                  <option value="50000-100000">$50,000 - $100,000</option>
                  <option value="100000+">$100,000+</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-3 py-2 bg-red-600/60 hover:bg-red-500/60 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 text-sm"
                >
                  <FiX className="w-4 h-4" />
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vista Selector Mejorado */}
      <div className="mb-6 lg:mb-8">
        <h3 className="text-base lg:text-lg font-semibold text-white mb-3 lg:mb-4">Vistas Disponibles</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
          {Object.entries(VIEW_TYPES).map(([key, view]) => (
            <button
              key={key}
              onClick={() => handleViewChange(key)}
              className={`p-3 lg:p-4 rounded-xl transition-all duration-300 text-center hover:scale-105 transform ${
                currentView === key
                  ? 'bg-gradient-to-r from-blue-600/60 to-blue-500/60 text-white shadow-lg shadow-blue-500/25 border border-blue-500/40'
                  : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white border border-gray-600/50'
              }`}
            >
              <view.icon className="w-5 h-5 lg:w-6 lg:h-6 mx-auto mb-2" />
              <div className="text-xs lg:text-sm font-medium">{view.name}</div>
              <div className="text-xs text-gray-400 mt-1 hidden lg:block">{view.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Contenido de la Vista Seleccionada con Animación */}
      <div className="flex-1">
        <div className={`transition-all duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
}
