// Utilidades de validación para formularios

export const validators = {
  required: (value: string) => {
    return value.trim() !== '' ? null : 'Este campo es requerido';
  },

  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Email inválido';
  },

  minLength: (min: number) => (value: string) => {
    return value.length >= min ? null : `Mínimo ${min} caracteres`;
  },

  maxLength: (max: number) => (value: string) => {
    return value.length <= max ? null : `Máximo ${max} caracteres`;
  },

  phone: (value: string) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(value) ? null : 'Teléfono inválido';
  },

  numeric: (value: string) => {
    const numericRegex = /^\d+$/;
    return numericRegex.test(value) ? null : 'Solo números permitidos';
  },

  url: (value: string) => {
    try {
      new URL(value);
      return null;
    } catch {
      return 'URL inválida';
    }
  },
};

export function validateField(value: string, rules: Array<(value: string) => string | null>) {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
}

export function validateForm(data: Record<string, string>, schema: Record<string, Array<(value: string) => string | null>>) {
  const errors: Record<string, string> = {};

  for (const [field, rules] of Object.entries(schema)) {
    const error = validateField(data[field] || '', rules);
    if (error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
} 