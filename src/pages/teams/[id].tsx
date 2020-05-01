import React, { useCallback, useEffect, useMemo } from 'react';
import Router, { useRouter } from 'next/router';

import Lobby from '../../components/lobby';
import Presentation from '../../components/presentation';
import { useAuth0 } from '../../context/auth';
import { useMutation } from 'graphql-hooks';
import useSessionSubscription from '../../subscriptions/session';
import useUpdateUserSessionMutation from '../../mutations/update-user-session';

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

const TeamPage: React.FC = () => {
  const router = useRouter();
  const teamId = parseInt(router.query.id as string);
  const session = useSessionSubscription(teamId);
  const { user } = useAuth0();
  const [updateUserSession] = useUpdateUserSessionMutation();

  const participants = useMemo(() => session?.participants.map((item) => item.id), [session]);
  useEffect(() => {
    if (user?.sub && participants && participants.indexOf(user.sub) === -1) {
      updateUserSession({ variables: { user: user.sub, team: teamId } });
    }
  }, [user, participants, teamId, updateUserSession]);

  useEffect(() => {
    async function handleDeleteSessionUser(url: string): Promise<void> {
      console.info('Changed route', url);
      if (user) {
        await updateUserSession({ variables: { user: user.sub } });
      }
    }

    Router.events.on('routeChangeStart', handleDeleteSessionUser);

    return (): void => Router.events.off('routeChangeStart', handleDeleteSessionUser);
  }, [user, updateUserSession]);

  return session && user ? (
    session.entry ? (
      <Presentation session={session} entry={session.entry} />
    ) : (
      <Lobby session={session} userId={user.sub} />
    )
  ) : null;
};

export default TeamPage;
