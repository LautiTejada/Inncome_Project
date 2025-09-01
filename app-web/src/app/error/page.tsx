import { FiAlertTriangle, FiHome, FiRefreshCw } from 'react-icons/fi';
import { Button } from '@/components';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/25">
          <FiAlertTriangle className="w-10 h-10 text-white" />
        </div>

        {/* Error Content */}
        <h1 className="text-4xl font-bold text-white mb-4">¡Ups!</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">Algo salió mal</h2>
        <p className="text-gray-400 mb-8">
          Ha ocurrido un error inesperado. Por favor, intenta nuevamente o contacta al soporte técnico.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
            <FiRefreshCw className="w-5 h-5 mr-2" />
            Intentar Nuevamente
          </Link>
          
          <Link href="/dashboard">
            <Button
              variant="secondary"
              size="lg"
              icon={<FiHome className="w-5 h-5" />}
            >
              Ir al Dashboard
            </Button>
          </Link>
        </div>

        {/* Error Code */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
          <p className="text-sm text-gray-400">
            Código de error: <span className="font-mono text-gray-300">ERR_500</span>
          </p>
        </div>
      </div>
    </div>
  );
} 