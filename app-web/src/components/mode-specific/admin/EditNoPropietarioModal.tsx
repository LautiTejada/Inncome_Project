"use client";

import { useState } from 'react';
import { Dialog } from '@/components';
import { FiUser, FiMail, FiPhone, FiMapPin, FiPackage, FiCheck, FiUsers, FiShield, FiCalendar, FiDollarSign } from 'react-icons/fi';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

interface EditNoPropietarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

const availableProducts: Product[] = [
  { id: '1', name: 'Seguro Hogar Básico', description: 'Cobertura básica para hogares', price: 15000, selected: false },
  { id: '2', name: 'Seguro Auto Completo', description: 'Cobertura completa para vehículos', price: 25000, selected: false },
  { id: '3', name: 'Seguro Vida', description: 'Protección familiar', price: 35000, selected: false },
  { id: '4', name: 'Seguro Salud', description: 'Cobertura médica integral', price: 45000, selected: false },
  { id: '5', name: 'Seguro Comercio', description: 'Protección para negocios', price: 55000, selected: false },
];

export default function EditNoPropietarioModal({ isOpen, onClose, user }: EditNoPropietarioModalProps) {
  const [products, setProducts] = useState<Product[]>(availableProducts);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleProduct = (productId: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, selected: !product.selected }
        : product
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProducts = products.filter(p => p.selected);
    console.log('Updated user:', formData);
    console.log('Selected products:', selectedProducts);
    onClose();
  };

  const stats = [
    { label: 'Productos Disponibles', value: availableProducts.length.toString(), icon: FiPackage, color: 'text-blue-400' },
    { label: 'Productos Seleccionados', value: products.filter(p => p.selected).length.toString(), icon: FiCheck, color: 'text-green-400' },
    { label: 'Valor Total', value: `$${products.filter(p => p.selected).reduce((sum, p) => sum + p.price, 0).toLocaleString()}`, icon: FiDollarSign, color: 'text-purple-400' },
    { label: 'Usuario', value: user.name, icon: FiUser, color: 'text-yellow-400' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 max-w-6xl">
        <Dialog.Header>
          <Dialog.Title className="text-xl font-bold text-white">
            Editar Usuario No Propietario
          </Dialog.Title>
          <Dialog.Description className="text-gray-400">
            Actualiza la información del usuario y selecciona los productos disponibles
          </Dialog.Description>
        </Dialog.Header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 bg-gray-600/50 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Information */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <FiUser className="w-5 h-5 mr-2 text-blue-400" />
              Información del Usuario
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiUser className="inline w-4 h-4 mr-2" />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiMail className="inline w-4 h-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiPhone className="inline w-4 h-4 mr-2" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiMapPin className="inline w-4 h-4 mr-2" />
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          {/* Available Products */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <FiPackage className="w-5 h-5 mr-2 text-green-400" />
              Productos Disponibles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    product.selected
                      ? 'bg-blue-500/20 border-blue-500/50'
                      : 'bg-gray-700/50 border-gray-600/50 hover:border-blue-500/30'
                  }`}
                  onClick={() => toggleProduct(product.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{product.name}</h4>
                      <p className="text-sm text-gray-400">{product.description}</p>
                      <p className="text-sm text-blue-400 font-medium">${product.price.toLocaleString()}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      product.selected
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-400'
                    }`}>
                      {product.selected && <FiCheck className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700/50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <FiCheck className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
