import Link from 'next/link';
import React from 'react';
import Text from '../../../component/text';
import { User } from '../../../../types';
import theme from '../../../styles/theme';

const UserListSuccess: React.FC<{ data: User[] }> = ({ data }) => {
  return (
    <>
      {data.map(item => (
        <Link key={item.name} href="/[userId]" as={`/${item.id}`}>
          <a className="element">
            <Text truncate size="medium">
              {item.name}
            </Text>
          </a>
        </Link>
      ))}

      <style jsx>{`
        .element {
          text-decoration: none;
          display: block;
          padding: 20px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border-radius: 3px;
        }
        .element + .element {
          margin-top: 8px;
        }

        @media (hover: none) {
          .element {
            background-color: ${theme.dark.elevation.level1};
          }
        }

        @media (hover: hover) {
          .element:hover {
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
          }
        }
        @media (hover: hover) and (prefers-color-scheme: light) {
          .element:hover {
            background-color: ${theme.light.color.background};
            background-color: ${theme.light.elevation.level1};
          }
        }
        @media (hover: hover) and (prefers-color-scheme: dark) {
          .element:hover {
            background-color: ${theme.dark.color.background};
            background-color: ${theme.dark.elevation.level1};
          }
        }
      `}</style>
    </>
  );
};

export default UserListSuccess;
