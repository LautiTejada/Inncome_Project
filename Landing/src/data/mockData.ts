// Datos mock para reemplazar las llamadas a la API
// Este archivo contiene datos de ejemplo para demostración en GitHub

export interface Establecimiento {
  id: number;
  razon_social: string;
}

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  tipo: 'propietario' | 'externo';
  activo: boolean;
}

// Datos mock de establecimientos
export const mockEstablecimientos: Establecimiento[] = [
  { id: 1, razon_social: "Barrio Privado Los Robles" },
  { id: 2, razon_social: "Country Club San Isidro" },
  { id: 3, razon_social: "Residencial Las Lomas" },
  { id: 4, razon_social: "Barrio Cerrado El Bosque" },
  { id: 5, razon_social: "Country Villa Allende" },
  { id: 6, razon_social: "Barrio Privado La Escondida" },
  { id: 7, razon_social: "Residencial Los Pinos" },
  { id: 8, razon_social: "Country Club Córdoba" },
];

// Usuarios mock para simular autenticación
export const mockUsuarios: Usuario[] = [
  {
    id: 1,
    email: "admin@inncome.net",
    nombre: "Admin",
    apellido: "Sistema",
    tipo: "propietario",
    activo: true
  },
  {
    id: 2,
    email: "demo@inncome.net",
    nombre: "Usuario",
    apellido: "Demo",
    tipo: "externo",
    activo: true
  },
  {
    id: 3,
    email: "propietario@test.com",
    nombre: "Juan",
    apellido: "Pérez",
    tipo: "propietario",
    activo: true
  }
];

// Función para simular delay de API
export const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Función para simular respuesta de login
export const mockLogin = async (email: string, password: string) => {
  await simulateApiDelay(800);
  
  // Simular validación
  const usuario = mockUsuarios.find(u => u.email === email);
  
  if (!usuario) {
    return {
      success: false,
      message: "El correo no está registrado"
    };
  }
  
  if (password !== "123456") {
    return {
      success: false,
      message: "Contraseña incorrecta"
    };
  }
  
  if (!usuario.activo) {
    return {
      success: false,
      message: "Tu cuenta debe ser activada por el administrador"
    };
  }
  
  return {
    success: true,
    message: "Login exitoso",
    user: usuario
  };
};

// Función para simular registro de propietario
export const mockRegisterPropietario = async (data: any) => {
  await simulateApiDelay(1200);
  
  // Verificar si el email ya existe
  const emailExists = mockUsuarios.some(u => u.email === data.email);
  if (emailExists) {
    return {
      success: false,
      message: "El email ya está registrado",
      status: 409
    };
  }
  
  // Simular registro exitoso
  const nuevoUsuario: Usuario = {
    id: mockUsuarios.length + 1,
    email: data.email,
    nombre: data.nombre,
    apellido: data.apellido,
    tipo: "propietario",
    activo: true
  };
  
  mockUsuarios.push(nuevoUsuario);
  
  return {
    success: true,
    message: "Registro exitoso",
    user: nuevoUsuario,
    status: 201
  };
};

// Función para simular registro externo
export const mockRegisterExterno = async (data: any) => {
  await simulateApiDelay(1000);
  
  // Verificar si el email ya existe
  const emailExists = mockUsuarios.some(u => u.email === data.email);
  if (emailExists) {
    return {
      success: false,
      message: "El email ya está registrado",
      status: 409
    };
  }
  
  // Simular registro exitoso
  const nuevoUsuario: Usuario = {
    id: mockUsuarios.length + 1,
    email: data.email,
    nombre: data.nombre,
    apellido: data.apellido,
    tipo: "externo",
    activo: true
  };
  
  mockUsuarios.push(nuevoUsuario);
  
  return {
    success: true,
    message: "Registro exitoso",
    user: nuevoUsuario,
    status: 201
  };
};
