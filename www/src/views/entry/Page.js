import React from "react";

import Rating from "../rating";
import Layout from "./styled/Layout";
import MessageList from "./styled/MessageList";
import CurrentEntry from "./styled/CurrentEntry";

const EntryPage = ({ entry, onDelete, loading, loadingEntries, entries }) => (
  <Layout>
    <CurrentEntry.Title>Current week</CurrentEntry.Title>
    <CurrentEntry>
      <CurrentEntry.Image src={entry.gif.url} alt="Animation" />
    </CurrentEntry>

    {/* <Rating>
      <Rating.Marker
        style={{
          position: "absolute",
          bottom: `calc(${(entry.positivity + 5) * 10}% - 16px)`,
          left: `calc(${(entry.productivity + 5) * 10}% - 16px)`
        }}
      />
    </Rating> */}

    <Layout.Button onClick={onDelete} disabled={loading}>
      {loading ? "Loading..." : "Delete"}
    </Layout.Button>

    <MessageList.Heading>History</MessageList.Heading>
    <MessageList>
      {entries
        .reverse()
        .slice(1)
        .map((entry, index) => (
          <MessageList.Message
            key={entry.id}
            className={`-${index % 2 ? "left" : "right"}`}
          >
            <MessageList.Balloon
              className={`from-${index % 2 ? "left" : "right"}`}
            >
              <MessageList.Title>Week: {entry.week || "18"}</MessageList.Title>

              <MessageList.Image src={entry.gif.url} alt="Animation" />

              {/* <Rating>
                <Rating.Marker
                  style={{
                    position: "absolute",
                    bottom: `calc(${(entry.positivity + 5) * 10}% - 16px)`,
                    left: `calc(${(entry.productivity + 5) * 10}% - 16px)`
                  }}
                />
              </Rating> */}
            </MessageList.Balloon>
          </MessageList.Message>
        ))}
    </MessageList>
  </Layout>
);

export default EntryPage;
