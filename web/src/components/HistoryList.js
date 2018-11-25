import React from "react";
import styled from "styled-components";

const HistoryList = ({ children, items, ...props }) => (
  <div {...props}>
    {items.map((item, index) => (
      <div key={index} className="list-item">
        {children(item)}
      </div>
    ))}
  </div>
);

const StyledHistoryList = styled(HistoryList)`
  .list-item:not(:last-child) {
    margin-bottom: ${props => props.theme.spacing.medium};
  }
`;

export default StyledHistoryList;
