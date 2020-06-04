import React from 'react';
import TeamLobby from 'components/team-lobby';
import useTeamLobbySubscription from 'graphql/subscriptions/team-lobby';
import { useUserId } from 'hooks';

const TeamSwitch: React.FC = () => {
  const userId = useUserId();
  const data = useTeamLobbySubscription(userId);

  return data ? <TeamLobby data={data.user_by_pk} /> : null;
};

export default TeamSwitch;
