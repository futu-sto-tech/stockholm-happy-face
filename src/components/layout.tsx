import AppHeader from './app-header';
import FloatingHeader from './floating-header';
import Link from 'next/link';
import LogoIcon from './logo-icon';
import React from 'react';
import { useAuth0 } from '../context/auth';
import useTeamsQuery from '../queries/teams';
import useUpdateUserTeamMutation from '../mutations/update-user-team';
import useUserQuery from '../queries/user';

const UserSettings: React.FC<{ name: string; picture?: string }> = ({ name, picture }) => (
  <Link href="/settings">
    <a className="flex items-center px-4 py-2 space-x-2 rounded hover:bg-gray-300">
      <img className="w-6 h-auto rounded-full" src={picture} alt={`${name} avatar`} />
      <p>{name}</p>
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
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start flex-1">
        {userData.data && (
          <UserSettings
            name={userData.data.user_by_pk.name}
            picture={userData.data.user_by_pk.picture}
          />
        )}
      </div>
      <Link href="/profile">
        <a className="flex items-center justify-center flex-1">
          <LogoIcon size="100" />
        </a>
      </Link>
      <div className="flex items-center justify-end flex-1">
        <select
          className="block py-2 border-none rounded form-select hover:bg-gray-300"
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
  const { user } = useAuth0();

  return (
    <div>
      <FloatingHeader>
        <AppHeader>{user && <UserNav userId={user.sub} />}</AppHeader>
      </FloatingHeader>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
