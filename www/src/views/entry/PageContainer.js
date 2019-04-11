import React, { useContext } from "react";

import Context from "../../context/Context";
import { deleteEntry } from "../../context/actions";
import Page from "./Page";

const EntryPageContainer = () => {
  let { state, dispatch } = useContext(Context);

  return (
    <Page
      entry={state.currentEntry}
      onDelete={() => deleteEntry(state, dispatch)}
      loading={state.loadingDeleteEntry}
    />
  );
};

export default EntryPageContainer;
