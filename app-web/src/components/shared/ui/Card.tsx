import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "green" | "purple" | "red" | "orange";
  title?: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = "", glowColor = "blue", title, icon }) => {
  const getGlowClass = (color: string) => {
    switch (color) {
      case "blue":
        return "shadow-blue-500/20";
      case "green":
        return "shadow-green-500/20";
      case "purple":
        return "shadow-purple-500/20";
      case "red":
        return "shadow-red-500/20";
      case "orange":
        return "shadow-orange-500/20";
      default:
        return "shadow-blue-500/20";
    }
  };

  return (
    <div className={`relative ${className} text-center items-center justify-center`}>
      {/* Main card container */}
      <div className={`relative bg-gradient-to-b from-gray-950 via-blue-950 via-50% to-blue-950 to-40% backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl ${getGlowClass(glowColor)} overflow-hidden`}>
        {/* Content */}
        <div className="relative z-10">
          {title && (
            <div className="flex items-center mb-3 sm:mb-4">
              {icon && (
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mr-3 sm:mr-4 shadow-lg shadow-blue-500/30 border border-blue-400/20">
                  {icon}
                </div>
              )}
              <h3 className="text-white font-semibold text-base sm:text-lg">{title}</h3>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
