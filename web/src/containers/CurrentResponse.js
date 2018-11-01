import React from "react";
import { connect } from "react-redux";

import { deleteCurrentResponse } from "../redux/actionCreators";
import StyledCurrentResponse from "../components/CurrentResponse";

const CurrentResponseContainer = ({
  response,
  deleteCurrentResponse,
  isLoading
}) => (
  <StyledCurrentResponse
    response={response}
    handleDelete={deleteCurrentResponse}
    loading={isLoading}
  />
);

const mapStateToProps = ({ isDeletingCurrentResponse, currentUser }) => ({
  isLoading: isDeletingCurrentResponse,
  response: currentUser.currentResponse
});

const mapDispatchToProps = { deleteCurrentResponse };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentResponseContainer);
