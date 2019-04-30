import styled from "styled-components/macro";

const Layout = styled.div`
  padding: 24px 16px;

  height: 100vh;

  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    padding-top: 30%;
  }

  @media (min-width: 1400px) {
    padding-top: 20%;
  }
`;

export default Layout;
