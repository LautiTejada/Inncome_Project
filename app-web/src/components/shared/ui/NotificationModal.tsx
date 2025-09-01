'use client';

import React from 'react';
import { FiBell, FiCheck, FiX, FiShield, FiCreditCard, FiFileText, FiAlertTriangle, FiClock, FiEye } from 'react-icons/fi';
import { Dialog, Button } from '@/components';

interface NotificationItem {
  id: string;
  type: 'insurance' | 'payment' | 'document' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onDeleteNotification: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ 
  isOpen, 
  onClose, 
  notifications, 
  onMarkAsRead, 
  onDeleteNotification, 
  onMarkAllAsRead 
}) => {
  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'insurance': return <FiShield className="w-5 h-5 text-blue-400" />;
      case 'payment': return <FiCreditCard className="w-5 h-5 text-green-400" />;
      case 'document': return <FiFileText className="w-5 h-5 text-purple-400" />;
      case 'system': return <FiAlertTriangle className="w-5 h-5 text-orange-400" />;
      default: return <FiBell className="w-5 h-5 text-gray-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Content className="max-w-5xl max-h-[85vh]">
        <Dialog.Header>
          <Dialog.Title>Centro de Notificaciones</Dialog.Title>
        </Dialog.Header>
      <div className="space-y-8">
        {/* Header Stats - Mejorado */}
        <div className="relative overflow-hidden bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{notifications.length}</div>
                  <div className="text-sm text-gray-300 font-medium">Total</div>
                </div>
                <div className="w-px h-12 bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">{unreadCount}</div>
                  <div className="text-sm text-gray-300 font-medium">No leídas</div>
                </div>
              </div>
              <Button
                onClick={onMarkAllAsRead}
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <FiEye className="w-4 h-4 mr-2" />
                Marcar todas como leídas
              </Button>
            </div>
          </div>
        </div>

        {/* Notifications List - Mejorado */}
        <div className="max-h-[60vh] overflow-y-auto space-y-3 scrollbar-hide">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FiBell className="w-8 h-8 text-gray-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-300">0</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">No hay notificaciones</h3>
              <p className="text-gray-400 text-sm">Cuando recibas notificaciones, aparecerán aquí</p>
            </div>
          ) : (
            <div className="space-y-3">
                              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`group relative p-5 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 ${
                    !notification.isRead ? 'bg-blue-500/5 shadow-lg' : 'bg-gray-800/30'
                  } hover:bg-gray-700/40 hover:shadow-xl transform hover:scale-[1.02]`}
                >
                  {/* Priority Indicator */}
                  <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${
                    notification.priority === 'high' ? 'bg-red-400' :
                    notification.priority === 'medium' ? 'bg-yellow-400' :
                    'bg-green-400'
                  }`}></div>
                  
                  <div className="flex items-start space-x-4 pl-2">
                    {/* Icon Container */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-600/50 transition-colors duration-200 ${
                      !notification.isRead ? 'ring-2 ring-blue-500/30' : ''
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className={`text-base font-semibold ${!notification.isRead ? 'text-white' : 'text-gray-200'}`}>
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed mb-3">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1 text-gray-400">
                              <FiClock className="w-3.5 h-3.5" />
                              <span className="text-xs font-medium">{notification.time}</span>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              notification.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                              notification.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-green-500/20 text-green-300'
                            }`}>
                              {notification.priority === 'high' ? 'Alta' :
                               notification.priority === 'medium' ? 'Media' : 'Baja'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {!notification.isRead && (
                            <button
                              onClick={() => onMarkAsRead(notification.id)}
                              className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200"
                              title="Marcar como leída"
                            >
                              <FiCheck className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteNotification(notification.id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                            title="Eliminar"
                          >
                            <FiX className="w-4 h-4" />
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
      </div>
        </Dialog.Content>
      </Dialog>
  );
};

export default NotificationModal; 