"use client";

import React, { useState } from 'react';
import { FiPackage, FiEdit, FiPlus, FiSearch, FiTag } from 'react-icons/fi';
import { Button, ProductModal } from '@/components/shared';
import DiscountModal from './DiscountModal';


interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  logo?: string;
  // Nuevas propiedades para los descuentos
  descuento?: number; // Valor del descuento en porcentaje
  creditosRequeridos?: number; // Créditos para canjear el descuento
}

const MOCK_PRODUCTS: Product[] = [
  // ... (Tus datos de MOCK_PRODUCTS se mantienen igual)
  {
    id: '1',
    nombre: 'ESPECTADOR',
    descripcion: 'Muerte e invalidez total por accidente hasta la suma de $2.000.000. Invalidez parcial por accidente sin cláusula de condiciones de póliza hasta la suma de $2.000.000. Por la MUTUAL prestadora médica asistencial: Asistencia médico-farmacéutica con limites: $1.000.000. Prótesis y/u ortesis hasta la suma de $50.000.',
    precio: 300.00,
    logo: '/assets/img/product-logo-placeholder.png'
  },
  {
    id: '2',
    nombre: 'BALNEARIO',
    descripcion: 'Muerte e invalidez total por accidente hasta la suma de $2.000.000. Invalidez parcial por accidente sin cláusula de condiciones de póliza hasta la suma de $2.000.000. Por la MUTUAL prestadora médica asistencial: Asistencia médico-farmacéutica con limites: $1.000.000. Prótesis y/u ortesis hasta la suma de $50.000.',
    precio: 400.00,
    logo: '/assets/img/product-logo-placeholder.png'
  },
  {
    id: '3',
    nombre: 'TRABAJADOR',
    descripcion: 'Cobertura AP Integro Max (Prestacional) Muerte e Invalidez Permanente Total y/o Parcial por Accidente: $ 15.000.000 Asist. Médica Farmacéutica: $ 3.000.000 Gastos de Sepelic: $ 858.000 Incluye cobertura riesgo In-itinere',
    precio: 750.00,
    logo: '/assets/img/product-logo-placeholder.png'
  },
  {
    id: '4',
    nombre: 'VISITA',
    descripcion: 'HUESPED O VISITANTE',
    precio: 100.00,
    logo: '/assets/img/product-logo-placeholder.png'
  },
  {
    id: '5',
    nombre: 'ESSENCIAL',
    descripcion: 'Muerte e Invalidez: $ 15.000.000\nAsist. médico farmacia: $ 3.000.000\nSepelio: $ 858.000\nCobertura riesgo In-itinere\nCobertura prestacional',
    precio: 675.00,
    logo: '/assets/img/product-logo-placeholder.png'
  },
  {
    id: '6',
    nombre: 'OPTIMO',
    descripcion: 'Muerte e Invalidez: $ 20.000.000\nAsist. médico farmacia: $ 4.000.000\nSepelio: $ 858.000\nCobertura riesgo In-itinere\nCobertura prestacional',
    precio: 947.00,
    logo: '/assets/img/product-logo-placeholder.png'
  },
  {
    id: '7',
    nombre: 'ELITE',
    descripcion: 'Muerte e Invalidez: $ 25.000.000\nAsist. médico farmacia: $ 5.000.000\nSepelio: $ 858.000\nCobertura riesgo In-itinere\nCobertura prestacional',
    precio: 999.00,
    logo: '/assets/img/product-logo-placeholder.png'
  },
  {
    id: '8',
    nombre: 'FERIANTES',
    descripcion: 'Muerte e invalidez total por accidente hasta la suma de $2.000.000. Invalidez parcial por accidente sin cláusula de condiciones de póliza hasta la suma de $2.000.000. Por la MUTUAL prestadora médica asistencial: Asistencia médico-farmacéutica con limites: $1.000.000. Prótesis y/u ortesis hasta la suma de $50.000.',
    precio: 400.00,
    logo: '/assets/img/product-logo-placeholder.png'
  }
];

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDiscountModal, setShowDiscountModal] = useState(false); // Nuevo: Estado para el modal de descuentos
  const [productWithDiscount, setProductWithDiscount] = useState<Product | null>(null); // Nuevo: Producto seleccionado para aplicar descuento

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.precio.toString().includes(searchTerm);
    
    return matchesSearch;
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleApplyDiscount = (product: Product) => {
    setProductWithDiscount(product);
    setShowDiscountModal(true);
  };

  const handleSubmit = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(prod => 
        prod.id === editingProduct.id 
          ? { ...productData, id: prod.id }
          : prod
      ));
      setEditingProduct(null);
    } else {
      // Create new product
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString()
      };
      setProducts(prev => [...prev, newProduct]);
    }
  };

  const handleSubmitDiscount = (discountData: { discount: number | undefined; credits: number | undefined }) => {
    if (productWithDiscount) {
      setProducts(prev => prev.map(prod =>
        prod.id === productWithDiscount.id
          ? { ...prod, descuento: discountData.discount, creditosRequeridos: discountData.credits }
          : prod
      ));
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowDiscountModal(false);
    setEditingProduct(null);
    setProductWithDiscount(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Productos</h1>
        <p className="text-sm sm:text-base text-gray-300">Gestión de todos los productos del sistema</p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por nombre, descripción o precio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          icon={<FiPlus className="w-4 h-4" />}
          className="whitespace-nowrap"
        >
          Crear Producto
        </Button>
      </div>

      {/* Products Table - Desktop */}
      <div className="hidden lg:block flex-1 bg-gray-900/50 rounded-lg border border-gray-700/50 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Table Header */}
          <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-700/50">
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-300 uppercase tracking-wider">
              <div className="col-span-3">Nombre</div>
              <div className="col-span-5">Descripción</div>
              <div className="col-span-2">Precio</div>
              <div className="col-span-1">Logo</div>
              <div className="col-span-1 text-center">Acciones</div>
            </div>
          </div>

          {/* Table Body - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {filteredProducts.length > 0 ? (
              <div className="divide-y divide-gray-700/50">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="px-6 py-4 hover:bg-gray-800/30 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-start">
                      <div className="col-span-3">
                        <div className="text-sm font-medium text-white">{product.nombre}</div>
                        {product.descuento && product.creditosRequeridos && (
                          <div className="mt-1 text-xs text-green-400">
                            {product.descuento}% OFF • Requiere {product.creditosRequeridos} créditos
                          </div>
                        )}
                      </div>
                      <div className="col-span-5">
                        <div className="text-sm text-gray-300 leading-relaxed">
                          {product.descripcion.length > 150 
                            ? `${product.descripcion.substring(0, 150)}...` 
                            : product.descripcion
                          }
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm font-semibold text-green-400 flex items-center gap-1">
                          {formatPrice(product.precio)}
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                          {product.logo ? (
                            <img 
                              src={product.logo} 
                              alt={`Logo ${product.nombre}`}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <FiPackage className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </div>
                      <div className="col-span-1 text-center flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Modificar"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleApplyDiscount(product)}
                          className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                          title="Aplicar Descuento"
                        >
                          <FiTag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiPackage className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">No se encontraron productos</h3>
                  <p className="text-gray-400 mb-4">
                    {searchTerm ? 'No hay productos que coincidan con la búsqueda' : 'No hay productos registrados'}
                  </p>
                  {searchTerm && (
                    <Button
                      variant="primary"
                      onClick={() => setSearchTerm('')}
                    >
                      Limpiar Búsqueda
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Products Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-900/50 rounded-lg border border-gray-700/50 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-1">{product.nombre}</h3>
                  <div className="text-sm font-semibold text-green-400">
                    {formatPrice(product.precio)}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {product.logo ? (
                    <img 
                      src={product.logo} 
                      alt={`Logo ${product.nombre}`}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <FiPackage className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </div>
              
              <div className="text-sm text-gray-300 leading-relaxed">
                {product.descripcion.length > 100 
                  ? `${product.descripcion.substring(0, 100)}...` 
                  : product.descripcion
                }
              </div>
              
              <div className="flex justify-end pt-3 border-t border-gray-700/50 gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                  title="Modificar"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleApplyDiscount(product)}
                  className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                  title="Aplicar Descuento"
                >
                  <FiTag className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPackage className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">No se encontraron productos</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm ? 'No hay productos que coincidan con la búsqueda' : 'No hay productos registrados'}
              </p>
              {searchTerm && (
                <Button
                  variant="primary"
                  onClick={() => setSearchTerm('')}
                >
                  Limpiar Búsqueda
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}

      <ProductModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        product={editingProduct}
        onSubmit={handleSubmit}
      />
      <DiscountModal
        isOpen={showDiscountModal}
        onClose={handleCloseModal}
        product={productWithDiscount}
        onSubmit={handleSubmitDiscount}
      />
    </div>
  );
}