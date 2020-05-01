import { Result, useSubscription } from 'graphql-hooks';

import { useState } from 'react';

const TEAM_SUBSCRIPTION = /* GraphQL */ `
  subscription Team($id: Int!) {
    team_by_pk(id: $id) {
      id
      name
      active
    }
  }
`;

interface Team {
  id: number;
  name: string;
  active: boolean;
}

interface Data {
  team_by_pk: Team;
}

export default function useTeamSubscription(id: number): Team | undefined {
  const [team, setTeam] = useState<Team>();

  useSubscription(
    { query: TEAM_SUBSCRIPTION, variables: { id } },
    ({ error, data }: Result<Data>) => {
      if (error) {
        return;
      }

      // all good, handle the gql result
      setTeam(data?.team_by_pk);
    },
  );

  return team;
}
