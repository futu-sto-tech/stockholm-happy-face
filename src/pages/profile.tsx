import { AnimatePresence, motion } from 'framer-motion';
import { MdArrowForward, MdDelete, MdMenu, MdMore, MdMoreHoriz } from 'react-icons/md';
import React, { useCallback, useMemo, useState } from 'react';
import { Result, useQuery, useSubscription } from 'graphql-hooks';
import { formatDistanceToNow, parseJSON } from 'date-fns';

import Button from '../components/button';
import Layout from '../components/layout';
import Link from 'next/link';
import { getCurrentWeek } from '../lib/utils';
import { useAuth0 } from '../context/auth';
import useDeleteEntryMutation from '../lib/api/delete-entry-mutation';

const TEAM_SESSIONS_SUBSCRIPTION = /* GraphQL */ `
  subscription TeamSessions($id: Int!) {
    session(where: { team_id: { _eq: $id }, is_active: { _eq: true } }) {
      id
      team {
        name
      }
    }
  }
`;

interface Session {
  id: number;
  team: { name: string };
}

interface TeamSessionsData {
  session: Session[];
}

const USER_ENTRIES_QUERY = /* GraphQL */ `
  query UserWithEntries($id: String!) {
    user_by_pk(id: $id) {
      name
      picture
      entries(order_by: { created_at: desc }) {
        id
        created_at
        week
        year
        month
        team {
          id
          name
        }
        image {
          original_url
        }
        user {
          name
          picture
        }
      }
    }
  }
`;

interface Entry {
  id: number;
  created_at: string;
  year: number;
  month: number;
  week: number;
  team: {
    id: number;
    name: string;
  };
  image: {
    original_url: string;
  };
  user: {
    name: string;
    picture: string;
  };
}

interface QueryData {
  user_by_pk: {
    name: string;
    picture: string;
    entries: Array<Entry>;
  };
}

interface QueryVariables {
  id: string;
}

const SessionNotification: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [sessions, setSessions] = useState<Session[]>();

  useSubscription(
    { query: TEAM_SESSIONS_SUBSCRIPTION, variables: { id: entry.team.id } },
    ({ error, data }: Result<TeamSessionsData>) => {
      if (error) {
        return;
      }

      // all good, handle the gql result
      setSessions(data?.session);
    },
  );

  const activeSession = useMemo(() => sessions?.[0], [sessions]);

  return activeSession ? (
    <div>
      <AnimatePresence>
        <Link href="/sessions/[id]" as={`/sessions/${activeSession.id}`} passHref>
          <motion.a
            className="flex items-center justify-between px-4 py-2 text-gray-100 bg-green-500 rounded"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.99 }}
          >
            <p className="font-semibold text-center">Join {activeSession.team.name} Smileys!</p>
            <motion.div animate={{ x: [0, -4, 0] }} transition={{ loop: Infinity, duration: 1.5 }}>
              <MdArrowForward size="28" />
            </motion.div>
          </motion.a>
        </Link>
      </AnimatePresence>
      <div className="h-4"></div>
    </div>
  ) : null;
};

