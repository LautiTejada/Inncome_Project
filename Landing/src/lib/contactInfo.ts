// Información de contacto y redes sociales centralizada

export interface MailingAddress {
  line1: string;
  line2: string;
}

export interface SocialLink {
  name: string;
  icon: "Linkedin" | "Facebook" | "Instagram";
  url: string;
}

export const mailingAddress: MailingAddress = {
  line1: "Montevideo 230, piso 7, oficina 4",
  line2: "Ciudad de Mendoza",
};

export const emailAddress: string = "info@inncome.net";

export const phoneNumber: string = "261 386-7452";

export const socialLinks: SocialLink[] = [
  {
    name: "Linkedin",
    icon: "Linkedin",
    url: "https://www.linkedin.com/company/inncome-seguridad/posts/?feedView=all",
  },
  {
    name: "Facebook",
    icon: "Facebook",
    url: "https://www.facebook.com/inncome.seguridad",
  },
  {
    name: "Instagram",
    icon: "Instagram",
    url: "https://www.instagram.com/inncome.seguridad/?igsh=MXFncnU4Y3d2OXc3bQ%3D%3D&utm_source=qr#",
  },
];
