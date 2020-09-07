import React, { useEffect, useMemo } from 'react';
import Router, { useRouter } from 'next/router';

import Lobby from '../../components/lobby';
import Presentation from '../../components/presentation';
import useSessionSubscription from '../../graphql/subscriptions/session';
import useOnlineUsers, { OnlineUser } from '../../graphql/subscriptions/online-users';
import useUpdateUserSessionMutation from '../../graphql/mutations/update-user-session';
import useUpdateOnlineUserMutation from '../../graphql/mutations/update-online-user';
import { useUserId } from '../../hooks';

const TeamPage: React.FC = () => {
  const router = useRouter();
  const teamId = parseInt(router.query.id as string);
  const data = useSessionSubscription(teamId);
  const userId = useUserId();
  const [updateUserSession] = useUpdateUserSessionMutation();

  const activeUsers = useOnlineUsers(teamId);
  const onlineUsers = activeUsers ? activeUsers.online_team_users : [];

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


  return data ? (
    data.team_by_pk.entry ? (
      <Presentation session={data.team_by_pk} activeParticipants={onlineUsers} entry={data.team_by_pk.entry} />
    ) : (
        <Lobby session={data.team_by_pk} activeParticipants={onlineUsers} userId={userId} />
      )
  ) : null;
};

export default TeamPage;
