import { UseQueryResult, useQuery } from 'graphql-hooks';

import { Entry } from 'types';
import { getStartOfWeek } from 'lib/utils';

const START_OF_WEEK = getStartOfWeek().toISOString();

const QUERY = /* GraphQL */ `
  query TeamEntries($teamId: Int!, $before: timestamptz!) {
    entry(
      where: { team_id: { _eq: $teamId }, created_at: { _lte: $before } }
      order_by: { created_at: desc }
      limit: 80
    ) {
      id
      week
      month
      year
      image {
        fixed_width_webp_url
        fixed_width_url
        original_url
      }
      user {
        id
        name
        picture
      }
    }
  }
`;

interface QueryData {
  entry: Entry[];
}

interface Variables {
  teamId: number;
  before: string;
}

export default function useTeamEntriesQuery(
  teamId: number,
): UseQueryResult<QueryData | undefined, Variables> {
  return useQuery(QUERY, { variables: { teamId, before: START_OF_WEEK } });
}
