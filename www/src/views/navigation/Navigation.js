import React from "react";

import Layout from "./styled/Layout";
import UserContainer from "./UserContainer";

const Navigation = ({ children }) => (
  <Layout>
    <Layout.Top>
      <UserContainer />
    </Layout.Top>
    <Layout.Main>{children}</Layout.Main>
  </Layout>
);

export default Navigation;
