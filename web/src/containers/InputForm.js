import React from "react";
import { connect } from "react-redux";

import { saveResponse } from "../redux/actionCreators";
import InputForm from "../components/InputForm";

class InputFormContainer extends React.Component {
  state = { content: "" };

  render() {
    return (
      <>
        <InputForm
          content={this.state.content}
          onSave={() => this.props.saveResponse(this.state.content)}
          onChangeValue={newValue => this.setState({ content: newValue })}
          loading={this.props.isLoading}
        />
      </>
    );
  }
}

const mapStateToProps = ({ isLoadingNewResponse }) => ({
  isLoading: isLoadingNewResponse
});

const mapDispatchToProps = { saveResponse };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputFormContainer);
