import React, { useContext, useEffect } from "react";

import Context, { ACTION_TYPE } from "../../context/Context";
import Rating from "../rating";

const RatingContainer = () => {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    document.getElementById("rating-area").addEventListener(
      "touchmove",
      function(event) {
        event.preventDefault();
      },
      false
    );
  }, []);

  function handleStop(event, ui) {
    // you can only move the marker -32px from the right
    const normalizedX = ui.x / (ui.node.parentNode.clientWidth - 32);
    const normalizedY = ui.y / (ui.node.parentNode.clientHeight - 32);

    dispatch({
      type: ACTION_TYPE.UPDATE_PRODUCTIVITY_POSITIVITY,
      payload: {
        productivity: normalizedX * 10 - 5,
        positivity: 5 - normalizedY * 10 // y-axis is flipped
      }
    });
  }

  return (
    <Rating id="rating-area">
      <Rating.DraggableMarker
        onStop={handleStop}
        defaultPosition={{ x: 20, y: 20 }}
      />
    </Rating>
  );
};

export default RatingContainer;
