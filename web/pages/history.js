import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import moment from "moment";

import {
  getUserEntries,
  checkCurrentUser,
  deleteEntry
} from "../src/redux/actionCreators";
import withAuth from "../src/containers/withAuth";
import MainLayout from "../src/components/MainLayout";
import Loader from "../src/components/Loader";
import SmileyCard from "../src/components/SmileyCard";
import HistoryList from "../src/components/HistoryList";
import Entry from "../src/models/entry";

class EntriesPage extends React.Component {
  state = {
    weeks: [...Array(moment().weeks() + 1).keys()].slice(1).reverse()
  };

  componentDidMount() {
    this.props.getUserEntries();
  }

  render() {
    const { currentUser, isLoading, entries } = this.props;

    const items = this.state.weeks.map(week => {
      const entry = entries.find(entry => entry.week === week);
      if (entry) return entry;
      return new Entry(currentUser, "📭", null, moment(), week, week);
    });
    return (
      <MainLayout>
        {entries.length === 0 && isLoading ? (
          <Loader />
        ) : (
          <HistoryList items={items}>
            {item => (
              <SmileyCard
                entry={item}
                onDelete={
                  item.text !== "📭" && (() => this.props.deleteEntry(item))
                }
                loading={this.props.isDeleting}
              />
            )}
          </HistoryList>
        )}
      </MainLayout>
    );
  }
}

const mapStateToProps = ({
  currentUser,
  isLoadingUserEntries,
  userEntries,
  isDeletingEntry
}) => ({
  currentUser,
  isLoading: isLoadingUserEntries,
  entries: userEntries,
  isDeleting: isDeletingEntry
});

const mapDispatchToProps = {
  checkCurrentUser,
  getUserEntries,
  deleteEntry
};

export default compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EntriesPage);
