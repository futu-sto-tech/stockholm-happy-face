import React from "react";
import { connect } from "react-redux";

import { getWeeklyEntries, nextUser, prevUser } from "../redux/actionCreators";
import WeeklyEntries from "../components/WeeklyEntries";

class WeeklyEntriesContainer extends React.Component {
  componentDidMount() {
    this.props.getWeeklyEntries();

    document.addEventListener("keydown", event => {
      if (event.keyCode === 39) return this.props.nextUser();
      if (event.keyCode === 37) return this.props.prevUser();
    });
  }

  render() {
    return (
      <WeeklyEntries
        loading={this.props.loading}
        users={this.props.users}
        user={this.props.selectedUser}
      />
    );
  }
}

const mapStateToProps = ({ users, isLoadingUsers, selectedUserIndex }) => ({
  isLoading: isLoadingUsers,
  users,
  selectedUser: users[selectedUserIndex]
});

const mapDispatchToProps = { getWeeklyEntries, nextUser, prevUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyEntriesContainer);
