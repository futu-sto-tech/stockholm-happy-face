import React, { useEffect, useMemo } from 'react';
import Router, { useRouter } from 'next/router';

import Lobby from '../../components/lobby';
import Presentation from '../../components/presentation';
import useSessionSubscription from '../../graphql/subscriptions/session';
import useUpdateUserSessionMutation from '../../graphql/mutations/update-user-session';
import { useUserId } from '../../hooks';

const TeamPage: React.FC = () => {
  const router = useRouter();
  const teamId = parseInt(router.query.id as string);
  const data = useSessionSubscription(teamId);
  const userId = useUserId();
  const [updateUserSession] = useUpdateUserSessionMutation();

  const participants = useMemo(() => data?.team_by_pk.participants.map((item) => item.id), [data]);
  useEffect(() => {
    if (participants && participants.indexOf(userId) === -1) {
      updateUserSession({ variables: { user: userId, team: teamId } });
    }
  }, [userId, participants, teamId, updateUserSession]);

  useEffect(() => {
    async function handleDeleteSessionUser(url: string): Promise<void> {
      console.info('Changed route', url);
      await updateUserSession({ variables: { user: userId } });
    }

    Router.events.on('routeChangeStart', handleDeleteSessionUser);

    return (): void => Router.events.off('routeChangeStart', handleDeleteSessionUser);
  }, [userId, updateUserSession]);

  return data ? (
    data.team_by_pk.entry ? (
      <Presentation session={data.team_by_pk} entry={data.team_by_pk.entry} />
    ) : (
      <Lobby session={data.team_by_pk} userId={userId} />
    )
  ) : null;
};

export default TeamPage;
