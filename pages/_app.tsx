import * as gtag from '../src/frontend/gtag';

import GlobalContainer from '../src/frontend/context/global-container';
import GlobalContextContainer from '../src/frontend/context/global-context-container';
import GlobalStyle from '../src/frontend/component/global-style';
import Head from 'next/head';
import NextApp from 'next/app';
import React from 'react';
import Router from 'next/router';

Router.events.on('routeChangeComplete', url => gtag.pageView(url));

class App extends NextApp {
  render(): JSX.Element {
    const { pageProps, Component } = this.props;

    return (
      <GlobalContainer>
        <Head>
          <title>Smileys</title>
        </Head>
        <GlobalStyle />
        <GlobalContextContainer>
          <Component {...pageProps} />
        </GlobalContextContainer>
      </GlobalContainer>
    );
  }
}

export default App;
