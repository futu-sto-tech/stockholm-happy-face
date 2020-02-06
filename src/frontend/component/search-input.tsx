import React from 'react';
import theme from '../styles/theme';

type SearchInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const SearchInput: React.FC<SearchInputProps> = props => {
  return (
    <>
      <input className="input" {...props} />
      <style jsx>{`
        .input {
          height: 56px;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0 24px;
          border: 0;
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          margin: 0;
          border-radius: 40px;
          width: 100%;
          color: ${theme.light.color.text};
          background-color: ${theme.light.color.neutral};
        }
        .input:focus {
          background-color: ${theme.light.color.neutralDark};
        }

        @media (prefers-color-scheme: light) {
          .input {
            color: ${theme.light.color.text};
            background-color: ${theme.light.color.neutral};
          }
          .input:focus {
            background-color: ${theme.light.color.neutralDark};
          }
        }
        @media (prefers-color-scheme: dark) {
          .input {
            color: ${theme.dark.color.text};
            background-color: ${theme.dark.color.neutral};
          }
          .input:focus {
            background-color: ${theme.dark.color.neutralDark};
          }
        }
      `}</style>
    </>
  );
};

export default SearchInput;
