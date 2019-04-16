import styled, { css } from "styled-components/macro";

const ResultList = styled.div.attrs({ className: "nes-container" })`
  margin: 0 -4px 16px -4px;
  padding: 8px;
  background-color: white;

  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
  grid-auto-rows: 120px;

  @media (min-width: 600px) {
    grid-auto-rows: 200px;
  }

  @media (min-width: 768px) {
    padding: 16px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    grid-auto-rows: 200px;
  }

  min-height: 200px;
`;

ResultList.Item = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.selected &&
    css`
      border: 3px solid black;
      border-radius: 8px;
      padding: 8px;
    `}

  > img {
    max-height: 100%;
    max-width: 100%;
  }
`;

export default ResultList;
