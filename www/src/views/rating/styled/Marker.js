import styled from "styled-components/macro";

const Marker = styled.i.attrs({ className: "nes-icon close" })`
  height: 32px;

  &.is-medium {
    margin: 0;
  }
`;

Marker.Wrapper = styled.div`
  height: 32px;
  width: 32px;
`;

export default Marker;
