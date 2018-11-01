import React from "react";
import { connect } from "react-redux";

import User from "../models/user";
import firebase from "../auth";
import { checkCurrentUser, signInUser } from "../redux/actionCreators";
import Button from "../components/Button";
import SplashScreen from "../components/SplashScreen";
import MainLayout from "../components/MainLayout";
import NicknameFormContainer from "../containers/NicknameForm";

const withAuth = Component => {
  class WithAuth extends React.Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(authUser => {
        if (authUser) {
          const { displayName, email, photoURL } = authUser;
          const userObj = new User(displayName, email, photoURL);
          this.props.checkCurrentUser(userObj);
        } else {
          this.props.checkCurrentUser(null);
        }
      });
    }

    render() {
      if (!this.props.checkedAuthState) {
        return <SplashScreen />;
      }

      if (!this.props.currentUser) {
        return (
          <MainLayout>
            <Button
              onClick={this.props.signInUser}
              loading={this.props.isLoadingSignIn}
            >
              Sign in
            </Button>
          </MainLayout>
        );
      }

      if (!this.props.currentUser.nickname) {
        return (
          <MainLayout>
            <NicknameFormContainer />
          </MainLayout>
        );
      }

      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = ({
    checkedAuthState,
    currentUser,
    isLoadingSignIn
  }) => ({
    checkedAuthState,
    currentUser,
    isLoadingSignIn
  });

  const mapDispatchToProps = {
    checkCurrentUser,
    signInUser
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithAuth);
};

export default withAuth;
