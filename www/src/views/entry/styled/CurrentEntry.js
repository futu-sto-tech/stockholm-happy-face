import styled from "styled-components/macro";

const CurrentEntry = styled.div.attrs({
  className: "nes-container is-rounded"
})`
  max-width: 768px;
  background-color: #fff;

  display: flex;
  justify-content: center;

  &.is-rounded {
    margin: 0 auto;
  }
`;

CurrentEntry.Title = styled.h2`
  text-align: center;
`;

CurrentEntry.Image = styled.img``;

CurrentEntry.Button = styled.button.attrs({ className: "nes-btn is-error" })`
  margin: 16px auto;
  display: block;

  &.is-primary {
    margin: 0;
  }
`;

export default CurrentEntry;
