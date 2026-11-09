/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3757B6',
          green: '#50AC49',
          yellow: '#EFC43D',
          dark: '#1B1B1D',
          navy: '#16213F',
        }
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Arial', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
