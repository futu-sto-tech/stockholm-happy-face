import React, { useState } from 'react';
import { Result, useSubscription } from 'graphql-hooks';

import Layout from '../../components/layout';
import Link from 'next/link';

const TEAMS_SUBSCRIPTION = /* GraphQL */ `
  subscription Teams {
    team {
      id
      name
      sessions(where: { is_active: { _eq: true } }) {
        id
      }
    }
  }
`;

interface Team {
  id: number;
  name: string;
  sessions: Array<{ id: number }>;
}

interface QueryData {
  team: Team[];
}

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>();

  useSubscription({ query: TEAMS_SUBSCRIPTION }, ({ error, data }: Result<QueryData>) => {
    if (error) {
      return;
    }

    // all good, handle the gql result
    setTeams(data?.team);
  });

  return (
    <Layout>
      <div className="max-w-6xl p-4 mx-auto">
        <ul className="grid gap-2">
          {teams?.map((item) => (
            <li key={item.id}>
              <Link href="/teams/[id]" as={`/teams/${item.id}`}>
                <a className="block p-2 text-center bg-gray-400 rounded shadow hover:bg-gray-300">
                  {item.name} {item.sessions.length > 0 && `(ONGOING)`}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default TeamsPage;
