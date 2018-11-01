import styled from "styled-components";

const Label = styled.div`
  color: #fff;
`;

const Indicator = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 10px;
  background-color: red;
  border: 2px solid #000;
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.card};
`;

const SmileyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SmileyItemWrapper = ({ className, week, children }) => (
  <SmileyItem className={className}>
    <Label>{week}</Label>
    <Indicator />
    <Card>{children}</Card>
  </SmileyItem>
);

export default SmileyItemWrapper;
