import React from "react";
import styled from "styled-components";
import randomEmoji from "../utils/random-emoji";

const Wrapper = styled.div`
  font-size: 56px;
  display: flex;
  justify-content: space-around;
  padding: ${props => props.theme.spacing.large} 0;
  user-select: none;
`;

export default class Welcome extends React.Component {
  state = {
    intervalId: null,
    emojis: [randomEmoji(), randomEmoji(), randomEmoji()]
  };

  componentDidMount() {
    const intervalId = setInterval(() => {
      const updatesEmojis = this.state.emojis;
      const emojiIndex = Math.floor(Math.random() * updatesEmojis.length);
      updatesEmojis[emojiIndex] = randomEmoji();

      this.setState({
        emojis: updatesEmojis
      });
    }, 5000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <Wrapper>
        {this.state.emojis.map((emoji, index) => (
          <span key={index} role="img">
            {emoji}
          </span>
        ))}
      </Wrapper>
    );
  }
}
