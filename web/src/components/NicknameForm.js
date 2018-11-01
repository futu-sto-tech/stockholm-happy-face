import styled from "styled-components";

import Button from "./Button";
import TextField from "./TextField";

class NicknameForm extends React.Component {
  handleSubmit = async event => {
    event.preventDefault();
    this.props.onSave();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={this.props.className}>
        <TextField
          name="Give yourself a nickname!"
          value={this.props.value}
          onChange={event => this.props.onChange(event.target.value)}
        />

        <Button type="submit" loading={this.props.loading}>
          {this.props.value ? "Save nickname" : "Or let us pick one 😉"}
        </Button>
      </form>
    );
  }
}

const StyledNicknameForm = styled(NicknameForm)`
  ${TextField} {
    margin-bottom: ${props => props.theme.spacing.small};
  }
`;

export default StyledNicknameForm;
