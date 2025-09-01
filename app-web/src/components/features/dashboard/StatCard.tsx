import React from "react";
import Card from "../../shared/ui/Card";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  glowColor: "blue" | "green" | "purple" | "red";
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  glowColor,
  className = "",
}) => {
  return (
    <Card
      glowColor={glowColor}
      className={`text-center ${className}`}>
      <div className="flex m-auto items-center justify-center w-16 h-16 bg-gradient-to-t from-blue-950 to-blue-800 rounded-xl mb-4 shadow-lg shadow-blue-500/30 border border-blue-400/20">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-300 mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </Card>
  );
};

export default StatCard;
