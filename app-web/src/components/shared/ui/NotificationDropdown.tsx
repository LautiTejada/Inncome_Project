'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiBell, FiCheck, FiX, FiShield, FiCreditCard, FiFileText, FiAlertTriangle, FiClock } from 'react-icons/fi';
import { NotificationModal } from '@/components';

interface Notification {
  id: string;
  type: 'insurance' | 'payment' | 'document' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationDropdownProps {
  className?: string;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'insurance',
      title: 'Renovación de Seguro',
      message: 'Tu seguro de hogar vence en 15 días. Renueva ahora para mantener tu cobertura.',
      time: 'Hace 2 horas',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Pago Confirmado',
      message: 'Tu pago de $15,000 ha sido procesado exitosamente.',
      time: 'Hace 1 día',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'document',
      title: 'Nuevo Certificado',
      message: 'Tu certificado de cobertura está listo para descargar.',
      time: 'Hace 3 días',
      isRead: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'system',
      title: 'Mantenimiento Programado',
      message: 'El sistema estará en mantenimiento el domingo de 2:00 a 4:00 AM.',
      time: 'Hace 1 semana',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '5',
      type: 'insurance',
      title: 'Cambio de Cobertura',
      message: 'Se ha actualizado tu cobertura de auto con nuevos beneficios.',
      time: 'Hace 2 semanas',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '6',
      type: 'payment',
      title: 'Recordatorio de Pago',
      message: 'Tu próximo pago vence el 15 de este mes.',
      time: 'Hace 3 semanas',
      isRead: false,
      priority: 'high'
    }
  ]);

  const [mounted, setMounted] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current && mounted) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = 400;
      
      let left = rect.right - dropdownWidth;
      if (left < 16) left = 16;
      if (left + dropdownWidth > viewportWidth - 16) {
        left = viewportWidth - dropdownWidth - 16;
      }
      
      setDropdownPosition({
        top: rect.bottom + 8,
        left
      });
    }
  }, [isOpen, mounted]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (mounted) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mounted]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'insurance': return <FiShield className="w-4 h-4 text-blue-500" />;
      case 'payment': return <FiCreditCard className="w-4 h-4 text-green-500" />;
      case 'document': return <FiFileText className="w-4 h-4 text-purple-500" />;
      case 'system': return <FiAlertTriangle className="w-4 h-4 text-orange-500" />;
      default: return <FiBell className="w-4 h-4 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleViewAllNotifications = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  const renderDropdown = () => {
    if (!mounted || !isOpen) return null;

    return createPortal(
      <div
        ref={dropdownRef}
        className="fixed bg-gray-800/95 backdrop-blur-sm rounded-xl border border-gray-700 shadow-2xl z-[99999] overflow-hidden"
        style={{
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: '400px',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 32px)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-white font-semibold">Notificaciones</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Marcar todas como leídas
            </button>
          </div>
        </div>

        {/* Notifications List - Scroll invisible */}
        <div className="max-h-96 overflow-y-auto scrollbar-hide">
          {notifications.length === 0 ? (
            <div className="p-6 text-center">
              <FiBell className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No hay notificaciones</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-700/50 transition-colors border-l-4} ${
                    !notification.isRead ? 'bg-blue-500/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-white' : 'text-gray-300'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <FiClock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                              title="Marcar como leída"
                            >
                              <FiCheck className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                            title="Eliminar"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700 bg-gray-800/50">
          <button 
            onClick={handleViewAllNotifications}
            className="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Ver todas las notificaciones ({notifications.length})
          </button>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Trigger Button */}
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          title="Notificaciones"
        >
          <FiBell className="w-5 h-5 text-gray-400" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center border border-white/20">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown */}
        {renderDropdown()}
      </div>

      {/* Modal de Notificaciones */}
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onDeleteNotification={deleteNotification}
        onMarkAllAsRead={markAllAsRead}
      />
    </>
  );
};

export default NotificationDropdown; 