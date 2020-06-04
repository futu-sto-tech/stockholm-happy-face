import { getEndOfWeek, getStartOfWeek } from '../../lib/utils';

import { TeamLobby } from 'types';
import { useSubscriptionWithCache } from '../../hooks';

const START_OF_WEEK = getStartOfWeek().toISOString();
const END_OF_WEEK = getEndOfWeek().toISOString();

const SUBSCRIPTION = /* GraphQL */ `
  subscription TeamLobby($userId: String!, $before: timestamptz!, $after: timestamptz!) {
    user_by_pk(id: $userId) {
      id
      name
      picture
      role
      team {
        id
        name
        changed_entry_at
        active
        status
        entries(where: { created_at: { _gte: $after, _lte: $before } }) {
          id
          week
          month
          year
          image {
            fixed_width_webp_url
            fixed_width_url
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
  }
`;

interface Data {
  user_by_pk: TeamLobby;
}

export default function useTeamLobbySubscription(userId: string): Data | undefined {
  return useSubscriptionWithCache({
    query: SUBSCRIPTION,
    variables: { userId, after: START_OF_WEEK, before: END_OF_WEEK },
  });
}
