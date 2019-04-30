import React, { useContext, useEffect } from "react";

import Context from "../../context/Context";
import { deleteEntry, fetchUserEntries } from "../../context/actions";
import Page from "./Page";

const EntryPageContainer = () => {
  let { state, dispatch } = useContext(Context);

  useEffect(() => {
    fetchUserEntries(state, dispatch);
  }, [state.user.id]);

  return (
    <Page
      entry={state.currentEntry}
      onDelete={() => deleteEntry(state, dispatch)}
      loading={state.loadingDeleteEntry}
      entries={state.userEntries}
      loadingEntries={state.loadingUserEntries}
    />
  );
};

export default EntryPageContainer;
