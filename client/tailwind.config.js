const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#D0FA3D',
          700: '#8AB100',
        },
        dark: {
          900: '#000000',
          700: '#202125',
          400: '#363D41',
          300: '#717E84',
        },
      },
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
}
