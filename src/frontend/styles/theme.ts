const lightTheme = {
  color: {
    text: '#101010',
    textMuted: '#888',
    textWhite: '#fff',
    background: '#fafafa',
    success: '#1DE9B6',
    successDark: '#00BFA5',
    warning: '#FF9100',
    warningDark: '#FF6D00',
    danger: '#FF3D00',
    dangerDark: '#DD2C00',
    neutral: 'rgb(230, 230, 230)',
    neutralDark: 'rgb(210, 210, 210)',
  },
  elevation: {
    level0: 'rgba(0, 0, 0, 0)',
    level1: 'rgba(0, 0, 0, 0.05)',
    level2: 'rgba(0, 0, 0, 0.07)',
    level3: 'rgba(0, 0, 0, 0.08)',
    level4: 'rgba(0, 0, 0, 0.09)',
    level5: 'rgba(0, 0, 0, 0.11)',
  },
};

export type StyleTheme = typeof lightTheme;

const darkTheme: StyleTheme = {
  color: {
    background: '#121212',
    text: '#fafafa',
    textMuted: '#888',
    textWhite: '#fff',
    success: '#1de9b6',
    successDark: '#1de9b6',
    warning: '#FF6D00',
    warningDark: '#E65100',
    danger: '#F4511E',
    dangerDark: '#e91d1d',
    neutral: 'rgb(60, 60, 60)',
    neutralDark: 'rgb(80, 80, 80)',
  },
  elevation: {
    level0: 'rgba(255, 255, 255, 0)',
    level1: 'rgba(255, 255, 255, 0.05)',
    level2: 'rgba(255, 255, 255, 0.07)',
    level3: 'rgba(255, 255, 255, 0.08)',
    level4: 'rgba(255, 255, 255, 0.09)',
    level5: 'rgba(255, 255, 255, 0.11)',
  },
};

const theme = { light: lightTheme, dark: darkTheme };

export default theme;
