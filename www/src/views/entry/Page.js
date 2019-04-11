import React from "react";

import Layout from "./styled/Layout";

const EntryPage = ({ entry, onDelete, loading }) => (
  <Layout>
    <Layout.Main>
      <img src={entry.gif.url} alt="Animation" />
    </Layout.Main>
    <Layout.Button onClick={onDelete} disabled={loading}>
      {loading ? "Loading..." : "Delete"}
    </Layout.Button>
  </Layout>
);

export default EntryPage;
