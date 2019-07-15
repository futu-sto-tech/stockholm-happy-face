import { createGlobalStyle } from 'styled-components'

import 'sanitize.css'
import 'sanitize.css/typography.css'
import 'sanitize.css/forms.css'

const GlobalStyle = createGlobalStyle`
  #__next, html, body {
    height: 100%;
  }

  body {
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -webkit-touch-callout: none;

    font-family: -apple-system, BlinkMacSystemFont,
      "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans",
      "Droid Sans", "Helvetica Neue", sans-serif;
  }

  input {
    -webkit-appearance: none;
  }
`

export default GlobalStyle
