import React from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { compose } from "recompose";

import Navbar from "../components/Navbar";

const BASE_LINKS = [
  {
    title: "This week",
    path: "/"
  },
  {
    title: "History",
    path: "/history"
  }
];

const NavbarContainer = ({ user, router }) => {
  if (!user) return null;

  const linksWithSelected = BASE_LINKS.map(link => ({
    ...link,
    selected: router.pathname === link.path
  }));

  return <Navbar items={linksWithSelected} />;
};

const mapStateToProps = ({ currentUser }) => ({
  user: currentUser
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(NavbarContainer);
