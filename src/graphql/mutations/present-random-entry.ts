import { getEndOfWeek, getStartOfWeek } from 'lib/utils';

import { useCallback, useState } from 'react';
import { useManualQuery } from 'graphql-hooks';
import usePresentEntry from './present-entry';

const START_OF_WEEK = getStartOfWeek().toISOString();
const END_OF_WEEK = getEndOfWeek().toISOString();

const QUERY = /* GraphQL */ `
  query Entries($teamId: Int!, $before: timestamptz!, $after: timestamptz!) {
    team_by_pk(id: $teamId) {
      id
      entries(where: { created_at: { _gte: $after, _lte: $before }, presented: { _eq: false } }) {
        id
        presented
      }
    }
  }
`;

interface QueryData {
  team_by_pk: {
    id: number;
    entries: Array<{ id: number; presented: boolean }>;
  };
}

interface QueryVariables {
  teamId: number;
  before: string;
  after: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function usePresentRandomEntry(teamId: number) {
  const [fetch] = useManualQuery<QueryData | undefined, QueryVariables>(QUERY);
  const presentEntry = usePresentEntry(teamId);

  // This state is only used to make sure the callback dependencies change.
  const [presentedUsers, setPresentedUsers] = useState<number[]>([]);

  return useCallback(async () => {
    const { data } = await fetch({
      variables: { teamId, after: START_OF_WEEK, before: END_OF_WEEK },
    });
    if (data && data.team_by_pk.entries.length > 0) {
      const notPresented = data.team_by_pk.entries;
      const randomEntryId = notPresented[Math.floor(Math.random() * notPresented.length)].id;
      setPresentedUsers([...presentedUsers, randomEntryId]);
      presentEntry(randomEntryId);
    } else {
      throw new Error('Unable to present random entry');
    }
  }, [presentedUsers]);
}
