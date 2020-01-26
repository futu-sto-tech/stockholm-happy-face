import React from 'react';
import theme from '../styles/theme';

const GlobalStyle: React.FC = () => {
  return (
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        padding: 0;
        margin: 0;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
      }

      @media (prefers-color-scheme: light) {
        body {
          background-color: ${theme.light.color.background};
        }
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: ${theme.dark.color.background};
        }
      }
    `}</style>
  );
};

export default GlobalStyle;
