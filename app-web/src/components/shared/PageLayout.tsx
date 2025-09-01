import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  showBackButton?: boolean;
  backHref?: string;
  backLabel?: string;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  showBackButton = false,
  backHref = '/dashboard',
  backLabel = 'Volver al Dashboard',
  className = ''
}) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header Section */}
      <div className="mb-8">
        {showBackButton && (
          <div className="flex items-center gap-4 mb-4">
            <a 
              href={backHref}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">{backLabel}</span>
            </a>
          </div>
        )}
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-400 text-lg">{description}</p>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default PageLayout;
