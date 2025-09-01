import type { Metadata } from 'next';
import './styles/globals.css';
import { ModeProvider } from '@/contexts/ModeContext';
import { FormProvider } from '@/contexts/FormContext';
import { NewFeaturesProvider } from '@/contexts/NewFeaturesContext';

export const metadata: Metadata = {
  title: 'Inncome',
  description: 'Plataforma de gestión de seguros Inncome',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-poppins antialiased">
        <ModeProvider>
          <FormProvider>
            <NewFeaturesProvider>
              {children}
            </NewFeaturesProvider>
          </FormProvider>
        </ModeProvider>
      </body>
    </html>
  );
} 