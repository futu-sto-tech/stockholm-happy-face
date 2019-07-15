import styled from "styled-components/macro";

const Flex = styled.div`
  display: flex;
  justify-content: ${props => props.justify || "flex-start"};
`;

export default Flex;
