import React, { useContext } from "react";

import Context, { ACTION_TYPE } from "../../context/Context";
import Form from "./styled/Form";

const SearchBoxContainer = () => {
  let { state, dispatch } = useContext(Context);

  return (
    <Form.Input
      type="search"
      placeholder="Search..."
      value={state.gifQuery}
      onChange={({ target: { value } }) =>
        dispatch({
          type: ACTION_TYPE.UPDATE_GIF_QUERY,
          payload: { query: value }
        })
      }
    />
  );
};

export default SearchBoxContainer;
