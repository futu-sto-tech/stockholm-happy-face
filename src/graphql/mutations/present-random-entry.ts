import { getEndOfWeek, getStartOfWeek } from 'lib/utils';
import { useManualQuery } from 'graphql-hooks';
import usePresentEntry from './present-entry';
import { useState } from 'react';

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
  const [sessionIsFinished, setSessionIsFinished] = useState(false);

  const presentRandomEntry = async () => {
    const { data } = await fetch({
      variables: { teamId, after: START_OF_WEEK, before: END_OF_WEEK },
      skipCache: true,
    });

    if (data && data.team_by_pk.entries.length > 0) {
      const notPresented = data.team_by_pk.entries;
      const randomEntryId = notPresented[Math.floor(Math.random() * notPresented.length)].id;
      await presentEntry(randomEntryId);
    }

    const { data: updatedData } = await fetch({
      variables: { teamId, after: START_OF_WEEK, before: END_OF_WEEK },
      skipCache: true,
    });

    if (updatedData && updatedData.team_by_pk.entries.length === 0) {
      setSessionIsFinished(true);
    }
  };

  return {
    sessionIsFinished,
    presentRandomEntry,
  };
}
