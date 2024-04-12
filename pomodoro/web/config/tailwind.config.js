/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      borderWidth: {
        '8': '8px',
      },
      transitionDuration: {
        '2000': '2000ms', // Adds a custom duration of 2000ms
        '3000': '3000ms', // Adds a custom duration of 3000ms
        '4000': '4000ms', // Adds a custom duration of 4000ms
        '5000': '5000ms', // Adds a custom duration of 5000ms
      }
    },
  },
  plugins: [],
}

