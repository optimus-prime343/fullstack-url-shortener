const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.cyan,
        gray: colors.neutral
      },
      container: {
        screens: {
          '2xl': '1024px',
          xl: '1024px',
          lg: '1024px'
        },
        center: true
      }
    }
  },
  plugins: []
}
