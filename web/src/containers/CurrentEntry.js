import React from "react";
import { connect } from "react-redux";

import { deleteCurrentEntry } from "../redux/actionCreators";
import StyledCurrentEntry from "../components/CurrentEntry";

const CurrentEntryContainer = ({ entry, deleteCurrentEntry, isLoading }) => (
  <StyledCurrentEntry
    entry={entry}
    handleDelete={deleteCurrentEntry}
    loading={isLoading}
  />
);

const mapStateToProps = ({ isDeletingCurrentEntry, currentUser }) => ({
  isLoading: isDeletingCurrentEntry,
  entry: currentUser.currentEntry
});

const mapDispatchToProps = { deleteCurrentEntry };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentEntryContainer);
