module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    textColor: ['hover'],
    scale: ['active'],
    backgroundColor: ['hover', 'active'],
    boxShadow: ['hover', 'active', 'focus'],
    opacity: ['hover', 'group-hover'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
