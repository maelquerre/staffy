const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
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
      green: colors.green,
      red: colors.red,
      accent: {
        DEFAULT: colors.red['500'],
        light: colors.red['400'],
        dark: colors.red['600'],
      },
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },

    extend: {
      zIndex: {
        dropdown: 1000,
        modal: 1020,
      },
    },
  },
}
