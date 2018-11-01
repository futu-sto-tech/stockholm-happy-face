import styled from "styled-components";

const TextLabel = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: ${props => props.theme.spacing.small};
  user-select: none;
`;

const TextInput = styled.input`
  background: none;
  border: 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  outline: none;
  line-height: 0;
`;

const TextField = ({ className, name, flex, ...props }) => (
  <div className={className} flex={flex}>
    <TextLabel>{name}</TextLabel>
    <TextInput {...props} />
  </div>
);

const StyledTextField = styled(TextField)`
  flex: ${props => props.flex || 1};
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.medium};
  background-color: #1a1a1a;
  border: 2px solid #1a1a1a;
  border-radius: ${props => props.theme.borderRadius.small};

  &:focus-within {
    border-color: rgb(46, 204, 113);
  }
`;

export default StyledTextField;
