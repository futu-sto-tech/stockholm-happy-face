import React from "react";
import { connect } from "react-redux";

import { updateCurrentUser } from "../redux/actionCreators";
import NicknameForm from "../components/NicknameForm";

class NicknameFormContainer extends React.Component {
  state = { value: "" };

  render() {
    return (
      <NicknameForm
        value={this.state.value}
        onSave={() =>
          this.props.updateCurrentUser({
            nickname: this.state.value || "RANDOM"
          })
        }
        onChange={newValue => this.setState({ value: newValue })}
        loading={this.props.isLoading}
      />
    );
  }
}

const mapStateToProps = ({ isUpdatingUser }) => ({
  isLoading: isUpdatingUser
});

const mapDispatchToProps = { updateCurrentUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NicknameFormContainer);
