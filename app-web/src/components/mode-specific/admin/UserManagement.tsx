"use client";

import { useState, useMemo } from 'react';
import { FiPlus, FiUsers, FiDownload, FiUpload } from 'react-icons/fi';
import { User, UserFilters as UserFiltersType } from '@/types';
import { Button, UserTable, UserFilters, UserForm, Dialog } from '@/components';
import { MOCK_USERS } from '@/constants';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [filters, setFilters] = useState<UserFiltersType>({
    search: '',
    role: '',
    status: '',
    company: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');

  // Filter users based on current filters
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = !filters.search || 
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        (user.company && user.company.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesRole = !filters.role || user.role === filters.role;
      const matchesStatus = !filters.status || user.status === filters.status;
      const matchesCompany = !filters.company || 
        (user.company && user.company.toLowerCase().includes(filters.company.toLowerCase()));
      
      return matchesSearch && matchesRole && matchesStatus && matchesCompany;
    });
  }, [users, filters]);

  const handleCreateUser = () => {
    setEditingUser(null);
    setViewMode('form');
    setShowForm(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setViewMode('form');
    setShowForm(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleStatusChange = (userId: string, status: User['status']) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status } : user
    ));
  };

  const handleSubmitUser = (userData: Partial<User>) => {
    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userData, id: user.id, createdAt: user.createdAt }
          : user
      ));
    } else {
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'client',
        status: userData.status || 'active',
        avatar: (userData.name || '').split(' ').map(n => n[0]).join('').toUpperCase(),
        createdAt: new Date(),
        permissions: userData.permissions || [],
        phone: userData.phone,
        company: userData.company,
      };
      setUsers(prev => [newUser, ...prev]);
    }
    
    setShowForm(false);
    setEditingUser(null);
    setViewMode('list');
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setViewMode('list');
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      role: '',
      status: '',
      company: '',
    });
  };

  const exportUsers = () => {
    const csvContent = [
      ['ID', 'Nombre', 'Email', 'Rol', 'Estado', 'Empresa', 'Teléfono', 'Último Acceso'],
      ...filteredUsers.map(user => [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.company || '',
        user.phone || '',
        user.lastLogin ? user.lastLogin.toLocaleDateString('es-AR') : 'Nunca'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `usuarios_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    pending: users.filter(u => u.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Usuarios</h1>
          <p className="text-white/60">Administra los usuarios del sistema y sus permisos</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            onClick={exportUsers}
            icon={<FiDownload className="w-4 h-4" />}
          >
            Exportar
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateUser}
            icon={<FiPlus className="w-4 h-4" />}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Nuevo Usuario
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <FiUsers className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/60">Total Usuarios</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-green-500/20">
              <FiUsers className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/60">Activos</p>
              <p className="text-2xl font-bold text-white">{stats.active}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-red-500/20">
              <FiUsers className="w-6 h-6 text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/60">Inactivos</p>
              <p className="text-2xl font-bold text-white">{stats.inactive}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <FiUsers className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/60">Pendientes</p>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <UserFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Content */}
      {viewMode === 'list' ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/60">
              Mostrando {filteredUsers.length} de {users.length} usuarios
            </p>
          </div>
          
          <UserTable
            users={filteredUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onStatusChange={handleStatusChange}
          />
        </div>
      ) : (
        <UserForm
          user={editingUser || undefined}
          onSubmit={handleSubmitUser}
          onCancel={handleCancelForm}
          isEditing={!!editingUser}
        />
      )}

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <Dialog.Content className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <UserForm
            user={editingUser || undefined}
            onSubmit={handleSubmitUser}
            onCancel={handleCancelForm}
            isEditing={!!editingUser}
          />
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
