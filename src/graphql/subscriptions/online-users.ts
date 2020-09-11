import { getEndOfWeek, getStartOfWeek } from '../../lib/utils';

import { useMemo } from 'react';
import { useSubscriptionWithCache } from '../../hooks';

const ONLINE_USER_SUBSCRIPTION = `subscription OnlineUserSubscription($user_team_id: Int!) {
  online_team_users(
    args: {user_team_id: $user_team_id}
    order_by: {
      name: asc
    }
  )
    {
    id
    name
    picture
    team_id
  }
}`

export interface OnlineUser {
  id: string;
  name: string;
  picture: string;
  team_id: string;
}

export interface OnlineUsers {
  online_team_users: OnlineUser[]
}

export default function useSessionSubscription(user_team_id: number): OnlineUsers | undefined {
  return useSubscriptionWithCache({
    query: ONLINE_USER_SUBSCRIPTION,
    variables: { user_team_id },
  });
}
