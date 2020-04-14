import { MdAccountCircle, MdHome, MdPlayArrow } from 'react-icons/md';

import Link from 'next/link';
import React from 'react';
import { useAuth0 } from '../context/auth';
import { useQuery } from 'graphql-hooks';
import { useRouter } from 'next/router';

const USER_QUERY = /* GraphQL */ `
  query UserWithEntries($id: String!) {
    user_by_pk(id: $id) {
      name
    }
  }
`;

interface UserData {
  user_by_pk: { name: string };
}

interface UserVariables {
  id: string;
}

const InactiveTab: React.FC = ({ children }) => (
  <div className="flex items-center justify-center w-24 my-1 text-gray-600 rounded-lg hover:bg-gray-200 active:bg-gray-300">
    {children}
  </div>
);

const ActiveTab: React.FC = ({ children }) => (
  <div className="flex items-center justify-center w-24 mt-1 text-gray-800 border-b-2 border-gray-800">
    {children}
  </div>
);

const SettingsLink: React.FC<{ userId: string }> = ({ userId }) => {
  const { data } = useQuery<UserData | undefined, UserVariables>(USER_QUERY, {
    variables: { id: userId },
  });

  return (
    <Link href="/settings">
      <a className="grid items-center grid-cols-2 p-2 pr-4 text-gray-600 transition-transform transform rounded-full active:scale-95 hover:bg-gray-300">
        <MdAccountCircle size="32" />
        <p>{data?.user_by_pk.name}</p>
      </a>
    </Link>
  );
};

const Layout: React.FC = ({ children }) => {
  const { user } = useAuth0();
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-50 flex flex-row items-center justify-between px-4 bg-white shadow">
        <Link href="/">
          <a>
            <h1 className="text-2xl font-bold text-gray-700">Smileys</h1>
          </a>
        </Link>
        <div className="grid items-stretch h-16 grid-cols-2 gap-2">
          <Link href="/profile">
            <a className="flex">
              {router.pathname === '/profile' ? (
                <ActiveTab>
                  <MdHome size="40" />
                </ActiveTab>
              ) : (
                <InactiveTab>
                  <MdHome size="40" />
                </InactiveTab>
              )}
            </a>
          </Link>
          <Link href="/teams">
            <a className="flex">
              {router.pathname === '/teams' ? (
                <ActiveTab>
                  <MdPlayArrow size="48" />
                </ActiveTab>
              ) : (
                <InactiveTab>
                  <MdPlayArrow size="48" />
                </InactiveTab>
              )}
            </a>
          </Link>
        </div>
        {user && <SettingsLink userId={user.sub} />}
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
