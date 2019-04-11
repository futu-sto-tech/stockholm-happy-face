import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import GlobalStyle from "./components/GlobalStyle";
import { ContextProvider } from "./context/Context";
import * as serviceWorker from "./serviceWorker";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const render = Component => {
  return ReactDOM.render(
    <ContextProvider>
      <GlobalStyle />
      <Component />
    </ContextProvider>,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}
