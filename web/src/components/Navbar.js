import styled from "styled-components";
import Link from "next/link";

const NavItem = styled.a`
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;

  margin-right: ${props => props.theme.spacing.medium};

  background-color: ${props =>
    props.selected ? props.theme.colors.background : "transparent"};
`;

const Navbar = ({ items = [], ...props }) => (
  <div {...props}>
    <div className="nav-list">
      {items.map((item, index) => (
        <Link key={index} href={item.path} passHref>
          <NavItem selected={item.selected}>{item.title}</NavItem>
        </Link>
      ))}
    </div>
  </div>
);

const StyledNavbar = styled(Navbar)`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.medium} 0;
  overflow-x: auto;
  display: flex;
  justify-content: center;

  > .nav-list {
    padding: ${props => props.theme.spacing.small};
  }
`;

export default StyledNavbar;
