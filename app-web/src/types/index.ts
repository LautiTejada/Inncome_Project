export interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  active?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'green' | 'purple' | 'red';
  title?: string;
  icon?: React.ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  glowColor: 'blue' | 'green' | 'purple' | 'red' | 'orange';
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
  className?: string;

}

// User Management Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client' | 'manager' | 'agent';
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  lastLogin?: Date;
  createdAt: Date;
  permissions: string[];
  phone?: string;
  company?: string;
}

// Amenities Types
export interface Amenity {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  capacity: number;
  price: number;
  status: 'activo' | 'inactivo' | 'mantenimiento' | 'disponible' | 'ocupado';
  rating: number;
  imageUrl?: string;
  availableHours?: string;
  amenities?: string[];
  hours?: string;
  icon?: string;
  features?: string[];
}

export interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onStatusChange: (userId: string, status: User['status']) => void;
}

export interface UserFormProps {
  user?: User;
  onSubmit: (userData: Partial<User>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export interface UserFilters {
  search: string;
  role: string;
  status: string;
  company: string;
} 

