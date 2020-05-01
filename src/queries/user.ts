import { UseQueryResult, useQuery } from 'graphql-hooks';

const USER_QUERY = /* GraphQL */ `
  query User($id: String!) {
    user_by_pk(id: $id) {
      id
      name
      picture
      role
      team {
        id
        name
      }
    }
  }
`;

export interface UserQueryData {
  user_by_pk: {
    id: string;
    name: string;
    picture?: string;
    role: 'PARTICIPANT' | 'HOST';
    team?: {
      id: number;
      name: string;
    };
  };
}

export interface UserQueryVariables {
  id: string;
}

export default function useUserQuery(
  id: string,
): UseQueryResult<UserQueryData | undefined, UserQueryVariables> {
  return useQuery(USER_QUERY, { variables: { id } });
}
