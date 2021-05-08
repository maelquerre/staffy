const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{js,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },

    extend: {},
  },
}
