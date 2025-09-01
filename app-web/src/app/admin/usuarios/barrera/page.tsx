"use client";

import { useState } from 'react';
import { FiEye, FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { PageLayout, DataTable, TableHeader, TableRow, CreateUserModal, UserDetailsModal, UserEditModal } from '@/components';

export default function UsuariosBarreraPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string; email: string; role: string; status: string; lastLogin: string; company: string } | null>(null);
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Pedro Sánchez',
      email: 'pedro.sanchez@barrera.com',
      role: 'agent',
      status: 'active',
      lastLogin: '2024-01-15 08:30',
      company: 'Barrera Norte'
    },
    {
      id: '2',
      name: 'Lucía Morales',
      email: 'lucia.morales@barrera.com',
      role: 'agent',
      status: 'active',
      lastLogin: '2024-01-14 20:45',
      company: 'Barrera Sur'
    },
    {
      id: '3',
      name: 'Diego Herrera',
      email: 'diego.herrera@barrera.com',
      role: 'agent',
      status: 'inactive',
      lastLogin: '2024-01-12 15:15',
      company: 'Barrera Este'
    }
  ]);

  const handleExport = () => {
    console.log('Exportando usuarios de barrera...');
  };

  const handleCreateUser = (userData: { name: string; email: string; role: string; status: string; company?: string }) => {
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status,
      lastLogin: 'Nunca',
      company: userData.company || 'Sin barrera asignada'
    };
    setUsers(prev => [newUser, ...prev]);
    console.log('Usuario de barrera creado:', newUser);
  };

  const handleViewUser = (user: { id: string; name: string; email: string; role: string; status: string; lastLogin: string; company: string }) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleEditUser = (user: { id: string; name: string; email: string; role: string; status: string; lastLogin: string; company: string }) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = (updatedUser: { id: string; name: string; email: string; role: string; status: string; lastLogin: string; company: string }) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setSelectedUser(null);
    console.log('Usuario de barrera actualizado:', updatedUser);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('¿Está seguro de que desea eliminar este usuario de barrera?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      console.log('Usuario de barrera eliminado:', userId);
    }
  };

  return (
    <PageLayout
      title="Usuarios Barrera"
      description="Gestión de usuarios del sistema de barreras"
      showBackButton={true}
      backHref="/admin/usuarios"
      backLabel="Volver a Gestión de Usuarios"
    >
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar usuarios de barrera..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Agregar Usuario</span>
          <span className="sm:hidden">Agregar</span>
        </button>
      </div>

      {/* Users Table - Desktop */}
      <div className="hidden lg:block">
        <DataTable title="Usuarios del Sistema de Barreras" showExport={true} onExport={handleExport}>
          <table className="w-full">
            <TableHeader>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Barrera
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </TableHeader>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <TableRow key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-300">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-600 text-white">
                      Agente
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-600' : 
                      user.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                    } text-white`}>
                      {user.status === 'active' ? 'Activo' : 
                       user.status === 'pending' ? 'Pendiente' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewUser(user)}
                        className="text-blue-400 hover:text-blue-300"
                        title="Ver detalles"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-green-400 hover:text-green-300"
                        title="Editar"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Eliminar"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>

      {/* Users Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Usuarios del Sistema de Barreras</h3>
          <button 
            onClick={handleExport}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Exportar
          </button>
        </div>
        
        {users.map((user) => (
          <div key={user.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center flex-1">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-white">{user.name}</div>
                  <div className="text-sm text-gray-300">{user.email}</div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-600 text-white">
                  Agente
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.status === 'active' ? 'bg-green-600' : 
                  user.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                } text-white`}>
                  {user.status === 'active' ? 'Activo' : 
                   user.status === 'pending' ? 'Pendiente' : 'Inactivo'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
              <div>
                <span className="font-medium">Barrera:</span> {user.company}
              </div>
              <div>
                <span className="font-medium">Último acceso:</span> {user.lastLogin}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleViewUser(user)}
                  className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-900/20"
                  title="Ver detalles"
                >
                  <FiEye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleEditUser(user)}
                  className="text-green-400 hover:text-green-300 p-2 rounded-lg hover:bg-green-900/20"
                  title="Editar"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20"
                  title="Eliminar"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUser}
        userType="barrera"
      />

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        userType="barrera"
      />

      {/* User Edit Modal */}
      <UserEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        onSave={handleSaveUser}
        user={selectedUser}
        userType="barrera"
      />
    </PageLayout>
  );
}
