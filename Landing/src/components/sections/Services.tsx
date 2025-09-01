import { useEffect } from "react";

declare global {
  interface Window {
    AOS?: { refresh: () => void };
  }
}

export default function Services() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.refresh();
    }
  }, []);
  return (
    <section id="servicios" className="px-4 py-16 bg-[#161617] font-poppins">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Nuestros Servicios
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Tarjeta 1 */}
          <div
            className="bg-gradient-to-b from-[#001c3c] via-[#002e5c] to-[#003e7c] rounded-xl p-4 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] w-full cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <img
              src="/images/iconos/candado.png"
              alt="Candado: Control de ingresos y egresos en tiempo real."
              className="w-14 h-14 mb-6 object-contain"
              loading="lazy"
            />
            <p className="text-center text-lg font-semibold leading-snug">
              Control de <br />
              ingresos y egresos <br />
              en tiempo real.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div
            className="bg-gradient-to-b from-[#001c3c] via-[#002e5c] to-[#003e7c] rounded-xl p-4 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] w-full cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src="/images/iconos/Cobertura.png"
              alt="Cobertura: Verificación automática de seguros."
              className="w-14 h-14 mb-6 object-contain"
              loading="lazy"
            />
            <p className="text-center text-lg font-semibold leading-snug">
              Verifica <br />
              automáticamente si hay <br />
              cobertura de seguros activa.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div
            className="bg-gradient-to-b from-[#001c3c] via-[#002e5c] to-[#003e7c] rounded-xl p-4 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] w-full cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img
              src="/images/iconos/Seguros.png"
              alt="Seguros: Contratación de seguros por día."
              className="w-14 h-14 mb-6 object-contain"
              loading="lazy"
            />
            <p className="text-center text-lg font-semibold leading-snug">
              Permite la <br />
              contratación de <br />
              seguros por día.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
