module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    textColor: ['hover'],
    scale: ['active'],
    backgroundColor: ['hover', 'active'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
