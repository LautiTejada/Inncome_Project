import { useEffect } from "react";

declare global {
  interface Window {
    AOS?: { refresh: () => void };
  }
}

export default function About() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.refresh();
    }
  }, []);
  return (
    <section
      id="que-es-inncome"
      className="px-6 py-20 lg:px-20"
      style={{ backgroundColor: "#161617" }}
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Texto */}
        <div className="text-center lg:text-left space-y-8 mt-16 lg:mt-24 ml-0 lg:ml-8 flex flex-col items-center lg:items-start w-full">
          <h2 className="text-4xl font-extrabold text-white w-full lg:w-auto">
            ¿Qué es Inncome?
          </h2>

          <p className="text-gray-200 leading-relaxed text-base sm:text-lg mt-4 max-w-full lg:max-w-sm text-center lg:text-justify">
            Inncome es una plataforma que digitaliza el control de acceso y
            permite gestionar coberturas de seguros por día en tiempo real. Está
            diseñada para comunidades countries, obras, clubes y empresas que
            buscan seguridad sin fricción y total trazabilidad.
          </p>
        </div>

        {/* Fotos del equipo */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div
              className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl p-[3px]"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img
                src="/images/teamPhotos/PrimeraImagen.jpg"
                alt="Foto del equipo: Persona 1"
                className="w-full h-72 object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
            <div
              className="bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-2xl p-[3px]"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="/images/teamPhotos/SegundaImagen.jpg"
                alt="Foto del equipo: Persona 2"
                className="w-full h-72 object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <div
              className="bg-gradient-to-br from-green-500/10 to-teal-600/10 rounded-2xl p-[3px]"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img
                src="/images/teamPhotos/TerceraImagen.jpg"
                alt="Foto del equipo: Persona 3"
                className="w-full h-72 object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
            <div
              className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-2xl p-[3px]"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <img
                src="/images/teamPhotos/CuartaImagen.png"
                alt="Foto del equipo: Persona 4"
                className="w-full h-72 object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
