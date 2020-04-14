import React, { useMemo, useState } from 'react';
import { Result, useQuery, useSubscription } from 'graphql-hooks';

import Layout from '../components/layout';
import Link from 'next/link';
import { MdSearch } from 'react-icons/md';
import { getCurrentWeek } from '../lib/utils';
import { useAuth0 } from '../context/auth';

const CURRENT_YEAR = new Date().getFullYear();

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const TEAM_SESSIONS_SUBSCRIPTION = /* GraphQL */ `
  subscription TeamSessions($id: Int!) {
    session(where: { team_id: { _eq: $id }, is_active: { _eq: true } }) {
      id
    }
  }
`;

interface TeamSessionsData {
  session: Array<{ id: number }>;
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

const CurrentEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [sessions, setSessions] = useState<Array<{ id: number }>>();

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

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 py-3 font-semibold text-gray-800">
        <p>Week {entry.week}</p>
        {activeSession && (
          <Link href="/sessions/[id]" as={`/sessions/${activeSession.id}`}>
            <a className="text-green-600">Join Smileys!</a>
          </Link>
        )}
      </div>
      <div className="flex items-center justify-center">
        <Link href="/entries/[id]" as={`/entries/${entry.id}`}>
          <a>
            <img className="object-cover w-full" src={entry.image.original_url} />
          </a>
        </Link>
      </div>
      <div className="h-4" />
    </div>
  );
};

export function useUserEntries(userId: string) {
  return useQuery<QueryData | undefined, QueryVariables>(USER_ENTRIES_QUERY, {
    variables: { id: userId },
  });
}

const EntryFeed: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, loading } = useUserEntries(userId);

  const [currentYear, currentWeek] = useMemo(() => getCurrentWeek(), []);
  const currentEntry = data?.user_by_pk.entries.find(
    (item) => item.year === currentYear && item.week === currentWeek,
  );

  const entriesByMonth = useMemo(() => {
    const entryMap = data?.user_by_pk.entries
      .filter((item) => item.id !== currentEntry?.id)
      .reduce<{ [key: string]: { year: number; month: number; entries: Entry[] } }>(
        (prev, current) => {
          const key = `${current.year}-${current.month}`;
          if (key in prev) {
            prev[key].entries.push(current);
          } else {
            prev[key] = { year: current.year, month: current.month, entries: [current] };
          }

          return prev;
        },
        {},
      );

    return entryMap ? Object.values(entryMap) : undefined;
  }, [data, currentEntry]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="grid max-w-2xl gap-4 p-4 mx-auto">
        <div className="bg-white rounded-lg shadow">
          {currentEntry ? (
            <CurrentEntry entry={currentEntry} />
          ) : (
            <div className="flex-1">
              <div className="px-4 pt-3">
                <p className="font-semibold text-gray-800">Week {currentWeek}</p>
              </div>
              <div className="px-4 pt-3 pb-4">
                <Link href="/entries/new">
                  <a className="flex flex-row items-center block w-full p-2 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400">
                    <MdSearch size="20" className="mr-2 text-gray-600" />
                    <p className="text-gray-600">How was you week? Search for a GIF</p>
                  </a>
                </Link>
                <Link href="/entries/new?manual=on">
                  <a className="block mt-1 text-gray-500 underline">Or manually paste a link</a>
                </Link>
              </div>
            </div>
          )}
        </div>
        {entriesByMonth?.map(({ year, month, entries }) => (
          <div key={`${year}${month}`} className="bg-white rounded-lg shadow-sm">
            <div className="px-4 py-3 font-semibold text-gray-800">
              {year !== CURRENT_YEAR ? `${MONTHS[month - 1]} ${year}` : `${MONTHS[month - 1]}`}
            </div>
            <div className={`grid ${entries.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1`}>
              {entries.map((item) => (
                <Link key={item.id} href="/entries/[id]" as={`/entries/${item.id}`}>
                  <a>
                    <img
                      src={item.image.preview_url || item.image.original_url}
                      className="object-cover w-full h-64"
                    />
                  </a>
                </Link>
              ))}
            </div>
            <div className="h-4" />
          </div>
        ))}
      </div>
    </Layout>
  );
};

const ProfilePage: React.FC = () => {
  const { user } = useAuth0();

  if (user) {
    return <EntryFeed userId={user.sub} />;
  }

  return <p>Loading...</p>;
};

export default ProfilePage;
