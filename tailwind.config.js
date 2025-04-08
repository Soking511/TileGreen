/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'neue-haas': ['"Neue Haas Display"', 'sans-serif'],
        'inter-display': ['"Inter Display"', 'sans-serif'],
      },
      fontWeight: {
        'light': 500,
        'black': 900
      }
    },
  },
  plugins: [],
}
