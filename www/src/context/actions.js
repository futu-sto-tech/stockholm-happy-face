import apiClient from "../api";
import { ACTION_TYPE } from "./Context";

export const login = async (state, dispatch) => {
  dispatch({ type: ACTION_TYPE.START_LOGIN });

  try {
    const response = await apiClient.get(`/users/name/${state.username}`);

    if (response.data) {
      const entryResponse = await apiClient.get("/entries", {
        params: { user: response.data.id, week: "current" }
      });

      if (entryResponse.data.length > 0) {
        dispatch({
          type: ACTION_TYPE.UPDATE_CURRENT_ENTRY,
          payload: { entry: entryResponse.data[0] }
        });
      }

      dispatch({
        type: ACTION_TYPE.COMPLETE_LOGIN,
        payload: { user: response.data }
      });
    } else {
      try {
        const response = await apiClient.post("/users", {
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
    const response = await apiClient.post("/entries", {
      user: state.user.id,
      gif: { giphyId: id, ...giphyData },
      productivity: state.productivity,
      positivity: state.positivity
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
    const url = `/entries/${state.currentEntry.id}`;
    await apiClient.delete(url);
    dispatch({ type: ACTION_TYPE.COMPLETE_DELETE_ENTRY });
  } catch (error) {
    dispatch({ type: ACTION_TYPE.FAIL_DELETE_ENTRY });
  }
};
