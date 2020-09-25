import React, { useEffect, useMemo } from 'react';

import { FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import LogoIcon from 'components/logo-icon';
import useTeamSessionSubscription from 'graphql/subscriptions/team-session';
import useUpdateUserSessionMutation from 'graphql/mutations/update-user-session';
import useUpdateOnlineUserMutation from 'graphql/mutations/update-online-user';
import useOnlineUsers from 'graphql/subscriptions/online-users';
import { useUserId } from 'hooks';
import { hexToHSL } from 'lib/utils';

interface Props {
  team: number;
}

const TeamSession: React.FC<Props> = ({ team }) => {
  const teamSession = useTeamSessionSubscription(team);

  const entriesCount = useMemo(() => teamSession?.team_by_pk.entries.length, [
    teamSession?.team_by_pk.entries.length,
  ]);
  const presentedEntriesCount = useMemo(
    () => teamSession?.team_by_pk.entries.filter((item) => item.presented === true).length,
    [teamSession?.team_by_pk.entries.filter],
  );
  const presentedEntriesProgress = useMemo(
    () => (presentedEntriesCount && entriesCount ? presentedEntriesCount / entriesCount : 0),
    [presentedEntriesCount, entriesCount],
  );

  const handleClickOpenAdminPopup = (): void => {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=920`;
    window.open(`/sessions/${team}/controls`, 'test', params);
  };

  const userId = useUserId();
  const [updateUserSession] = useUpdateUserSessionMutation();
  const participants = useMemo(() => teamSession?.team_by_pk.participants.map((item) => item.id), [
    teamSession?.team_by_pk.participants.map,
  ]);

  useEffect(() => {
    if (participants && participants.indexOf(userId) === -1) {
      updateUserSession({ variables: { user: userId, team } });
    }
  }, [userId, participants, team, updateUserSession]);

  useEffect(() => {
    return (): void => {
      updateUserSession({ variables: { user: userId } });
    };
  }, [updateUserSession, userId]);

  const activeUsers = useOnlineUsers(team);
  const onlineUsers = activeUsers ? activeUsers.online_team_users : [];

  const [updateOnlineUser] = useUpdateOnlineUserMutation();
  useEffect(() => {
    const emitOnlineInterval = setInterval(
      async () => {
        await updateOnlineUser({
          variables: { user: userId },
        });
      },
      3000
    );
    return () => {
      clearInterval(emitOnlineInterval);
    }
  }, [updateOnlineUser, userId]);
  
  // Backgorund color
  const bgColor = teamSession?.team_by_pk.entry?.image.color ? teamSession?.team_by_pk.entry?.image.color : '#000000' ;
  
  // Make variants 1 and 2 for gradient use
  const colorVariant1 = bgColor ? hexToHSL(bgColor, 0, 40, 5) : null;
  const colorVariant2 = bgColor ? hexToHSL(bgColor, 100, 40, 5) : null;

  return (
    <div
      className="grid h-screen bg-black grid-rows-12"
      style={{ 
        backgroundColor: bgColor, 
        backgroundImage: colorVariant1 && colorVariant2 ? `linear-gradient(45deg, ${colorVariant1}, ${colorVariant2})` : '' 
      }}
    >
      <header className="flex items-center justify-center row-span-1">
        <Link href="/">
          <a className="text-white">
            <LogoIcon width="120" />
          </a>
        </Link>
      </header>
      <main className="grid grid-cols-12 grid-rows-1 gap-4 px-12 row-span-10">
        <aside className="flex-col hidden col-span-3 overflow-auto bg-white rounded-lg shadow lg:flex bg-opacity-10">
          <header className="p-4 pt-6 space-y-6 border-b border-white border-opacity-10">
            <h2 className="text-xl leading-none text-center text-white">
              Team: <span className="font-bold">{teamSession?.team_by_pk.name}</span>
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-center text-white">
                {teamSession?.team_by_pk.entries.length} GIFs this time
              </p>
              <div className="w-full h-2 bg-white rounded-full bg-opacity-10">
                <div
                  className="h-full bg-white bg-opacity-25 rounded-full"
                  style={{ width: `${presentedEntriesProgress * 100}%` }}
                />
              </div>
            </div>

            {teamSession?.team_by_pk.entry ? (
              <div className="flex flex-col items-center flex-shrink-0 space-y-1">
                <img
                  src={teamSession?.team_by_pk.entry?.user.picture}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full shadow-sm"
                />
                <p className="text-lg text-white">{teamSession?.team_by_pk.entry?.user.name}</p>
              </div>
            ) : (
                <p className="font-bold text-center text-white">Starting soon...</p>
              )}
          </header>

          <ul className="flex-1 py-4 space-y-4 overflow-auto scrolling-touch">
            {teamSession && onlineUsers
              .filter((item) => item.id !== teamSession.team_by_pk.entry?.user.id)
              .map((item) => (
                <li key={item.id} className="flex items-center px-4 space-x-4">
                  <img src={item.picture} alt={item.name} className="w-12 h-12 rounded-full" />
                  <p className="text-base text-white">{item.name}</p>
                </li>
              ))}
            {/* Add spacing to end of list */}
            <li />
          </ul>

          <footer className="flex items-end p-2 border-t border-white border-opacity-10">
            <button
              onClick={handleClickOpenAdminPopup}
              className="flex items-center justify-center w-full h-12 px-4 space-x-2 text-base text-white rounded-lg hover:bg-opacity-10 hover:bg-white"
            >
              <FiExternalLink size="20" />
              <p>Open admin controls</p>
            </button>
          </footer>
        </aside>

        <section className="col-span-12 space-y-6 lg:col-span-9">
          <img
            className="object-contain w-auto w-full h-auto max-w-full max-h-full bg-white rounded-lg shadow bg-opacity-10"
            src={
              teamSession?.team_by_pk.entry?.image.original_url ||
              'https://media.giphy.com/media/brHaCdJqCXijm/giphy.gif'
            }
            alt="GIF"
          />

          <div className="flex flex-col items-center flex-shrink-0 space-y-1 lg:hidden">
            <img
              src={teamSession?.team_by_pk.entry?.user.picture}
              alt="Avatar"
              className="w-24 h-24 rounded-full shadow-sm"
            />
            <p className="text-lg text-white">{teamSession?.team_by_pk.entry?.user.name}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeamSession;
