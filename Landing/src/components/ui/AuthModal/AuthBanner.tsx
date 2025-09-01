import React from "react";

interface AuthBannerProps {
  message: string;
  type: "error" | "success";
}

const AuthBanner: React.FC<AuthBannerProps> = ({ message, type }) => {
  return (
    <div
      className={`w-full text-white text-center rounded-lg py-2 px-4 mb-2 animate-fadeIn border shadow ${
        type === "error"
          ? "bg-red-500/90 border-red-700"
          : "bg-green-500/90 border-green-700"
      }`}
    >
      {message}
    </div>
  );
};

export default AuthBanner;
