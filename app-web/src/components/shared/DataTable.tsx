import React from 'react';

interface DataTableProps {
  children: React.ReactNode;
  title?: string;
  showExport?: boolean;
  onExport?: () => void;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  children,
  title,
  showExport = false,
  onExport,
  className = ''
}) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden ${className}`}>
      {(title || showExport) && (
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          {title && (
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          )}
          {showExport && onExport && (
            <button
              onClick={onExport}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exportar
            </button>
          )}
        </div>
      )}
      
      <div className="overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

export default DataTable;
