import App, { Container } from 'next/app'
import React from 'react'
import { Grommet } from 'grommet'

import GlobalStyle from '../components/global-style'

const theme = {
  global: {
    colors: {
      brand: '#009f77',
      'accent-1': '#ff465a',
      'neutral-1': '#fb8793',
      'accent-2': '#51d0d3',
      'neutral-2': '#cdedfd',
      'accent-3': '#ffcd73',
      'neutral-3': '#fff58b',
      'accent-4': '#000000',
      'neutral-4': '#d9d9d9',
      'status-critical': '#ff465a',
      'status-error': '#ff465a',
      'status-warning': '#ffcd73',
      'status-ok': '#009f77',
      'status-unknown': '#d9d9d9',
      'status-disabled': '#d9d9d9',
    },
    font: {
      size: '14px',
      height: '20px',
    },
  },
}

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Grommet theme={theme}>
          <>
            <GlobalStyle />
            <Component {...pageProps} />
          </>
        </Grommet>
      </Container>
    )
  }
}
