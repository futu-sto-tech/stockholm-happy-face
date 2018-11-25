import styled from "styled-components";
import media from "styled-media-query";

import NavbarContainer from "../containers/Navbar";

const MainLayout = ({ children, ...props }) => (
  <>
    <NavbarContainer />
    <div {...props}>{children}</div>
  </>
);

const StyledMainLayout = styled(MainLayout)`
  padding: ${props => props.theme.spacing.medium};
  max-width: ${props => props.theme.layout.main.width};
  margin: 0 auto;

  ${media.greaterThan("small")`
    padding: ${props => props.theme.spacing.large};
  `};

  ${media.greaterThan("large")`
    padding-left: 0;
    padding-right: 0;
  `};
`;

export default StyledMainLayout;
