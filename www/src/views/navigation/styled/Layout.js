import styled from "styled-components/macro";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

Layout.Top = styled.div`
  flex-shrink: 0;

  padding-top: 8px;
  margin-bottom: 8px;
`;

Layout.Main = styled.main`
  flex: 1;

  padding: 12px;

  max-width: 768px;
  margin: 0 auto;

  @media (min-width: 800px) {
    width: 768px;
  }
`;

export default Layout;
