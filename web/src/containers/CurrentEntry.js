import React from "react";
import { connect } from "react-redux";

import { deleteEntry } from "../redux/actionCreators";
import StyledCurrentEntry from "../components/CurrentEntry";

const CurrentEntryContainer = ({ entry, deleteEntry, isLoading }) => (
  <StyledCurrentEntry
    entry={entry}
    handleDelete={() => deleteEntry(entry)}
    loading={isLoading}
  />
);

const mapStateToProps = ({ isDeletingEntry, currentUser }) => ({
  isLoading: isDeletingEntry,
  entry: currentUser.currentEntry
});

const mapDispatchToProps = { deleteEntry };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentEntryContainer);
