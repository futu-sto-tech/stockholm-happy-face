import { Result, useSubscription } from 'graphql-hooks';
import { getEndOfWeek, getStartOfWeek } from '../lib/utils';
import { useMemo, useState } from 'react';

const SESSION_SUBSCRIPTION = /* GraphQL */ `
  subscription Session($team: Int!, $before: timestamptz!, $after: timestamptz!) {
    team_by_pk(id: $team) {
      id
      name
      active
      changed_entry_at
      entries(where: { created_at: { _gte: $after, _lte: $before } }) {
        id
        user_id
      }
      participants {
        id
        name
        picture
      }
      entry {
        id
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

interface User {
  id: string;
  name: string;
  picture: string;
}

export interface Entry {
  id: number;
  image: {
    original_url: string;
    color?: string;
  };
  user: User;
}

export interface Session {
  id: number;
  name: string;
  active: boolean;
  changed_entry_at: string;
  entries: Array<{ id: number; user_id: string }>;
  participants: User[];
  entry?: Entry;
}

interface SessionData {
  team_by_pk: Session;
}

export default function useSessionSubscription(teamId: number): Session | undefined {
  const [team, setTeam] = useState<Session>();

  const startOfWeek = useMemo(() => getStartOfWeek().toISOString(), []);
  const endOfWeek = useMemo(() => getEndOfWeek().toISOString(), []);

  useSubscription(
    {
      query: SESSION_SUBSCRIPTION,
      variables: { team: teamId, after: startOfWeek, before: endOfWeek },
    },
    ({ error, data }: Result<SessionData>) => {
      if (error) {
        console.warn(error);
        return;
      }

      // all good, handle the gql result
      setTeam(data?.team_by_pk);
    },
  );

  return team;
}
