import React from "react";
import styled from "styled-components";
import media from "styled-media-query";

import Button from "./Button";
import TextField from "./TextField";

const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${props => props.theme.spacing.small};

  ${media.greaterThan("large")`
    grid-template-columns: repeat(6, 1fr);
    grid-gap: ${props => props.theme.spacing.medium};
  `};

  margin-bottom: ${props => props.theme.spacing.extraLarge};
`;

const EmojiInput = styled.div`
  text-align: center;
  font-size: 56px;
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.small};
  border: ${props =>
    props.selected ? `3px solid rgb(46, 204, 113)` : "3px solid transparent"};

  ${media.greaterThan("medium")`
    padding: ${props => props.theme.spacing.medium};
  `};
  ${media.greaterThan("large")`
    font-size: 80px;
  `};
`;

class EmojiForm extends React.Component {
  handleSubmit = async event => {
    event.preventDefault();
    this.props.onSave();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={this.props.className}>
        <EmojiGrid>
          {this.props.emojis.map((emoji, index) => (
            <EmojiInput
              key={index}
              onClick={() => this.props.onClickEmoji(emoji)}
              selected={emoji.selected}
            >
              <span role="img">{emoji.value}</span>
            </EmojiInput>
          ))}
        </EmojiGrid>
        <Button>Save</Button>
      </form>
    );
  }
}

const StyledEmojiForm = styled(EmojiForm)`
  ${TextField} {
    margin-bottom: ${props => props.theme.spacing.small};
  }
`;

export default StyledEmojiForm;
