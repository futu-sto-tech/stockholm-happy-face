import React from 'react';
import theme from '../styles/theme';

const FixedBottom: React.FC = ({ children }) => {
  return (
    <div className="footer-wrapper">
      <div className="footer">{children}</div>

      <style jsx>{`
        .footer-wrapper {
          position: fixed;
          right: 0;
          left: 0;
          bottom: 0;

          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
          z-index: 999;
        }
        .footer {
          transition: padding-bottom 0.3s;
          padding: 16px;
          padding-bottom: calc(16px + env(safe-area-inset-bottom) / 2);
        }

        @media (prefers-color-scheme: light) {
          .footer-wrapper {
            background-color: ${theme.light.color.background};
          }
        }
        @media (prefers-color-scheme: dark) {
          .footer-wrapper {
            background-color: ${theme.dark.color.background};
          }
          .footer {
            background-color: ${theme.dark.elevation.level1};
          }
        }
      `}</style>
    </div>
  );
};

export default FixedBottom;
