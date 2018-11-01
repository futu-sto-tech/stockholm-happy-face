import styled from "styled-components";

import Loader from "./Loader";

const Button = styled.button`
  width: 100%;
  background-color: rgb(46, 204, 113);
  border-radius: ${props => props.theme.borderRadius.small};
  border: 0;
  font-size: 16px;
  font-weight: 500;
  user-select: none;
  height: ${props => props.theme.button.height};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default ({ children, loading, ...props }) => (
  <Button disabled={loading} {...props}>
    {loading ? <Loader /> : children}
  </Button>
);
