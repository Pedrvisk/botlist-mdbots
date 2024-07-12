/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        loadingScreen: {
          to: {
            opacity: '0',
            visibility: 'hidden'
          }
        }
      },
      animation: {
        loadingScreen: 'loadingScreen 0.5s forwards'
      }
    }
  },
  plugins: [require('tailwindcss-primeui')]
};
