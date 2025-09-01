"use client";

import { useState, useEffect } from "react";
import { FiX, FiTag, FiXCircle } from "react-icons/fi";
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shared';

// Definiciones de tipos para el modal
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className="w-full max-w-sm mx-4 transform overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 shadow-xl transition-all">
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  logo?: string;
  descuento?: number;
  creditosRequeridos?: number;
}

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmit: (data: { discount: number | undefined; credits: number | undefined }) => void;
}

export default function DiscountModal({ isOpen, onClose, product, onSubmit }: DiscountModalProps) {
  const [discount, setDiscount] = useState('');
  const [credits, setCredits] = useState('');

  const hasDiscount = product && (product.descuento || product.creditosRequeridos);

  useEffect(() => {
    if (product) {
      // Si el descuento o los créditos son 0, se inicializa el input como string vacío.
      // De lo contrario, se usa el valor del producto convertido a string.
      setDiscount(product.descuento !== undefined && product.descuento !== 0 ? String(product.descuento) : '');
      setCredits(product.creditosRequeridos !== undefined && product.creditosRequeridos !== 0 ? String(product.creditosRequeridos) : '');
    }
  }, [product]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submittedDiscount = discount !== '' ? Number(discount) : 0;
    const submittedCredits = credits !== '' ? Number(credits) : 0;
    
    onSubmit({ discount: submittedDiscount, credits: submittedCredits });
  };

  const handleClearDiscount = () => {
    onSubmit({ discount: undefined, credits: undefined });
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            {product?.nombre ? `Descuento para "${product.nombre}"` : 'Aplicar Descuento'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          Define el porcentaje de descuento y la cantidad de créditos que un cliente necesita para canjearlo.
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-300">
              Porcentaje de Descuento (%)
            </label>
            <input
              type="number"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Ej: 15"
              min="0"
              max="100"
              className="mt-1 w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="credits" className="block text-sm font-medium text-gray-300">
              Créditos Requeridos
            </label>
            <input
              type="number"
              id="credits"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="Ej: 50"
              min="0"
              className="mt-1 w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end items-center pt-4 space-x-2">
            {hasDiscount && (
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClearDiscount}
                    icon={<FiXCircle className="w-4 h-4 text-red-400" />}
                    className="text-red-400 hover:text-red-300"
                >
                    Limpiar Descuentos
                </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              icon={<FiTag className="w-4 h-4" />}
            >
              Aplicar Descuento
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}