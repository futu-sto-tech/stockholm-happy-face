const BASE_SPACING = 24

export default {
  global: {
    colors: {
      background: '#121212',
      black: '#000000',
      white: '#ffffff',
      brand: 'rgb(0, 159, 119)',
      status: {
        critical: '#cf6679',
        warning: '#FF856B',
        ok: '#4EB976',
        unknown: '#a8a8a8',
        disabled: '#a8a8a8',
      },
      text: {
        high: 'rgba(255, 255, 255, 0.87)',
        medium: 'rgba(255, 255, 255, 0.60)',
        disabled: 'rgba(255, 255, 255, 0.38)',
      },
      placeholder: 'rgba(255, 255, 255, 0.38)',
      elevation: [
        'rgba(255, 255, 255, 0)',
        'rgba(255, 255, 255, 0.05)',
        'rgba(255, 255, 255, 0.07)',
        'rgba(255, 255, 255, 0.08)',
        'rgba(255, 255, 255, 0.09)',
        'rgba(255, 255, 255, 0.11)',
        'rgba(255, 255, 255, 0.12)',
        'rgba(255, 255, 255, 0.14)',
        'rgba(255, 255, 255, 0.15)',
        'rgba(255, 255, 255, 0.16)',
      ],
    },
    size: {
      xxsmall: BASE_SPACING * 2, // 48
      xsmall: BASE_SPACING * 4, // 96
      small: BASE_SPACING * 8, // 192
      medium: BASE_SPACING * 16, // 384
      large: BASE_SPACING * 32, // 768
      xlarge: BASE_SPACING * 48, // 1152
      xxlarge: BASE_SPACING * 64, // 1536
      full: '100%',
    },
    space: {
      none: 0,
      xxsmall: BASE_SPACING / 8, // 3
      xsmall: BASE_SPACING / 4, // 6
      small: BASE_SPACING / 2, // 12
      medium: BASE_SPACING, // 24
      large: BASE_SPACING * 2, // 48
      xlarge: BASE_SPACING * 4, // 96
    },
    font: {
      size: {
        xsmall: 12,
        small: 14,
        regular: 16,
        medium: 18,
        large: 22,
        xlarge: 26,
        xxlarge: 34,
      },
    },
  },
}
