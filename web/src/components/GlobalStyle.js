import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  #__next {
    height: 100vh;
  }

  body {
    background-color: ${props => props.theme.colors.background};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  .bt-toast {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
    background-color: #00d166;
    padding: 16px;
    border-radius: 4px;
    width: ${props => props.theme.layout.main.width};
    text-align: center;
    font-weight: 500;
  }
`;

export default GlobalStyle;
