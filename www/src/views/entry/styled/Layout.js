import styled from "styled-components/macro";

const Layout = styled.div``;

Layout.Main = styled.div``;

Layout.Button = styled.button.attrs({ className: "nes-btn is-error" })`
  margin: 16px auto;
  display: block;

  &.is-primary {
    margin: 0;
  }
`;

export default Layout;
