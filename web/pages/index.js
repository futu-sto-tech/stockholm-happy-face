import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import withAuth from "../src/containers/withAuth";
import GifFormContainer from "../src/containers/GifForm";
import CurrentEntryContainer from "../src/containers/CurrentEntry";
import EmojiFormContainer from "../src/containers/EmojiForm";
import Tabs from "../src/components/Tabs";
import MainLayout from "../src/components/MainLayout";

class IndexPage extends React.Component {
  render() {
    return (
      <MainLayout>
        {this.props.currentUser.currentEntry ? (
          <CurrentEntryContainer />
        ) : (
          <>
            <Tabs
              items={[
                {
                  name: "Gif",
                  href: "/?tab=gif",
                  selected: this.props.query.tab !== "emoji"
                },
                {
                  name: "Emoji",
                  href: "/?tab=emoji",
                  selected: this.props.query.tab === "emoji"
                }
              ]}
            />
            {this.props.query.tab === "gif" ||
            this.props.query.tab === undefined ? (
              <GifFormContainer />
            ) : (
              <EmojiFormContainer />
            )}
          </>
        )}
      </MainLayout>
    );
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
});

export default compose(
  withAuth,
  connect(mapStateToProps)
)(IndexPage);
