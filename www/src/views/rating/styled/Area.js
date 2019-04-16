import styled from "styled-components/macro";

const Area = styled.div.attrs({ className: "nes-container" })`
  padding: 0;
  margin: 0 -4px;
  margin-bottom: 16px;

  background-color: white;

  height: 50vh;
  max-height: 440px;

  position: relative;
`;

export default Area;
