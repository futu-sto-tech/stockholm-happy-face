import styled from "styled-components";

import Loader from "./Loader";

const Button = ({ children, loading, ...props }) => (
  <button disabled={loading} {...props}>
    {loading ? <Loader /> : children}
  </button>
);

const StyledButton = styled(Button)`
  width: 100%;
  background-color: rgb(46, 204, 113);
  border-radius: ${props => props.theme.borderRadius.small};
  border: 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  user-select: none;
  height: ${props => props.theme.button.height};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: ${props =>
    props.shadow ? "0 2px 8px 0 rgba(0, 0, 0, 0.5)" : "none"};
`;

export default StyledButton;
