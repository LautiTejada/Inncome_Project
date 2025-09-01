import React from 'react';
import { FiEdit3, FiBell, FiCheckSquare, FiX } from 'react-icons/fi';

import Button from '../../shared/ui/Button';

interface ExampleCardProps {
  className?: string;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ className = '' }) => {
  return (
    <div className={`max-w-md ${className}`}>
      <div className="relative">
        {/* Main card container */}
        <div className="relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl p-6 border border-gray-600/30 shadow-2xl shadow-gray-900/50 overflow-hidden">
          {/* Top and left glow effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/15 via-transparent to-transparent rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-blue-400/30 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Today note</h3>
              <Button variant="ghost" size="sm">
                <FiEdit3 className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Main content with vertical line */}
            <div className="relative mb-4">
              <div className="absolute left-0 top-0 w-0.5 h-full bg-blue-400/50"></div>
              <div className="pl-4">
                <p className="text-gray-200 text-sm leading-relaxed">
                  Going to the company and <span className="font-semibold text-white">planning meetings</span> for the week ahead
                </p>
              </div>
            </div>
            
            {/* Bottom section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiBell className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-xs">20min ago</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={<FiCheckSquare className="w-4 h-4" />}
                >
                  I&apos;m going
                </Button>
                <Button variant="ghost" size="sm">
                  <FiX className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleCard; 