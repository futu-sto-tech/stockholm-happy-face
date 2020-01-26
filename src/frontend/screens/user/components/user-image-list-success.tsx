import Link from 'next/link';
import React from 'react';
import ResponsiveGrid from '../../../component/responsive-grid';
import Text from '../../../component/text';
import { UserImage } from '../../../types';
import theme from '../../../styles/theme';

const UserImageListSuccess: React.FC<{ data?: UserImage[] }> = ({ data: images }) => {
  return (
    <>
      <ResponsiveGrid items={images} loading={images === undefined}>
        {(item): React.ReactNode => (
          <Link key={item.id} href="/[userId]/[entryId]" as={item.link}>
            <a className="grid-item-container">
              <div className="grid-item" style={{ backgroundImage: `url(${item.url})` }} />
              <div className="week-badge">
                <Text color="white">{`Week ${item.week}`}</Text>
              </div>
            </a>
          </Link>
        )}
      </ResponsiveGrid>

      <style jsx>{`
        .grid-item-container {
          display: block;
          position: relative;
        }
        .grid-item {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          border-radius: 3px;
        }
        .week-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 4px 8px;
          border-top-left-radius: 3px;
          border-bottom-right-radius: 3px;
          background-color: ${theme.light.color.successDark};
        }

        @media (prefers-color-scheme: light) {
          background-color: ${theme.light.color.successDark};
        }
        @media (prefers-color-scheme: dark) {
          background-color: ${theme.dark.color.successDark};
        }
      `}</style>
    </>
  );
};

export default UserImageListSuccess;
