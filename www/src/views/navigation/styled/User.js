import styled from "styled-components/macro";

const User = styled.div`
  display: flex;
  justify-content: center;
`;

User.Badge = styled.div.attrs({ className: "nes-badge" })`
  margin-bottom: 0;
  width: 20em;
`;

User.BadgeName = styled.span.attrs({ className: "is-dark" })``;

export default User;
