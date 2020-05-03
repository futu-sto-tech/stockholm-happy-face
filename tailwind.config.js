module.exports = {
  purge: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundOpacity: {
        '10': '0.1',
      },
    },
  },
  variants: {
    textColor: ['hover'],
    scale: ['active'],
    backgroundColor: ['hover', 'active'],
    boxShadow: ['hover', 'active', 'focus'],
    opacity: ['hover', 'group-hover', 'disabled'],
    padding: ['hover'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
