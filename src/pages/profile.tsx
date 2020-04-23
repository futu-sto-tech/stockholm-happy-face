import { AnimatePresence, motion } from 'framer-motion';
import { MdArrowForward, MdDelete, MdRemove } from 'react-icons/md';
import React, { useCallback, useMemo, useState } from 'react';
import { Result, useQuery, useSubscription } from 'graphql-hooks';

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
      entries(order_by: { created_at: desc }) {
        id
        week
        year
        month
        team_id
        image {
          preview_url
          original_url
        }
      }
    }
  }
`;

interface Entry {
  id: number;
  year: number;
  month: number;
  week: number;
  team_id: number;
  image: {
    preview_url?: string;
    original_url: string;
  };
}

interface QueryData {
  user_by_pk: {
    entries: Array<Entry>;
  };
}

interface QueryVariables {
  id: string;
}

const SessionNotification: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [sessions, setSessions] = useState<Session[]>();

  useSubscription(
    { query: TEAM_SESSIONS_SUBSCRIPTION, variables: { id: entry.team_id } },
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

const CurrentEntry: React.FC<{ entry: Entry; onRemove: () => Promise<void> }> = ({
  entry,
  onRemove,
}) => {
  return (
    <div>
      <SessionNotification entry={entry} />
      <p className="text-lg font-semibold text-gray-700">Your GIF this week</p>
      <div className="h-1" />
      <div className="relative group">
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100">
          <Button onClick={onRemove}>
            <MdDelete size="24" />
          </Button>
        </div>
        <img className="w-full rounded-b" src={entry.image.original_url} />
      </div>
    </div>
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
        {currentEntry ? (
          <CurrentEntry
            entry={currentEntry}
            onRemove={(): Promise<void> => handleRemoveItem(currentEntry.id)}
          />
        ) : (
          <div>
            <p className="text-lg font-semibold text-gray-700">Your GIF this week</p>
            <div className="h-1" />

            <div className="flex flex-col items-center justify-center h-64 bg-gray-200 border border-gray-400 rounded">
              <p className="mb-2 text-sm text-center text-gray-600">No GIF for this week yet</p>
              <Link href="/entries/new">
                <a className="block w-32 py-2 mx-auto transition-shadow duration-150 bg-gray-100 border border-gray-400 rounded-lg hover:bg-gray-200 hover:shadow-lg active:shadow-xs">
                  <p className="text-center text-gray-600">Pick GIF</p>
                </a>
              </Link>
            </div>
          </div>
        )}
        <div className="h-4" />
        <p className="text-lg font-semibold text-gray-700">Previous GIFs</p>
        <div className="h-1" />
        <div className="space-y-4">
          <AnimatePresence>
            {data?.user_by_pk.entries
              .filter((item) => item.id !== currentEntry?.id)
              .map((item) => (
                <motion.div
                  key={item.id}
                  className="relative group"
                  positionTransition
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100">
                    <Button onClick={(): Promise<void> => handleRemoveItem(item.id)}>
                      <MdDelete size="24" />
                    </Button>
                  </div>
                  <img
                    src={item.image.preview_url || item.image.original_url}
                    className="w-full h-auto rounded"
                  />
                </motion.div>
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
