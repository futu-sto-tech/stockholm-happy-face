import Link from 'next/link';
import LogoIcon from 'components/logo-icon';
import React from 'react';
import { useUserId } from 'hooks';
import useUserQuery from 'graphql/queries/user';

export const BaseHeader: React.FC = ({ children }) => (
  <header className="sticky top-0 z-50 bg-white shadow-xl">
    <div className="flex items-center justify-between h-20 max-w-4xl px-4 mx-auto">{children}</div>
  </header>
);

const Header: React.FC = () => {
  const userId = useUserId();
  const { data } = useUserQuery(userId);

  return (
    <BaseHeader>
      <Link href="/">
        <a>
          <LogoIcon width="91" />
        </a>
      </Link>

      {data && (
        <Link href="/settings">
          <a className="flex items-center px-4 py-3 space-x-2 rounded-lg hover:bg-black group">
            <img
              className="w-8 h-8 bg-black rounded-full"
              src={data.user_by_pk.picture}
              alt="Avatar"
            />
            <div className="space-y-1">
              <p className="text-base font-bold leading-none text-black group-hover:text-white">
                {data.user_by_pk.name}
              </p>
              <p className="text-sm leading-none text-black text-opacity-75 group-hover:text-white">
                Team: {data.user_by_pk.team.name}
              </p>
            </div>
          </a>
        </Link>
      )}
    </BaseHeader>
  );
};

export default Header;
