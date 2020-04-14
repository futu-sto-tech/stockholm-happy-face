import React, { useCallback, useEffect } from 'react';
import { useMutation, useQuery } from 'graphql-hooks';

import Link from 'next/link';
import { useAuth0 } from '../../context/auth';
import { useRouter } from 'next/router';

const mutation = /* GraphQL */ `
  mutation InsertSession($team: Int!, $user: String!) {
    insert_session(objects: { team_id: $team, user_id: $user }) {
      returning {
        id
      }
    }
  }
`;

interface MutationData {
  insert_session: {
    returning: Array<{
      id: number;
    }>;
  };
}

interface MutationVariables {
  team: number;
  user: string;
}

interface NewSessionButtonProps {
  userId: string;
  teamId: number;
}

const NewSessionButton: React.FC<NewSessionButtonProps> = ({ userId, teamId }) => {
  const router = useRouter();
  const [insertSession, { data }] = useMutation<MutationData | undefined, MutationVariables>(
    mutation,
  );

  const handleClick = useCallback(async (): Promise<void> => {
    await insertSession({ variables: { team: teamId, user: userId } });
  }, [teamId, userId, insertSession]);

  useEffect(() => {
    if (data?.insert_session.returning.length) {
      console.log('new session', data);
      router.push('/sessions/[id]', `/sessions/${data.insert_session.returning[0].id}`);
    }
  }, [router, data]);

  return (
    <button
      className="block p-2 mb-4 text-center bg-gray-400 rounded shadow hover:bg-gray-300"
      onClick={handleClick}
    >
      Start Smileys
    </button>
  );
};

const query = /* GraphQL */ `
  query TeamAndUserEntries($teamId: Int!) {
    team_by_pk(id: $teamId) {
      name
      sessions(where: { is_active: { _eq: true } }) {
        id
      }
    }
  }
`;

interface QueryData {
  team_by_pk: {
    name: string;
    sessions: Array<{ id: number }>;
  };
}

interface QueryVariables {
  teamId: number;
}

const TeamPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth0();
  const teamId = parseInt(router.query.id as string);
  const { data } = useQuery<QueryData, QueryVariables>(query, { variables: { teamId } });

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h2>{data?.team_by_pk.name}</h2>
      {data?.team_by_pk.sessions.length ? (
        <Link href="/sessions/[id]" as={`/sessions/${data.team_by_pk.sessions[0].id}`}>
          <a className="block p-2 mb-4 text-center bg-gray-400 rounded shadow hover:bg-gray-300">
            Join
          </a>
        </Link>
      ) : (
        user && <NewSessionButton teamId={teamId} userId={user.sub} />
      )}
    </div>
  );
};

export default TeamPage;
