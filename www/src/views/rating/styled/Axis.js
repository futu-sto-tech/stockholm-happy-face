import styled from "styled-components/macro";

const Axis = styled.div`
  position: absolute;
`;

Axis.Y = styled(Axis)`
  top: 26px;
  bottom: 8px;
  left: calc(50% - 4px);
  border-right: 4px dashed rgba(0, 0, 0, 0.15);

  &::after {
    content: "↑";
    color: rgba(0, 0, 0, 0.15);

    position: absolute;
    left: -5px;
    margin-top: -24px;
  }
`;

Axis.X = styled(Axis)`
  left: 8px;
  right: 26px;
  top: calc(50% - 4px);
  border-bottom: 4px dashed rgba(0, 0, 0, 0.15);

  &::after {
    content: "↑";
    color: rgba(0, 0, 0, 0.15);

    display: inline-block;
    transform: rotate(90deg);

    position: absolute;
    right: -20px;
    margin-top: -9px;
  }
`

Axis.LabelY = styled.p`
  color: rgba(0, 0, 0, 0.3);
  font-size: 80%;

  position: absolute;
  left: calc(50% + 12px);
  top: 4px;
`;

Axis.LabelX = styled.p`
  color: rgba(0, 0, 0, 0.3);
  font-size: 80%;

  position: absolute;
  top: calc(50% + 8px);
  right: 8px;
`;

export default Axis;
