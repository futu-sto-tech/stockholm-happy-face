import React from "react";
import styled from "styled-components";

import SmileyCard from "./SmileyCard";

const StyledSmileyCard = styled(SmileyCard)``;

const CurrentEntry = ({ entry, handleDelete, loading, className }) => (
  <div className={className}>
    <StyledSmileyCard entry={entry} onDelete={handleDelete} loading={loading} />
  </div>
);

const StyledCurrentEntry = styled(CurrentEntry)`
  ${StyledSmileyCard} {
    margin-bottom: ${props => props.theme.spacing.small};
  }
`;

export default StyledCurrentEntry;
