import { connect } from "react-redux";
import { compose } from "recompose";

import withAuth from "../src/containers/withAuth";
import Welcome from "../src/components/Welcome";
import InputFormContainer from "../src/containers/InputForm";
import CurrentEntryContainer from "../src/containers/CurrentEntry";
import MainLayout from "../src/components/MainLayout";

const IndexPage = ({ currentUser }) => (
  <MainLayout>
    <Welcome />
    {currentUser.currentEntry ? (
      <CurrentEntryContainer />
    ) : (
      <InputFormContainer />
    )}
  </MainLayout>
);

const mapStateToProps = ({ currentUser }) => ({
  currentUser
});

export default compose(
  withAuth,
  connect(mapStateToProps)
)(IndexPage);
