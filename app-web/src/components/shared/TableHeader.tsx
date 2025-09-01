import React from 'react';

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children, className = '' }) => {
  return (
    <thead className={`bg-gray-800/70 text-gray-300 ${className}`}>
      {children}
    </thead>
  );
};

export default TableHeader;
