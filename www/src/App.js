import React, { useContext } from "react";

import Context from "./context/Context";
import LoginPage from "./views/login";
import Navigation from "./views/navigation";
import FormPage from "./views/form";
import EntryPage from "./views/entry";

const App = () => {
  let { state } = useContext(Context);

  if (state.user) {
    return (
      <Navigation>
        {state.currentEntry ? <EntryPage /> : <FormPage />}
      </Navigation>
    );
  }

  return <LoginPage />;
};

export default App;
