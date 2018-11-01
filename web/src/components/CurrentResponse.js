import React from "react";
import styled from "styled-components";

import SmileyCard from "../components/SmileyCard";
import Button from "../components/Button";

const StyledSmileyCard = styled(SmileyCard)``;

const CurrentResponse = ({ response, handleDelete, loading, className }) => (
  <div className={className}>
    <StyledSmileyCard response={response} />
    <Button onClick={handleDelete} loading={loading}>
      Delete
    </Button>
  </div>
);

const StyledCurrentResponse = styled(CurrentResponse)`
  ${StyledSmileyCard} {
    margin-bottom: ${props => props.theme.spacing.small};
  }
`;

export default StyledCurrentResponse;
