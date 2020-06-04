import { UseQueryResult, useQuery } from 'graphql-hooks';

import { Lobby } from 'types';

const QUERY = /* GraphQL */ `
  query User($id: String!) {
    user_by_pk(id: $id) {
      id
      name
      picture
      role
      team {
        id
        name
        status
        entry {
          id
        }
        entries(order_by: { created_at: desc }, limit: 80) {
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
    }
  }
`;

interface QueryData {
  user_by_pk: Lobby;
}

interface Variables {
  id: string;
}

export default function useLobbyQuery(
  id: string,
): UseQueryResult<QueryData | undefined, Variables> {
  return useQuery(QUERY, { variables: { id } });
}
