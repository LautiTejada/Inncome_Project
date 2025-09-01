//Archvo con la navegacion para un futuro navBar

import { useEffect, useState } from "react";

const navLinks = [
  { label: "¿Qué es Inncome?", href: "#que-es-inncome" },
  { label: "Servicios", href: "#servicios" },
  { label: "Implementación", href: "#implementacion" },
  { label: "Contacto", href: "#contacto" },
];

interface NavigationProps {
  onLoginClick: () => void;
}

export default function Navigation({ onLoginClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Elimino el estado authOpen y la función setAuthOpen

  // Scroll suave y cambio de hash al hacer clic en el logo
  const handleLogoClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const section = document.getElementById("inicio");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", "#inicio");
    }
    setMenuOpen(false);
  };

  // Detectar scroll para cambiar fondo
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú al navegar
  const handleNavClick = () => setMenuOpen(false);

  // Abrir modal de login
  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    onLoginClick();
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`w-full px-4 py-3 flex items-center justify-between fixed top-0 left-0 z-50 transition-colors duration-500
          ${
            scrolled
              ? "bg-[#00205B] bg-opacity-95 shadow-md"
              : "bg-transparent shadow-none"
          }
          md:py-3
        `}
      >
        {/* Logo */}
        <a
          href="#inicio"
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src="/images/logo/Logo.png"
            alt="Inncome Logo"
            className="w-10 h-10 mr-2"
          />
          <span className="text-white text-2xl font-bold tracking-wide select-none">
            Inncome
          </span>
        </a>
        {/* Links desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white text-base font-medium hover:text-cyan-300 transition-colors duration-200 active:scale-95 active:shadow-lg px-2 py-1 rounded"
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Botón Ingresar desktop */}
        <a
          href="#inicio"
          onClick={handleLogin}
          className="ml-4 px-5 py-2 rounded-lg bg-white text-[#00205B] font-semibold shadow hover:bg-cyan-300 hover:text-[#00205B] transition-colors duration-200 text-base hidden md:inline-block active:scale-95 active:shadow-lg"
        >
          Ingresar
        </a>
        {/* Hamburguesa mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none z-50"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú de navegación"
        >
          <span
            className={`block w-7 h-0.5 bg-white mb-1.5 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-7 h-0.5 bg-white mb-1.5 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-7 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </nav>
      {/* Menú desplegable mobile */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00205B] bg-opacity-95 flex flex-col items-center pt-24 z-40 transition-all duration-300 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className="text-white text-xl font-semibold mb-8 hover:text-cyan-300 transition-colors duration-200 active:scale-95 active:shadow-lg"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#inicio"
            onClick={handleLogin}
            className="px-8 py-3 rounded-lg bg-cyan-400 text-[#00205B] font-semibold shadow hover:bg-cyan-300 hover:text-[#00205B] transition-colors duration-200 text-lg active:scale-95 active:shadow-lg"
          >
            Ingresar
          </a>
        </div>
      )}
      {/* Modal de login/registro (ahora se maneja en App) */}
      {/* Espaciador para que el Hero no quede pegado a la navbar en mobile */}
      <div className="block md:hidden" style={{ height: "64px" }} />
    </>
  );
}
