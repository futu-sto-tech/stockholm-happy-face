import styled, { css } from "styled-components/macro";

const ResultList = styled.div.attrs({ className: "nes-container is-rounded" })`
  &.is-rounded {
    margin: 16px 0;
  }

  width: 100%;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  height: 300px;
`;

ResultList.Item = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    margin-right: 24px;
  }

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
