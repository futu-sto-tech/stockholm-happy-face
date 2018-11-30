import styled from "styled-components";
import media from "styled-media-query";

import NavbarContainer from "../containers/Navbar";

const MainLayout = ({ children, ...props }) => (
  <div {...props}>
    <NavbarContainer />
    <div className="body">{children}</div>
  </div>
);

const StyledMainLayout = styled(MainLayout)`
  padding: ${props => props.theme.spacing.medium};
  max-width: ${props => props.theme.layout.main.width};
  margin: 0 auto;

  ${media.greaterThan("medium")`
    padding: ${props =>
      `${props.theme.spacing.medium} ${props.theme.spacing.large}`};
  `};

  ${media.greaterThan("large")`
    padding-left: 0;
    padding-right: 0;
  `};

  > .body {
    margin-top: ${props => props.theme.spacing.medium};
  }
`;

export default StyledMainLayout;
