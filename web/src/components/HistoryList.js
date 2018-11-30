import React from "react";
import styled from "styled-components";
import media from "styled-media-query";

const HistoryList = ({ children, items, ...props }) => (
  <div {...props}>
    {items.map(item => (
      <div key={item.id} className="list-item">
        {children(item)}
      </div>
    ))}
  </div>
);

const StyledHistoryList = styled(HistoryList)`
  ${media.greaterThan("large")`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${props => props.theme.spacing.medium};
  `};

  .list-item:not(:last-child) {
    margin-bottom: ${props => props.theme.spacing.medium};

    ${media.greaterThan("large")`
      margin-bottom: 0;
    `};

    > div {
      height: 100%;
    }
  }
`;

export default StyledHistoryList;
