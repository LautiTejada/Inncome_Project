import React from "react";

interface ButtonGradientProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonGradient: React.FC<ButtonGradientProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-6 py-2 rounded-xl font-bold shadow-md text-white bg-gradient-to-r from-[#0047bb] to-[#041e42] transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0047bb] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonGradient; 