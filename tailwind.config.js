/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cardona: {
          burgundy: '#6b1124',
          burgundyDark: '#4a0a18',
          burgundyLight: '#8b1e35',
          gold: '#d4af37',
          goldLight: '#f3e5ab',
          goldDark: '#aa8214',
          slate: '#1e293b',
          sand: '#fbf9f5',
          stone: '#e7e3dc',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
