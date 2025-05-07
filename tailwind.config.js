/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
    extend: {
      fontFamily: {
        haas: ['"Neue Haas Grotesk Display Pro"', 'sans-serif'],
      },
      keyframes: {

        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        loadingProgress: {
          '0%': { width: '0' },
          '50%': { width: '70%' },
          '100%': { width: '100%' },
        },

      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards',
        fadeOut: 'fadeOut 1s ease-in-out forwards',
        loadingBar: 'loadingProgress 0.8s ease-in-out',
      },
    },
  },
  plugins: [],
  // Performance optimization
  future: {
    hoverOnlyWhenSupported: true,
    disableColorOpacityUtilitiesByDefault: true,
  },
}
