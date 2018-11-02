import React from "react";
import { connect } from "react-redux";

import { saveEntry } from "../redux/actionCreators";
import InputForm from "../components/InputForm";

class InputFormContainer extends React.Component {
  state = { content: "" };

  render() {
    return (
      <>
        <InputForm
          content={this.state.content}
          onSave={() => this.props.saveEntry(this.state.content)}
          onChangeValue={newValue => this.setState({ content: newValue })}
          loading={this.props.isLoading}
        />
      </>
    );
  }
}

const mapStateToProps = ({ isLoadingNewEntry }) => ({
  isLoading: isLoadingNewEntry
});

const mapDispatchToProps = { saveEntry };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputFormContainer);
