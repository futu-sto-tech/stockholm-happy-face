import styled from "styled-components";

const Header = styled.div`
  border-bottom: 2px solid ${props => props.theme.colors.background};
  color: #fff;
  padding: ${props => props.theme.spacing.medium};
`;

const Content = styled.div`
  padding: ${props => props.theme.spacing.medium};
  text-align: center;
  font-size: 50px;
`;

const SmileyItem = styled.div`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.medium};

  margin: ${props => `0 ${props.theme.spacing.medium}`};
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const SmileyItemWrapper = ({ className, week, children }) => (
  <SmileyItem className={className}>
    <Header>{week}</Header>
    <Content>{children}</Content>
  </SmileyItem>
);

export default SmileyItemWrapper;
