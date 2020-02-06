import React from 'react';
import theme from '../styles/theme';

type TextColor = 'muted' | 'default' | 'white';
type ThemeColor = 'textMuted' | 'text' | 'textWhite';

function textColorToThemeColor(textColor: TextColor): ThemeColor {
  switch (textColor) {
    case 'default':
      return 'text';
    case 'muted':
      return 'textMuted';
    case 'white':
      return 'textWhite';
  }
}

type TextProps = {
  children?: string;
  size?: 'small' | 'medium' | 'large';
  color?: TextColor;
  truncate?: boolean;
};

const Text: React.FC<TextProps> = ({
  children,
  size = 'small',
  color = 'default',
  truncate = false,
}) => {
  const textThemeColor = textColorToThemeColor(color);
  const textSize = size === 'small' ? 16 : size === 'medium' ? 24 : 32;

  return (
    <p>
      {children}
      <style jsx>{`
        p {
          line-break: 1;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
            Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          margin: 0;
        }
      `}</style>

      <style jsx>{`
        p {
          font-size: ${textSize}px;
          color: ${theme.light.color[textThemeColor]};
          white-space: ${truncate ? 'nowrap' : 'initial'};
          overflow: ${truncate ? 'hidden' : 'initial'};
          text-overflow: ${truncate ? 'ellipsis' : 'initial'};
        }

        @media (prefers-color-scheme: light) {
          p {
            color: ${theme.light.color[textThemeColor]};
          }
        }
        @media (prefers-color-scheme: dark) {
          p {
            color: ${theme.dark.color[textThemeColor]};
          }
        }
      `}</style>
    </p>
  );
};

export default Text;
