import styled from "styled-components/macro";

const Layout = styled.div`
  height: 100vh;
`;

Layout.Top = styled.div`
  padding-top: 8px;
  margin-bottom: 8px;
`;

Layout.Main = styled.main`
  padding: 12px;
  padding-bottom: 56px;

  @media (min-width: 800px) {
    margin: 0 auto;
    width: 768px;
  }
`;

export default Layout;
