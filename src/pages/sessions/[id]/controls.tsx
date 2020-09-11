import React, { useMemo } from 'react';

import { FiCheck } from 'react-icons/fi';
import { NextPage } from 'next';
import usePresentEntry from 'graphql/mutations/present-entry';
import usePresentRandomEntry from 'graphql/mutations/present-random-entry';
import { useRouter } from 'next/router';
import useTeamLobbySubscription from 'graphql/subscriptions/team-lobby';
import useOnlineUsers from 'graphql/subscriptions/online-users';
import useUpdateTeamStatus from 'components/session-box/hooks/use-update-team-status';
import { useUserId } from 'hooks';

const SessionControlsPage: NextPage = () => {
  const router = useRouter();
  const teamId = parseInt(router.query.id as string);
  const userId = useUserId();
  const session = useTeamLobbySubscription(userId);
  const endSession = useUpdateTeamStatus(teamId, 'ENDED');

  const activeUsers = useOnlineUsers(teamId);
  const onlineUsers = activeUsers ? activeUsers.online_team_users : [];

  const usersIdsInSession = useMemo(
    () => onlineUsers.map((item) => item.id),
    [onlineUsers],
  );

  const usersWithEntry = session ? session.user_by_pk.team.entries.map(e => e.user.id) : [];
  const entries = session ? session.user_by_pk.team.entries : [];

  const entriesWithPresentUser = useMemo(
    () => entries.filter((item) => usersIdsInSession?.includes(item.user.id)),
    [entries, usersIdsInSession],
  );
  const presentUsersWithoutEntry = useMemo(
    () => onlineUsers.filter((user) => !usersWithEntry.includes(user.id)),
    [onlineUsers, usersWithEntry],
  );

  const presentRandomEntry = usePresentRandomEntry(teamId);
  const presentEntry = usePresentEntry(teamId);

  const currentSessionUser = session?.user_by_pk.team.entry?.user.id;

  return (
    <div className="flex flex-col h-screen p-4 bg-black">
      <header className="border-b border-white">
        <h1 className="text-2xl font-bold text-white">Participants</h1>
      </header>
      <main className="flex-1 pt-4 overflow-auto scrolling-touch">
        <ul>
          {entriesWithPresentUser?.map((item) =>
            item.user.id === currentSessionUser ? (
              <li
                key={item.id}
                className="flex items-center h-12 px-4 my-2 space-x-1 text-lg font-bold text-black bg-white rounded-lg"
              >
                <p className="flex items-center space-x-2">
                  <span>
                    {item.user.name}{' '}
                    {!usersIdsInSession?.includes(item.user.id) && (
                      <span className="text-black text-opacity-50">(not here)</span>
                    )}
                  </span>
                  {item.presented && <FiCheck />}
                </p>
              </li>
            ) : (
                <li
                  key={item.id}
                  className="flex items-center justify-between h-12 px-4 text-lg font-bold text-white rounded-lg hover:bg-white hover:bg-opacity-25 group"
                >
                  <p className="flex items-center space-x-2">
                    <span>
                      {item.user.name}{' '}
                      {!usersIdsInSession?.includes(item.user.id) && (
                        <span className="text-white text-opacity-50">(not here)</span>
                      )}
                    </span>
                    {item.presented && <FiCheck />}
                  </p>
                  <button
                    onClick={(): void => {
                      presentEntry(item.id);
                    }}
                    className="text-base uppercase transition-opacity duration-150 opacity-0 group-hover:opacity-100"
                  >
                    Show
                  </button>
                </li>
              ),
          )}
          {presentUsersWithoutEntry?.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between h-12 px-4 text-lg font-bold text-white rounded-lg hover:bg-white hover:bg-opacity-25 group"
            >
              <p>
                {item.name} <span className="text-white text-opacity-50">(without GIF)</span>
              </p>
            </li>
          ))}
          <li className="h-4" />
        </ul>
      </main>
      <footer className="row-span-4 space-y-4">
        <div className="flex space-x-4">
          <button
            disabled={session?.user_by_pk.team.entries.every((item) => item.presented === true)}
            onClick={presentRandomEntry}
            className="flex-1 h-12 text-lg font-bold text-black bg-white rounded-lg"
          >
            Next (random)
          </button>
        </div>
        <button
          onClick={endSession}
          className="w-full h-12 text-lg font-bold text-white rounded-lg hover:bg-white hover:bg-opacity-25"
        >
          End session
        </button>
      </footer>
    </div>
  );
};

export default SessionControlsPage;
