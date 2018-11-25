import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Tabs = ({ className, items }) => (
  <div className={className}>
    {items.map((item, index) => (
      <Link key={index} href={item.href}>
        <a className={`tab ${item.selected && "selected"}`}>{item.name}</a>
      </Link>
    ))}
  </div>
);

const StyledTabs = styled(Tabs)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${props => props.theme.spacing.medium};

  margin-bottom: ${props => props.theme.spacing.medium};

  > .tab {
    flex: 1;
    padding: ${props => props.theme.spacing.medium} 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.card};
    border-radius: ${props => props.theme.borderRadius.small};
    box-shadow: inset 0 3px 4px -2px rgba(0, 0, 0, 0.3);

    color: rgb(70, 70, 70);
    text-decoration: none;
    font-weight: 500;

    &.selected {
      background-color: ${props => props.theme.colors.primary};
      box-shadow: none;
      color: ${props => props.theme.colors.background};
    }
  }
`;

export default StyledTabs;
