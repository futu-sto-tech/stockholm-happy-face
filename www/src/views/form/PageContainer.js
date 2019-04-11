import React, { useContext } from "react";

import Context, { ACTION_TYPE } from "../../context/Context";
import { submitEntry } from "../../context/actions";
import Page from "./Page";

const FormPageContainer = () => {
  let { state, dispatch } = useContext(Context);

  return (
    <Page
      onSubmit={event => {
        event.preventDefault();
        submitEntry(state, dispatch);
      }}
      loading={state.loadingSaveEntry}
      url={state.selectedGif.url}
      onChangeUrl={({ target: { value } }) =>
        dispatch({
          type: ACTION_TYPE.UPDATE_GIF_URL,
          payload: { url: value }
        })
      }
    />
  );
};

export default FormPageContainer;
