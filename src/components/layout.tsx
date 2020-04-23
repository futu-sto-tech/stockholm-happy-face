import { MdAccountCircle, MdImage } from 'react-icons/md';

import { IconType } from 'react-icons/lib/cjs';
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

interface LinkButtonProps {
  IconComponent: IconType;
  title: string;
  active: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({ IconComponent, title, active, ...props }) => (
  <a className={`block p-2 rounded-r-lg ${active && 'bg-blue-500'}`} {...props}>
    <div
      className={`flex flex-col items-center justify-center h-20 rounded-lg ${
        active ? 'text-white' : 'text-gray-600 hover:bg-gray-300'
      }`}
    >
      <IconComponent className="mx-auto text-current" size="32" />
      <p className="text-xs font-semibold text-current">{title}</p>
    </div>
  </a>
);

const SettingsLink: React.FC<{ userId: string }> = ({ userId }) => {
  const { data } = useQuery<UserData | undefined, UserVariables>(USER_QUERY, {
    variables: { id: userId },
  });

  const router = useRouter();

  return data ? (
    <Link href="/settings" passHref>
      <LinkButton
        IconComponent={MdAccountCircle}
        title={data.user_by_pk.name}
        active={router.pathname === '/settings'}
      />
    </Link>
  ) : null;
};

const Layout: React.FC = ({ children }) => {
  const { user } = useAuth0();
  const router = useRouter();

  return (
    <div className="flex flex-row">
      <nav className="w-24 py-2">
        <Link href="/profile" passHref>
          <LinkButton
            IconComponent={MdImage}
            title="Your GIFs"
            active={router.pathname === '/profile'}
          />
        </Link>
        {user && <SettingsLink userId={user.sub} />}
      </nav>
      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
