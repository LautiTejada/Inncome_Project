import React from "react";
import Link from "next/link";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  glowColor: "blue" | "green" | "purple" | "red" | "orange";
  primaryButton: {
    text: string;
    href?: string;
    onClick?: () => void;
    badge?: React.ReactNode;
  };
  secondaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
    badge?: React.ReactNode;
  };
  tertiaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
    badge?: React.ReactNode;
  };
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  glowColor,
  primaryButton,
  secondaryButton,
  tertiaryButton,
  className = "",
}) => {
  return (
    <Card
      glowColor={glowColor}
      className={className}>
      <div className="flex m-auto items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-t from-blue-950 to-blue-800 rounded-xl mb-3 sm:mb-4 shadow-lg shadow-blue-500/30 border border-blue-400/20">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-base sm:text-lg mb-2">{title}</h3>
      <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">{description}</p>
      <div className="space-y-2">
        {primaryButton.href ? (
          <Link href={primaryButton.href} className="block relative">
            {primaryButton.badge && (
              <div className="absolute -top-2 -right-2 z-10">
                {primaryButton.badge}
              </div>
            )}
            <Button
              variant="primary"
              size="sm"
              className="w-full">
              <div className="flex items-center justify-center">
                {primaryButton.text}
              </div>
            </Button>
          </Link>
        ) : (
          <div className="relative">
            {primaryButton.badge && (
              <div className="absolute -top-2 -right-2 z-10">
                {primaryButton.badge}
              </div>
            )}
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={primaryButton.onClick}>
              <div className="flex items-center justify-center">
                {primaryButton.text}
              </div>
            </Button>
          </div>
        )}
        {secondaryButton && (
          secondaryButton.href ? (
            <Link href={secondaryButton.href} className="block relative">
              {secondaryButton.badge && (
                <div className="absolute -top-2 -right-2 z-10">
                  {secondaryButton.badge}
                </div>
              )}
              <Button
                variant="secondary"
                size="sm"
                className="w-full">
                <div className="flex items-center justify-center">
                  {secondaryButton.text}
                </div>
              </Button>
            </Link>
          ) : (
            <div className="relative">
              {secondaryButton.badge && (
                <div className="absolute -top-2 -right-2 z-10">
                  {secondaryButton.badge}
                </div>
              )}
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={secondaryButton.onClick}>
                <div className="flex items-center justify-center">
                  {secondaryButton.text}
                </div>
              </Button>
            </div>
          )
        )}
        {tertiaryButton && (
          tertiaryButton.href ? (
            <Link href={tertiaryButton.href} className="block relative">
              {tertiaryButton.badge && (
                <div className="absolute -top-2 -right-2 z-10">
                  {tertiaryButton.badge}
                </div>
              )}
              <Button
                variant="secondary"
                size="sm"
                className="w-full">
                <div className="flex items-center justify-center">
                  {tertiaryButton.text}
                </div>
              </Button>
            </Link>
          ) : (
            <div className="relative">
              {tertiaryButton.badge && (
                <div className="absolute -top-2 -right-2 z-10">
                  {tertiaryButton.badge}
                </div>
              )}
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={tertiaryButton.onClick}>
                <div className="flex items-center justify-center">
                  {tertiaryButton.text}
                </div>
              </Button>
            </div>
          )
        )}
      </div>
    </Card>
  );
};

export default DashboardCard;
