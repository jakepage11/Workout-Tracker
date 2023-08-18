/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      'sm': '200px',
      'md': '600px',
      'lg': '800px',
      'xl': '1000px'
    },
    extend: {
      colors: {
        'pink': '#FFBAB7',
        'blue': '#141349',
        'gray': '#D9D9D9'
      }
    },
  },
  plugins: [],
}
