import styled from "styled-components";
import media from "styled-media-query";

const MainLayout = styled.div`
  padding: ${props => props.theme.spacing.medium};

  ${media.greaterThan("small")`
    padding: ${props => props.theme.spacing.large};
  `};

  ${media.greaterThan("medium")`
    padding-left: 0;
    padding-right: 0;
  `};

  max-width: ${props => props.theme.layout.main.width};
  margin: 0 auto;
`;

export default MainLayout
