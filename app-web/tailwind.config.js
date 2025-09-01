/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          celeste: '#59CBE8', // Pantone 305 C
          azul: {
            medio: '#0047BB', // Pantone 2728 C
            oscuro: '#002147', // Pantone 282 C
          },
        },
        blanco: '#FFFFFF',
        gris: {
          claro: '#F4F6FA',
          medio: '#A0AEC0',
        },
        rojo: '#FF4D4F', // Alertas
        verde: '#22C55E', // Éxito
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}; 