import styled from "styled-components/macro";

const Layout = styled.div``;

Layout.Main = styled.div.attrs({ className: "nes-container is-rounded" })`
  &.is-rounded {
    margin: 0;
  }

  display: flex;
  justify-content: center;
  align-items: flex-start;

  > img {
    max-width: 100%;
  }
`;

Layout.Button = styled.button.attrs({ className: "nes-btn is-error" })`
  margin: 16px auto;
  display: block;

  &.is-primary {
    margin: 0;
  }
`;

export default Layout;
