import React from "react";
import styled from "styled-components";

import SmileyCard from "./SmileyCard";
import Button from "./Button";

const StyledSmileyCard = styled(SmileyCard)``;

const CurrentEntry = ({ entry, handleDelete, loading, className }) => (
  <div className={className}>
    <StyledSmileyCard entry={entry} />
    <Button onClick={handleDelete} loading={loading}>
      Delete
    </Button>
  </div>
);

const StyledCurrentEntry = styled(CurrentEntry)`
  ${StyledSmileyCard} {
    margin-bottom: ${props => props.theme.spacing.small};
  }
`;

export default StyledCurrentEntry;
