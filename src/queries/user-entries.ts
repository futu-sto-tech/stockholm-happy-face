import { useQuery } from 'graphql-hooks';

const QUERY = /* GraphQL */ `
  query UserWithEntries($id: String!) {
    user_by_pk(id: $id) {
      name
      picture
      role
      team_id
      entries(order_by: { created_at: desc }) {
        id
        created_at
        week
        year
        month
        team {
          id
          name
        }
        image {
          original_url
        }
        user {
          name
          picture
        }
      }
    }
  }
`;

export interface Entry {
  id: number;
  created_at: string;
  year: number;
  month: number;
  week: number;
  team: {
    id: number;
    name: string;
  };
  image: {
    original_url: string;
  };
  user: {
    name: string;
    picture: string;
  };
}

export interface EntryUser {
  name: string;
  role: 'HOST' | 'PARTICIPANT';
  picture: string;
  team_id: number;
  entries: Array<Entry>;
}

interface Data {
  user_by_pk: EntryUser;
}

interface Variables {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useUserEntriesQuery(userId: string) {
  return useQuery<Data | undefined, Variables>(QUERY, { variables: { id: userId } });
}
