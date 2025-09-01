/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "inncome-cyan": "#00d4aa",
        "inncome-blue-start": "#1e40af",
        "inncome-blue-end": "#1e3a8a",
      },
    },
  },
  plugins: [],
};
