
"use client";

import React, { useState, useEffect } from 'react';

import { FiPlus } from 'react-icons/fi';
import { ProfileDropdown, AddMemberModal, NotificationDropdown, LinkedAccountsModal } from '@/components';
import { useMode } from '@/contexts/ModeContext';
import type { Mode } from '@/contexts/ModeContext';


interface HeaderProps {
  className?: string;
  mode?: Mode;
  userType?: Mode;
}

const Header: React.FC<HeaderProps> = ({ className = '', mode: propMode = 'cliente', userType }) => {

  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isLinkedAccountsModalOpen, setIsLinkedAccountsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { mode: contextMode } = useMode();

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Usar el modo del contexto si está disponible, sino usar el prop o userType
  const currentMode = contextMode || propMode || userType || 'cliente';

  // Datos de las cuentas vinculadas
  const linkedAccounts = [
    { id: 1, name: 'María González', initials: 'MG', color: 'from-green-500 to-green-600' },
    { id: 2, name: 'Carlos López', initials: 'CL', color: 'from-purple-500 to-purple-600' },
    { id: 3, name: 'Ana Rodríguez', initials: 'AR', color: 'from-orange-500 to-orange-600' },
  ];



  return (
    <>
             <header className={`bg-blue/10 backdrop-blur-sm border-b border-gray-800 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 relative z-20 ${className}`}>
                 <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4 min-w-0 flex-1">
             {/* Breadcrumb removido - espacio reservado para futuras funcionalidades */}
           </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 ml-2 sm:ml-4">
            {/* Cuentas Vinculadas - Solo mostrar en modo cliente */}
            {currentMode === 'cliente' && mounted && (
              <div className="hidden sm:flex items-center space-x-2 sm:space-x-3 p-2 bg-gray-800/30 rounded-lg border border-gray-700/50">
              {/* Avatares superpuestos */}
              <div className="flex items-center">
                {linkedAccounts.map((account, index) => (
                  <button
                    key={account.id}
                    onClick={() => setIsLinkedAccountsModalOpen(true)}
                    className={`w-8 h-8 bg-gradient-to-br ${account.color} rounded-full flex items-center justify-center shadow-lg text-white text-xs font-bold border-2 border-white/20 hover:scale-110 transition-transform cursor-pointer ${
                      index > 0 ? '-ml-2' : ''
                    }`}
                    title={`Ver información de ${account.name}`}
                  >
                    {account.initials}
                  </button>
                ))}
              </div>
              
              {/* Botón Agregar Miembro */}
              <button 
                onClick={() => setIsAddMemberModalOpen(true)}
                className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 transition-colors duration-200 border-2 border-white/20"
                title="Agregar miembro"
              >
                <FiPlus className="w-4 h-4 text-white" />
              </button>
              
              {/* Texto "Add member" */}
              <span className="text-gray-300 text-sm hidden lg:block">Add member</span>
            </div>
            )}
            
            {/* Sistema Completo de Notificaciones */}
            {mounted && <NotificationDropdown />}
            
            {mounted && <ProfileDropdown mode={currentMode} />}
          </div>
        </div>
      </header>

      {/* Modal para Agregar Miembro */}
      <AddMemberModal 
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
      />

      {/* Modal para Cuentas Vinculadas */}
      <LinkedAccountsModal
        isOpen={isLinkedAccountsModalOpen}
        onClose={() => setIsLinkedAccountsModalOpen(false)}
      />
    </>
  );
};

export default Header;
