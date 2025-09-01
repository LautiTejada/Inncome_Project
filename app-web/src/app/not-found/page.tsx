import { FiSearch, FiHome, FiArrowLeft } from 'react-icons/fi';
import { Button } from '@/components';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
          <FiSearch className="w-10 h-10 text-white" />
        </div>

        {/* 404 Content */}
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">Página no encontrada</h2>
        <p className="text-gray-400 mb-8">
          La página que buscas no existe o ha sido movida. Verifica la URL o navega desde el menú principal.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
              <FiHome className="w-5 h-5 mr-2" />
              Ir al Dashboard
            </button>
          </Link>
          
          <Link href="#" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-300 bg-gray-700/50 border border-gray-600/50 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200">
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Volver Atrás
          </Link>
        </div>


        {/* Search Suggestion */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
          <p className="text-sm text-gray-400">
            ¿Buscas algo específico?{' '}
            <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 font-medium">
              Explora nuestro dashboard
            </Link>
          </p>
        </div>

        
        {/* login */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
          <p className="text-sm text-gray-400">
            ¿Buscas algo específico?{' '}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Iniciar sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 