const EntryItem: React.FC<{ entry: Entry; onDelete: () => Promise<void> }> = ({
  entry,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const fromNow = formatDistanceToNow(parseJSON(entry.created_at), { addSuffix: true });

  return (
    <motion.div positionTransition exit={{ opacity: 0, height: 0 }}>
      <header className="flex items-center justify-between h-16 px-3 bg-black rounded-t-sm">
        <div className="flex items-center space-x-3">
          <img className="h-10 rounded-full" src={entry.user.picture} alt={entry.user.name} />
          <div>
            <p className="text-base font-semibold leading-none text-gray-200">{entry.user.name}</p>
            <p className="text-sm text-gray-500">
              Posted {fromNow} in {entry.team.name}
            </p>
          </div>
        </div>
        <div className="relative">
          <button className="block" onClick={(): void => setShowMenu((isOpen) => !isOpen)}>
            <MdMoreHoriz className="text-gray-400" size="24" />
          </button>

          {showMenu && (
            <>
              <button
                className="fixed top-0 bottom-0 left-0 right-0 block w-full h-full bg-transparent"
                onClick={(): void => setShowMenu(false)}
              />
              <motion.div
                className="absolute right-0 w-48 py-1 bg-white rounded shadow-xl"
                initial={{ opacity: 0, scale: 0.4, translateX: 32, translateY: -16 }}
                animate={{ opacity: 1, scale: 1, translateX: 0, translateY: 0 }}
                transition={{ duration: 0.1 }}
              >
                <button
                  className="flex w-full px-4 py-2 transition-colors duration-150 space-x-2 hover:bg-black hover:text-white"
                  onClick={onDelete}
                >
                  <MdDelete size="24" />
                  <p>Delete</p>
                </button>
              </motion.div>
            </>
          )}
        </div>
      </header>
      <img src={entry.image.original_url} className="w-full h-auto rounded-b-sm" />
    </motion.div>
  );
};

export function useUserEntries(userId: string) {
  return useQuery<QueryData | undefined, QueryVariables>(USER_ENTRIES_QUERY, {
    variables: { id: userId },
  });
}

const EntryFeed: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, refetch } = useUserEntries(userId);

  const [currentYear, currentWeek] = useMemo(() => getCurrentWeek(), []);
  const currentEntry = data?.user_by_pk.entries.find(
    (item) => item.year === currentYear && item.week === currentWeek,
  );

  const deleteEntry = useDeleteEntryMutation();
  const handleRemoveItem = useCallback(
    async (id: number) => {
      await deleteEntry({ variables: { id } });
      await refetch();
    },
    [deleteEntry, refetch],
  );

  return (
    <>
      <div className="max-w-xl p-4 mx-auto">
        <p className="text-lg font-semibold text-black">Your GIF this week</p>
        <div className="h-3" />
        {currentEntry ? (
          <EntryItem
            entry={currentEntry}
            onDelete={(): Promise<void> => handleRemoveItem(currentEntry.id)}
          />
        ) : (
          <div className="bg-white">
            <header className="flex items-center h-16 px-3 bg-black rounded-t-sm">
              <div className="flex items-center space-x-3">
                <img
                  className="h-10 rounded-full"
                  src={data?.user_by_pk.picture}
                  alt={data?.user_by_pk.name}
                />
                <div>
                  <p className="text-base font-semibold leading-none text-gray-100">
                    {data?.user_by_pk.name}
                  </p>
                  <p className="text-sm text-gray-400">This week</p>
                </div>
              </div>
            </header>
            <div className="flex flex-col items-center justify-center h-64 border-b border-l border-r border-black rounded-b-sm">
              <p className="text-sm text-center text-gray-700">No GIF for this week yet</p>
              <div className="h-2" />
              <Link href="/entries/new">
                <a className="block px-6 py-2 mx-auto text-gray-700 transition-colors duration-150 bg-white border border-gray-400 rounded-sm hover:text-black hover:border-black">
                  <p className="text-center">Pick GIF</p>
                </a>
              </Link>
            </div>
          </div>
        )}
        <div className="h-6" />
        <p className="text-lg font-semibold text-black">Previous GIFs</p>
        <div className="h-3" />
        <div className="space-y-4">
          <AnimatePresence>
            {data?.user_by_pk.entries
              .filter((item) => item.id !== currentEntry?.id)
              .map((item) => (
                <EntryItem
                  key={item.id}
                  entry={item}
                  onDelete={(): Promise<void> => handleRemoveItem(item.id)}
                />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

const ProfilePage: React.FC = () => {
  const { user } = useAuth0();

  return <Layout>{user && <EntryFeed userId={user.sub} />}</Layout>;
};

export default ProfilePage;
