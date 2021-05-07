module.exports = {
  purge: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{js,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },

    extend: {},
  },
}
