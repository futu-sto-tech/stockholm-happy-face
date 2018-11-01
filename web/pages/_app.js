import React from "react";
import App, { Container } from "next/app";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import ButterToast, { POS_BOTTOM, POS_CENTER } from "butter-toast";

import theme from "../src/theme";
import GlobalStyle from "../src/components/GlobalStyle";
import { initStore } from "../src/redux/store";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              <Component {...pageProps} />
              <ButterToast
                position={{
                  vertical: POS_BOTTOM,
                  horizontal: POS_CENTER
                }}
              />
            </>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);
