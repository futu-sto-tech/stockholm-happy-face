import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { getUserEntries, checkCurrentUser } from "../src/redux/actionCreators";
import withAuth from "../src/containers/withAuth";
import SmileyItem from "../src/components/SmileyItem";

class EntriesPage extends React.Component {
  componentDidMount() {
    this.props.getUserEntries();
  }

  render() {
    const { currentUser, isLoading, entries } = this.props;
    return (
      <div>
        <div>{(currentUser || {}).name}</div>
        {isLoading ? (
          <div>Loading..!</div>
        ) : (
          entries.map((item, index) => (
            <SmileyItem key={index} week={item.week}>
              {item.text || item.link}
            </SmileyItem>
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  currentUser,
  isLoadingUserEntries,
  userEntries
}) => ({
  currentUser,
  isLoading: isLoadingUserEntries,
  entries: userEntries
});

const mapDispatchToProps = {
  checkCurrentUser,
  getUserEntries
};

export default compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EntriesPage);
