export default function Hero({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <section
      id="inicio"
      className="bg-[#161617] min-h-screen flex items-center justify-center font-poppins"
    >
      <div
        className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto px-2 lg:px-0"
        style={{ minHeight: "70vh" }}
      >
        {/* Columna izquierda */}
        <div className="flex flex-col items-center justify-center w-full max-w-[480px] lg:mr-7 lg:-mt-24 pl-0">
          {/* Logo + texto Inncome */}
          <div className="flex items-center w-full justify-center">
            <img
              src="/images/logo/Logo.png"
              alt="Inncome Logo"
              className="w-[120px] h-[120px]"
            />
            <span className="text-white text-5xl font-semibold tracking-wide -ml-6">
              Inncome
            </span>
          </div>
          {/* Texto descriptivo */}
          <p className="text-white text-base lg:text-lg font-normal leading-snug mt-0 mb-4 text-center max-w-[400px]">
            Controlá ingresos, verificación de seguros y<br />
            cobertura personalizada en tiempo real, todo
            <br />
            desde una sola plataforma.
          </p>
          {/* Botón */}

          <div className="relative mt-6">
            {/* Glow azul del modal */}
            <div
              className="absolute -inset-2 rounded-2xl"
              style={{
                background: "#1E40AF",
                opacity: 0.3,
                filter: "blur(24px)",
              }}
            />
            <button
              onClick={onLoginClick}
              className="relative z-10 w-[260px] py-3 rounded-2xl text-white font-semibold tracking-widest text-lg uppercase border-2 border-[#1E40AF] bg-[#161617] hover:shadow-[0_0_32px_4px_rgba(30,64,175,0.7)] transition-shadow duration-300 transform hover:scale-105 transition-transform"
            >
              <span className="relative z-10">INGRESAR</span>
            </button>
          </div>
        </div>
        {/* Imagen derecha */}
        <div className="flex items-center justify-center w-full max-w-[600px] mt-12 lg:mt-0">
          <img
            src="/images/home/PcBanner.png"
            alt="Laptop con plataforma"
            className="w-full h-auto max-h-[550px] lg:max-h-[580px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
