import { Entry, User } from 'types';
import { getEndOfWeek, getStartOfWeek } from '../../lib/utils';

import { useMemo } from 'react';
import { useSubscriptionWithCache } from '../../hooks';

const SUBSCRIPTION = /* GraphQL */ `
  subscription Team($teamId: Int!, $before: timestamptz!, $after: timestamptz!) {
    team_by_pk(id: $teamId) {
      id
      name
      changed_entry_at
      entries(where: { created_at: { _gte: $after, _lte: $before } }) {
        id
        week
        month
        year
        image {
          original_url
          color
        }
        user {
          id
          name
          picture
        }
        presented
      }
      participants {
        id
        name
        picture
      }
      entry {
        id
        week
        month
        year
        image {
          original_url
          color
        }
        user {
          id
          name
          picture
        }
      }
    }
  }
`;

interface Data {
  team_by_pk: {
    id: number;
    name: string;
    changed_entry_at: string;
    entries: Entry[];
    participants: User[];
    entry?: Entry;
  };
}

export default function useTeamSessionSubscription(teamId: number): Data | undefined {
  const startOfWeek = useMemo(() => getStartOfWeek().toISOString(), []);
  const endOfWeek = useMemo(() => getEndOfWeek().toISOString(), []);

  console.log(startOfWeek, endOfWeek);

  return useSubscriptionWithCache({
    query: SUBSCRIPTION,
    variables: { teamId, after: startOfWeek, before: endOfWeek },
  });
}
