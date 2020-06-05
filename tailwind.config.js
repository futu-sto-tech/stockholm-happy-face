module.exports = {
  purge: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundOpacity: {
        '10': '0.1',
      },
      borderOpacity: {
        '10': '0.1',
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
      },
    },
  },
  variants: {
    textColor: ['hover', 'group-hover'],
    scale: ['active'],
    backgroundColor: ['hover', 'active'],
    boxShadow: ['hover', 'active', 'focus'],
    opacity: ['hover', 'group-hover', 'disabled'],
    padding: ['hover'],
    display: ['responsive'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
