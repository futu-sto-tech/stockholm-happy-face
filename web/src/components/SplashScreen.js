import styled from "styled-components";

const SplashScreen = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.card};

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > span {
    font-size: 100px;
    margin-bottom: ${props => props.theme.spacing.large};
  }

  > h1 {
    font-size: 50px;
    color: #fff;
  }
`;

export default () => (
  <SplashScreen>
    <span role="img">😌</span>
    <h1>The Smiley App</h1>
  </SplashScreen>
);
