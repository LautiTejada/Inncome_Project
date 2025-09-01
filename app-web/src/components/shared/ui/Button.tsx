import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, icon, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1";

    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/25 border border-blue-400/20 hover:bg-blue-900",
      secondary: "border border-gray-600/50 text-gray-300 hover:bg-gray-700/50",
      danger: "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/25 hover:bg-red-800",
      ghost: "bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors",
      success: "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-lg shadow-green-500/25 border border-green-400/20",
      warning: "bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 shadow-lg shadow-orange-500/25 border border-orange-400/20"
    };

    const sizes = {
      sm: "px-2 sm:px-3 py-1.5 text-xs sm:text-sm",
      md: "px-3 sm:px-4 py-2 text-sm",
      lg: "px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

// Export buttonVariants function for compatibility with shadcn components
export const buttonVariants = ({ variant = 'primary', size = 'md' }: { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'warning'; size?: 'sm' | 'md' | 'lg' } = {}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/25 border border-blue-400/20",
    secondary: "border border-gray-600/50 text-gray-300 hover:bg-gray-700/50",
    danger: "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/25",
    ghost: "bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors",
    success: "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-lg shadow-green-500/25 border border-green-400/20",
    warning: "bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 shadow-lg shadow-orange-500/25 border border-orange-400/20"
  };

  const sizes = {
    sm: "px-2 sm:px-3 py-1.5 text-xs sm:text-sm",
    md: "px-3 sm:px-4 py-2 text-sm",
    lg: "px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base"
  };

  return cn(baseStyles, variants[variant], sizes[size]);
};

export default Button;
