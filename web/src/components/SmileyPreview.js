import React from "react";
import styled from "styled-components";

class SmileyPreview extends React.Component {
  contentIsLink = () => {
    return this.props.content.startsWith("http");
  };

  render() {
    const { className, content } = this.props;
    return (
      <div className={className}>
        {this.contentIsLink() ? (
          <img src={content} alt="preview image" />
        ) : (
          <p>{content}</p>
        )}
      </div>
    );
  }
}

const StyledSmileyPreview = styled(SmileyPreview)`
  min-height: 250px;
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 3px dashed ${props => props.theme.colors.card};
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  > p {
    opacity: 0.5;
    color: ${props => props.theme.colors.text};
    font-size: 100px;
    padding: ${props => props.theme.spacing.medium};
    word-break: break-word;
  }

  > img {
    object-fit: contain;
    max-height: 350px;
  }
`;

export default StyledSmileyPreview;
