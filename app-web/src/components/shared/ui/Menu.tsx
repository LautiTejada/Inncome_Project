import { Menu as HeadlessMenu } from '@headlessui/react';
import { FiMoreVertical, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import React from 'react';

// Compound Component Pattern
interface MenuProps {
  children: React.ReactNode;
  className?: string;
}

interface MenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface MenuContentProps {
  children: React.ReactNode;
  className?: string;
}

interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

interface MenuSeparatorProps {
  className?: string;
}

const Menu: React.FC<MenuProps> & {
  Trigger: React.FC<MenuTriggerProps>;
  Content: React.FC<MenuContentProps>;
  Item: React.FC<MenuItemProps>;
  Separator: React.FC<MenuSeparatorProps>;
} = ({ children, className }) => {
  return (
    <HeadlessMenu as="div" className={cn("relative inline-block text-left", className)}>
      {children}
    </HeadlessMenu>
  );
};

Menu.Trigger = ({ children, asChild = false }) => {
  if (asChild) {
    return <>{children}</>;
  }
  
  return (
    <HeadlessMenu.Button className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
      {children || <FiMoreVertical className="w-4 h-4" />}
    </HeadlessMenu.Button>
  );
};
Menu.Trigger.displayName = 'Menu.Trigger';

Menu.Content = ({ children, className }) => {
  return (
    <HeadlessMenu.Items className={cn(
      "absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-gray-800 border border-gray-700 shadow-lg focus:outline-none z-50",
      className
    )}>
      <div className="py-1">
        {children}
      </div>
    </HeadlessMenu.Items>
  );
};
Menu.Content.displayName = 'Menu.Content';

Menu.Item = ({ children, onClick, disabled, className, icon }) => {
  return (
    <HeadlessMenu.Item disabled={disabled}>
      {({ active }) => (
        <button
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "flex items-center w-full px-4 py-2 text-sm transition-colors",
            active ? "bg-gray-700 text-white" : "text-gray-300 hover:text-white",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {icon && <span className="mr-3">{icon}</span>}
          {children}
        </button>
      )}
    </HeadlessMenu.Item>
  );
};
Menu.Item.displayName = 'Menu.Item';

Menu.Separator = ({ className }) => {
  return (
    <div className={cn("border-t border-gray-600 my-1", className)} />
  );
};
Menu.Separator.displayName = 'Menu.Separator';

export default Menu; 