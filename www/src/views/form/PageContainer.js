import React, { useContext } from "react";

import Context, { ACTION_TYPE } from "../../context/Context";
import { submitEntry } from "../../context/actions";
import GifStep from "./GifStep";
import RatingStep from "./RatingStep";

const FormPageContainer = () => {
  let { state, dispatch } = useContext(Context);

  // if (state.hasEnteredGif) {
  //   return (
  //     <RatingStep
  //       onSubmit={() => submitEntry(state, dispatch)}
  //       loading={state.loadingSaveEntry}
  //     />
  //   );
  // }

  return (
    <GifStep
      onSubmit={event => {
        event.preventDefault();
        dispatch({ type: ACTION_TYPE.COMPLETE_SELECT_GIF });
        submitEntry(state, dispatch)
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
