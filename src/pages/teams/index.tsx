import React, { useState } from 'react';
import { Result, useSubscription } from 'graphql-hooks';

import Layout from '../../components/layout';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';

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
      <div className="max-w-2xl px-4 py-10 mx-auto space-y-5">
        <h1 className="text-xl font-semibold">Flows</h1>
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {teams
            ?.filter((item) => item.sessions.length > 0)
            .map((item) => (
              <li key={item.id}>
                <Link href="/sessions/[id]" as={`/sessions/${item.sessions[0].id}`}>
                  <a className="block p-4 text-gray-700 transition-colors duration-150 bg-white border border-gray-400 rounded-sm hover:text-black hover:border-black space-y-2">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto text-4xl leading-none border border-gray-600 rounded-full">
                      {item.name.charAt(0)}
                    </div>
                    <p className="text-center">{item.name}</p>
                  </a>
                </Link>
              </li>
            ))}
          <li>
            <button className="w-full p-4 text-gray-700 transition-colors duration-150 bg-white border border-gray-400 rounded-sm hover:text-black hover:border-black space-y-2">
              <div className="flex items-center justify-center w-20 h-20 mx-auto text-4xl leading-none border border-gray-600 rounded-full">
                <MdAdd size="56" />
              </div>
              <p className="text-center">New team</p>
            </button>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default TeamsPage;
