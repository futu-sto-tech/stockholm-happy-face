import axios from "axios";

import { ACTION_TYPE } from "./Context";

export const login = async (state, dispatch) => {
  dispatch({ type: ACTION_TYPE.START_LOGIN });

  try {
    const response = await axios.get(
      `https://smileys-api.now.sh/users/name/${state.username}`
    );

    if (response.data) {
      const entryResponse = await axios.get(
        "https://smileys-api.now.sh/entries",
        { params: { user: response.data.id } }
      );

      if (entryResponse.data.length > 0) {
        const entryId = entryResponse.data[0].id;
        const url = `https://smileys-api.now.sh/entries/${entryId}`;
        dispatch({
          type: ACTION_TYPE.UPDATE_CURRENT_ENTRY,
          payload: { entry: (await axios.get(url)).data }
        });
      }

      dispatch({
        type: ACTION_TYPE.COMPLETE_LOGIN,
        payload: { user: response.data }
      });
    } else {
      try {
        const response = await axios.post("https://smileys-api.now.sh/users", {
          name: state.username
        });
        dispatch({
          type: ACTION_TYPE.COMPLETE_LOGIN,
          payload: { user: response.data }
        });
      } catch (error) {
        dispatch({ type: ACTION_TYPE.FAIL_LOGIN });
      }
    }
  } catch (error) {
    dispatch({ type: ACTION_TYPE.FAIL_LOGIN });
  }
};

export const submitEntry = async (state, dispatch) => {
  dispatch({ type: ACTION_TYPE.START_SAVE_ENTRY });

  try {
    const { id, ...giphyData } = state.selectedGif;
    const response = await axios.post("https://smileys-api.now.sh/entries", {
      user: state.user.id,
      gif: { giphyId: id, ...giphyData }
    });
    dispatch({
      type: ACTION_TYPE.COMPLETE_SAVE_ENTRY,
      payload: { entry: response.data }
    });
  } catch (error) {
    dispatch({ type: ACTION_TYPE.FAIL_SAVE_ENTRY });
  }
};

export const deleteEntry = async (state, dispatch) => {
  dispatch({ type: ACTION_TYPE.START_DELETE_ENTRY });

  try {
    const url = `https://smileys-api.now.sh/entries/${state.currentEntry.id}`;
    await axios.delete(url);
    dispatch({ type: ACTION_TYPE.COMPLETE_DELETE_ENTRY });
  } catch (error) {
    dispatch({ type: ACTION_TYPE.FAIL_DELETE_ENTRY });
  }
};
