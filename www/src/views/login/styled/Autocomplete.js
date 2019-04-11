import styled from "styled-components/macro";

const Autocomplete = styled.div.attrs({
  className: "nes-container is-rounded"
})`
  &.is-rounded {
    margin: 12px 0 0;
    padding: 0;
  }
`;

Autocomplete.Item = styled.div`
  padding: 12px 16px;

  &:not(:last-child) {
    border-bottom: 4px solid black;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export default Autocomplete;
