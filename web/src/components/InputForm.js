import React from "react";
import styled from "styled-components";

import SmileyPreview from "./SmileyPreview";
import Button from "./Button";
import TextField from "./TextField";

class SmileForm extends React.Component {
  handleSubmit = async event => {
    event.preventDefault();
    this.props.onSave();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={this.props.className}>
        <TextField
          flex="100%"
          name="Link to GIF / Smiley"
          value={this.props.content}
          onChange={event => this.props.onChangeValue(event.target.value)}
          required
        />

        <SmileyPreview content={this.props.content} />

        <Button type="submit" loading={this.props.loading}>
          Save your smile!
        </Button>
      </form>
    );
  }
}

const StyledSmileForm = styled(SmileForm)`
  ${TextField}, ${SmileyPreview} {
    margin-bottom: ${props => props.theme.spacing.small};
  }
`;

export default StyledSmileForm;
