import styled from "styled-components";

import SmileyCard from "./SmileyCard";

const WeeklyEntries = ({ users, user, loading, className }) => {
  if (loading) return <p>Loading...</p>;
  if (!user) return null;
  if (user.entry) return <SmileyCard entry={user.entry} />;
  return <div>{user.name}</div>;
};

export default WeeklyEntries;
