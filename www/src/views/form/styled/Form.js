import styled from "styled-components/macro";

const Form = styled.form``;

Form.Field = styled.div.attrs({ className: "nes-field" })``;

Form.Label = styled.label``;

Form.Input = styled.input.attrs({ className: "nes-input" })`
  margin: 0;
`;

Form.Separator = styled.p.attrs({ className: "nes-text" })`
  margin: 12px;
  text-align: center;
`;

export default Form;
