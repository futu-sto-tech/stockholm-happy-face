import React from 'react';
import TeamLobby from 'components/team-lobby';
import TeamSession from 'components/team-session';
import useTeamLobbySubscription from 'graphql/subscriptions/team-lobby';
import { useUserId } from 'hooks';

const TeamSwitch: React.FC = () => {
  const userId = useUserId();
  const data = useTeamLobbySubscription(userId);

  return data?.user_by_pk.team.entry ? (
    <TeamSession team={data.user_by_pk.team.id} />
  ) : data ? (
    <TeamLobby data={data.user_by_pk} />
  ) : null;
};

export default TeamSwitch;
