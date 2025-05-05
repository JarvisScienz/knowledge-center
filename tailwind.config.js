/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // dark mode gestita con classe "dark"
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], // Font figo
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blu primario (puoi cambiarlo se vuoi)
          dark: '#1e40af',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // plugin per avere "prose" migliorato
  ],
}
