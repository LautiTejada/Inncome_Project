import React from 'react';

export default function EstablecimientosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950/30 via-blue-950 to-gray-950/30 rounded-3xl">
      <div className="h-full p-6">
        {children}
      </div>
    </div>
  );
}
