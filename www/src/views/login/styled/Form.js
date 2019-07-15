import styled from "styled-components/macro";

const Form = styled.form``;

Form.Field = styled.div.attrs({ className: "nes-field" })``;

Form.Label = styled.label``;

Form.Input = styled.input.attrs({ className: "nes-input", type: "text" })`
  margin: 0;
`;

Form.Button = styled.button.attrs({ className: "nes-btn is-primary" })`
  &.is-primary {
    margin: 16px 0 0;
  }
`;

export default Form;
