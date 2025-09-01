import { Linkedin, Facebook, Instagram } from "lucide-react";
import {
  mailingAddress,
  emailAddress,
  phoneNumber,
  socialLinks,
} from "../../lib/contactInfo";

export default function Contact() {
  const iconMap = { Linkedin, Facebook, Instagram };
  return (
    <section id="contacto" className="px-6 py-16 lg:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-cyan-400 text-center lg:text-left mb-8">
          Contactanos
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              {socialLinks.map(({ name, icon, url }) => {
                const Icon = iconMap[icon as keyof typeof iconMap];
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{name}</span>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                Dirección
              </h3>
              <p className="text-gray-400">{mailingAddress.line1}</p>
              <p className="text-gray-400">{mailingAddress.line2}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Email </h3>
              <p className="text-gray-400">{emailAddress}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                Número de teléfono
              </h3>
              <p className="text-gray-400">{phoneNumber}</p>
            </div>
          </div>
        </div>
        {/* Derechos reservados */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Inncome. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </section>
  );
}
