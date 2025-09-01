"use client";

import { Dialog } from '@/components';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    lastLogin: string;
    company: string;
  } | null;
  userType: string;
}

export default function UserDetailsModal({
  isOpen,
  onClose,
  user,
  userType
}: UserDetailsModalProps) {
  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600 text-white';
      case 'pending':
        return 'bg-yellow-600 text-white';
      case 'inactive':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'pending':
        return 'Pendiente';
      case 'inactive':
        return 'Inactivo';
      default:
        return status;
    }
  };

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'establecimiento':
        return 'Establecimiento';
      case 'propietario':
        return 'Propietario';
      case 'barrera':
        return 'Barrera';
      case 'general':
        return 'General';
      default:
        return 'Usuario';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{`Detalles del Usuario - ${user.name}`}</Dialog.Title>
        </Dialog.Header>
        {user && (
          <div className="space-y-6">
            <p className="text-gray-400 text-sm">
              Información completa del usuario incluyendo rol, estado y datos de contacto.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <p className="text-white font-semibold">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Rol</label>
                  <p className="text-white font-semibold capitalize">{user.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Estado</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {getStatusText(user.status)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Tipo de Usuario</label>
                  <p className="text-white font-semibold">{getUserTypeLabel(userType)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    {userType === 'establecimiento' ? 'Establecimiento' : 
                     userType === 'barrera' ? 'Barrera' : 'Empresa'}
                  </label>
                  <p className="text-white font-semibold">{user.company}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Último Acceso</label>
                  <p className="text-white font-semibold">{user.lastLogin}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog.Content>
    </Dialog>
  );
}
