import React from "react";
import Link from "next/link";
import Card from "../../shared/ui/Card";

interface UserCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  glowColor: "blue" | "green" | "purple" | "red";
  href: string;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  title,
  description,
  icon,
  glowColor,
  href,
  className = "",
}) => {
  return (
    <Link href={href} className="group block">
      <Card
        glowColor={glowColor}
        className={`text-center group-hover:scale-105 transition-transform duration-300 ${className}`}>
        <div className="flex m-auto items-center justify-center w-16 h-16 bg-gradient-to-t from-blue-950 to-blue-800 rounded-xl mb-4 shadow-lg shadow-blue-500/30 border border-blue-400/20">
          {icon}
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </Card>
    </Link>
  );
};

export default UserCard;
