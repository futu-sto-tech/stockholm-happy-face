import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import { debounce } from "../../utils";
import Context, { ACTION_TYPE } from "../../context/Context";
import ResultList from "./styled/ResultList";

const ResultListContainer = () => {
  const [results, setResults] = useState([]);
  const { state, dispatch } = useContext(Context);

  async function fetchResults() {
    try {
      const response = await axios.get(
        "https://smileys-api.now.sh/gif/search",
        { params: { query: state.gifQuery } }
      );
      setResults(response.data.images);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (state.gifQuery.length === 0) {
      setResults([]);
    } else if (state.gifQuery.length > 2) {
      debounce(fetchResults(), 250);
    }
  }, [state.gifQuery]);

  return (
    <ResultList>
      {results.map(result => (
        <ResultList.Item
          key={result.id}
          selected={state.selectedGif.url === result.original.url}
        >
          <img
            src={result.original.url}
            onClick={() =>
              dispatch({
                type: ACTION_TYPE.UPDATE_SELECTED_GIF,
                payload: { gif: { id: result.id, ...result.original } }
              })
            }
            alt={result.title}
          />
        </ResultList.Item>
      ))}
    </ResultList>
  );
};

export default ResultListContainer;
