import React from 'react';
import Text from './text';
import theme from '../styles/theme';

const ErrorBox: React.FC<{ children: string }> = ({ children }) => {
  return (
    <div className="error-box">
      <Text size="small" color="white">
        {children}
      </Text>

      <style jsx>{`
        .error-box {
          height: 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: ${theme.light.color.warning};
          border-radius: ${56 / 2}px;
          padding: 0 24px;
        }

        @media (prefers-color-scheme: light) {
          .error-box {
            background-color: ${theme.light.color.warning};
          }
        }
        @media (prefers-color-scheme: dark) {
          .error-box {
            background-color: ${theme.dark.color.warning};
          }
        }
      `}</style>
    </div>
  );
};

export default ErrorBox;
