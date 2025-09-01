"use client";

import { useState } from 'react';
import { FiEdit2, FiTrash2, FiMoreVertical, FiEye, FiUserCheck, FiUserX } from 'react-icons/fi';
import { User, UserTableProps } from '@/types';
import { Button, Menu, Dialog } from '@/components';
import { USER_ROLES, USER_STATUSES } from '@/constants';

export default function UserTable({ users, onEdit, onDelete, onStatusChange }: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      onDelete(selectedUser.id);
      setShowDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  const getRoleInfo = (role: string) => {
    return USER_ROLES.find(r => r.value === role) || { label: role, color: 'bg-gray-500' };
  };

  const getStatusInfo = (status: string) => {
    return USER_STATUSES.find(s => s.value === status) || { label: status, color: 'bg-gray-500' };
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <>
      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/80 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user) => {
                const roleInfo = getRoleInfo(user.role);
                const statusInfo = getStatusInfo(user.status);
                
                return (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                            {user.avatar}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-sm text-white/60">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleInfo.color} text-white`}>
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color} text-white`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                      {user.company || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Nunca'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(user)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Button>
                        
                        <Menu>
                          <Menu.Trigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white/60 hover:text-white hover:bg-white/10"
                            >
                              <FiMoreVertical className="w-4 h-4" />
                            </Button>
                          </Menu.Trigger>
                          <Menu.Content className="w-48">
                            <Menu.Item onClick={() => onEdit(user)}>
                              <FiEye className="w-4 h-4 mr-2" />
                              Ver Detalles
                            </Menu.Item>
                            <Menu.Item 
                              onClick={() => onStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                              className={user.status === 'active' ? 'text-red-400' : 'text-green-400'}
                            >
                              {user.status === 'active' ? (
                                <>
                                  <FiUserX className="w-4 h-4 mr-2" />
                                  Desactivar
                                </>
                              ) : (
                                <>
                                  <FiUserCheck className="w-4 h-4 mr-2" />
                                  Activar
                                </>
                              )}
                            </Menu.Item>
                            <Menu.Separator />
                            <Menu.Item 
                              onClick={() => handleDelete(user)}
                              className="text-red-400"
                            >
                              <FiTrash2 className="w-4 h-4 mr-2" />
                              Eliminar
                            </Menu.Item>
                          </Menu.Content>
                        </Menu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <Dialog.Content className="sm:max-w-md">
          <Dialog.Header>
            <Dialog.Title>Confirmar Eliminación</Dialog.Title>
            <Dialog.Description>
              ¿Estás seguro de que quieres eliminar al usuario &quot;{selectedUser?.name}&quot;? Esta acción no se puede deshacer.
            </Dialog.Description>
          </Dialog.Header>
          <div className="flex justify-end space-x-3 mt-4">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              Eliminar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
