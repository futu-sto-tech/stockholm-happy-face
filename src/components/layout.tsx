import AppHeader from './app-header';
import FloatingHeader from './floating-header';
import Link from 'next/link';
import LogoIcon from './logo-icon';
import React from 'react';
import useTeamsQuery from '../graphql/queries/teams';
import useUpdateUserTeamMutation from '../graphql/mutations/update-user-team';
import { useUserId } from '../hooks';
import useUserQuery from '../graphql/queries/user';

const UserSettings: React.FC<{ name: string; picture?: string }> = ({ name, picture }) => (
  <Link href="/settings">
    <a className="flex items-center px-4 py-2 space-x-2 rounded-lg hover:bg-gray-300">
      <p className="text-lg text-black">{name}</p>
      <img className="w-6 h-auto rounded-full" src={picture} alt={`${name} avatar`} />
    </a>
  </Link>
);

const UserNav: React.FC<{ userId: string }> = ({ userId }) => {
  const userData = useUserQuery(userId);
  const teamsData = useTeamsQuery();
  const [updateUserTeam] = useUpdateUserTeamMutation();

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    await updateUserTeam({
      variables: { id: userId, team: parseInt(event.target.value) },
    });
    await userData.refetch();
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-start flex-1">
        {userData.data && (
          <UserSettings
            name={userData.data.user_by_pk.name}
            picture={userData.data.user_by_pk.picture}
          />
        )}
      </div>
      <Link href="/">
        <a className="flex items-center justify-center flex-1">
          <LogoIcon size="100" />
        </a>
      </Link>
      <div className="flex items-center justify-end flex-1">
        <select
          className="block py-2 text-lg text-black border-none rounded-lg form-select hover:bg-gray-300"
          value={userData.data?.user_by_pk.team?.id}
          onChange={handleChange}
        >
          <option disabled>Choose team</option>
          {teamsData.data?.team.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Layout: React.FC = ({ children }) => {
  const userId = useUserId();

  return (
    <div>
      <FloatingHeader>
        <AppHeader>
          <UserNav userId={userId} />
        </AppHeader>
      </FloatingHeader>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
