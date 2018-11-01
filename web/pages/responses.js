import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import {
  getUserResponses,
  checkCurrentUser
} from "../src/redux/actionCreators";
import withAuth from "../src/containers/withAuth";
import SmileyItem from "../src/components/SmileyItem";

class ResponsesPage extends React.Component {
  componentDidMount() {
    this.props.getUserResponses();
  }

  render() {
    const { currentUser, isLoading, responses } = this.props;
    return (
      <div>
        <div>{(currentUser || {}).name}</div>
        {isLoading ? (
          <div>Loading..!</div>
        ) : (
          responses.map((item, index) => (
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
  isLoadingUserResponses,
  userResponses
}) => ({
  currentUser,
  isLoading: isLoadingUserResponses,
  responses: userResponses
});

const mapDispatchToProps = {
  checkCurrentUser,
  getUserResponses
};

export default compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ResponsesPage);
