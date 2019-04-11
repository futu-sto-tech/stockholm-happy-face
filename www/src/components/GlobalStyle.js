import { createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    background-color: #33b9d2;
  }

  html, body, pre, code, kbd, samp {
    font-family: "Press Start 2P", cursive;
    color: #fff;
  }

  input {
    -webkit-appearance: none;
  }
`;

export default GlobalStyle;
