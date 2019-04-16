import React from "react";

import Rating from "../rating";
import Layout from "./styled/Layout";

const EntryPage = ({ entry, onDelete, loading }) => (
  <Layout>
    <Layout.Main>
      <img src={entry.gif.url} alt="Animation" />
    </Layout.Main>

    <Rating>
      <Rating.Marker
        style={{
          position: "absolute",
          bottom: `calc(${entry.positivity * 10}% - 16px)`,
          left: `calc(${entry.productivity * 10}% - 16px)`
        }}
      />
    </Rating>

    <Layout.Button onClick={onDelete} disabled={loading}>
      {loading ? "Loading..." : "Delete"}
    </Layout.Button>
  </Layout>
);

export default EntryPage;
