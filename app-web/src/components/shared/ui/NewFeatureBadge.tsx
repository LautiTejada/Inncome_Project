"use client";

import React from 'react';
import { FiStar } from 'react-icons/fi';

interface NewFeatureBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const NewFeatureBadge: React.FC<NewFeatureBadgeProps> = ({ 
  className = '', 
  size = 'md',
  onClick
}) => {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  const iconSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div 
      className={`
        inline-flex items-center gap-1 font-medium rounded-md
        bg-blue-600/70 text-white/80
        shadow-sm border border-blue-500/20
        transition-all duration-200
        hover:bg-blue-500/80 hover:text-white
        ${sizeClasses[size]}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <FiStar className={`${iconSizes[size]} text-blue-200`} />
      <span>Nuevo</span>
    </div>
  );
};

export default NewFeatureBadge;
