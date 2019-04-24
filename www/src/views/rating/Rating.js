import React from "react";
import Draggable from "react-draggable";

import Area from "./styled/Area";
import Axis from "./styled/Axis";
import Marker from "./styled/Marker";

const Rating = ({ children, ...props }) => (
  <Area {...props}>
    <Axis.Y />
    <Axis.LabelY>Positivity</Axis.LabelY>
    <Axis.X />
    <Axis.LabelX>Productivity</Axis.LabelX>

    {children}
  </Area>
);

Rating.Marker = props => (
  <Marker.Wrapper {...props}>
    <Marker />
  </Marker.Wrapper>
);

Rating.DraggableMarker = props => (
  <Draggable bounds="parent" {...props}>
    <Rating.Marker />
  </Draggable>
);

export default Rating;
