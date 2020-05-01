import { UseQueryResult, useQuery } from 'graphql-hooks';

const TEAMS_QUERY = /* GraphQL */ `
  query Teams {
    team {
      id
      name
    }
  }
`;

interface Team {
  id: number;
  name: string;
}

interface TeamsQueryData {
  team: Team[];
}

export default function useTeamsQuery(): UseQueryResult<TeamsQueryData> {
  return useQuery(TEAMS_QUERY);
}
