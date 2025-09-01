import React from 'react';

interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface StatsTableProps {
  stats: StatItem[];
  title?: string;
  className?: string;
}

const StatsTable: React.FC<StatsTableProps> = ({ stats, title, className = '' }) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`w-16 h-16 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                {stat.icon}
              </div>
              <p className="text-sm font-medium text-gray-300 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsTable;
