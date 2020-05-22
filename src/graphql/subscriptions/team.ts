import { getEndOfWeek, getStartOfWeek } from '../../lib/utils';

import { useSubscriptionWithCache } from '../../hooks';

const START_OF_WEEK = getStartOfWeek().toISOString();
const END_OF_WEEK = getEndOfWeek().toISOString();

const TEAM_SUBSCRIPTION = /* GraphQL */ `
  subscription Team($id: Int!, $before: timestamptz!, $after: timestamptz!) {
    team_by_pk(id: $id) {
      id
      name
      entry_id
      entries_aggregate(where: { created_at: { _gte: $after, _lte: $before } }) {
        aggregate {
          count
        }
      }
    }
  }
`;

interface Team {
  id: number;
  name: string;
  entry_id: number | null;
  entries_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export interface TeamSubscriptionData {
  team_by_pk: Team;
}

export default function useTeamSubscription(id: number): TeamSubscriptionData | undefined {
  return useSubscriptionWithCache({
    query: TEAM_SUBSCRIPTION,
    variables: { id, after: START_OF_WEEK, before: END_OF_WEEK },
  });
}
