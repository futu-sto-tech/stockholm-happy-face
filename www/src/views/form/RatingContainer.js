import React, { useContext } from "react";

import Context, { ACTION_TYPE } from "../../context/Context";
import Rating from "../rating";

const RatingContainer = () => {
  const { dispatch } = useContext(Context);

  function handleStop(event, ui) {
    // you can only move the marker -32px from the right
    const normalizedX = ui.x / (ui.node.parentNode.clientWidth - 32);
    const normalizedY = ui.y / (ui.node.parentNode.clientHeight - 32);

    dispatch({
      type: ACTION_TYPE.UPDATE_PRODUCTIVITY_POSITIVITY,
      payload: {
        productivity: normalizedX * 10,
        positivity: 10 - normalizedY * 10 // y-axis is flipped
      }
    });
  }

  return (
    <Rating>
      <Rating.DraggableMarker
        onStop={handleStop}
        defaultPosition={{ x: 20, y: 20 }}
      />
    </Rating>
  );
};

export default RatingContainer;
