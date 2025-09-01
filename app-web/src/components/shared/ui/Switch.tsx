"use client";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  description?: string;
}

export default function Switch({ 
  checked = false, 
  onChange, 
  disabled = false,
  size = 'md',
  className = '',
  label,
  description
}: SwitchProps) {
  // Use the checked prop directly instead of internal state to avoid hydration issues
  const isChecked = checked;

  const handleToggle = () => {
    if (disabled) return;
    
    const newValue = !isChecked;
    onChange?.(newValue);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          switch: 'w-8 h-4',
          thumb: 'w-3 h-3',
          translate: 'translate-x-4'
        };
      case 'lg':
        return {
          switch: 'w-12 h-6',
          thumb: 'w-5 h-5',
          translate: 'translate-x-6'
        };
      default: // md
        return {
          switch: 'w-10 h-5',
          thumb: 'w-4 h-4',
          translate: 'translate-x-5'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleToggle}
          suppressHydrationWarning
          className={`
            ${sizeClasses.switch}
            relative inline-flex items-center rounded-full 
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${isChecked 
              ? 'bg-blue-600' 
              : 'bg-gray-300 dark:bg-gray-600'
            }
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'cursor-pointer'
            }
          `}
        >
          <span
            className={`
              ${sizeClasses.thumb}
              inline-block rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out
              ${isChecked ? sizeClasses.translate : 'translate-x-0.5'}
            `}
          />
        </button>
        
        {label && (
          <div className="ml-3">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              {label}
            </label>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}