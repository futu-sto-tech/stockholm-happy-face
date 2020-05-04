import { useSubscriptionWithCache } from '../../hooks';

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

export default function useTeamSubscription(id: number): Data | undefined {
  return useSubscriptionWithCache({ query: TEAM_SUBSCRIPTION, variables: { id } });
}
