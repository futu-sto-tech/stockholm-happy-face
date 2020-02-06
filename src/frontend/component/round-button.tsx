import { IconType } from 'react-icons/lib/cjs';
import React from 'react';
import theme from '../styles/theme';

type ButtonType = 'DANGER' | 'SUCCESS' | 'NEUTRAL';
type ThemeColor = 'danger' | 'success' | 'neutral';
type DarkThemeColor = 'dangerDark' | 'successDark' | 'neutralDark';

function buttonTypeToColor(buttonType: ButtonType): { default: ThemeColor; dark: DarkThemeColor } {
  switch (buttonType) {
    case 'DANGER':
      return { default: 'danger', dark: 'dangerDark' };
    case 'SUCCESS':
      return { default: 'success', dark: 'successDark' };
    case 'NEUTRAL':
      return { default: 'neutral', dark: 'neutralDark' };
  }
}

type RoundButtonProps = React.ComponentProps<'button'> & {
  buttonType?: ButtonType;
  IconComponent: IconType;
};

const RoundButton: React.FC<RoundButtonProps> = ({
  buttonType = 'NEUTRAL',
  IconComponent,
  ...buttonProps
}) => {
  const buttonColor = buttonTypeToColor(buttonType);

  return (
    <button className="button" {...buttonProps}>
      <IconComponent size="90%" color="white" />

      <style jsx>{`
        .button {
          height: 56px;
          width: 56px;
          border-radius: 56px;
          border: 0;
          flex-shrink: 0;
          cursor: pointer;

          display: flex;
          justify-content: center;
          align-items: center;
        }
        .button:disabled {
          opacity: 0.4;
        }

        @media (prefers-color-scheme: light) {
          .button {
            background-color: ${theme.light.color[buttonColor.default]};
          }
          .button:not(:disabled):hover {
            background-color: ${theme.light.color[buttonColor.dark]};
          }
        }
        @media (prefers-color-scheme: dark) {
          .button {
            background-color: ${theme.dark.color[buttonColor.default]};
          }
          .button:not(:disabled):hover {
            background-color: ${theme.dark.color[buttonColor.dark]};
          }
        }
      `}</style>
    </button>
  );
};

export default RoundButton;
