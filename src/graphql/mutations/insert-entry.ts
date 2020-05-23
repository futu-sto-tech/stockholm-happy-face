import { useMutation } from 'graphql-hooks';

const MUTATION_WITH_IMAGE = /* GraphQL */ `
  mutation InsertEntry($team: Int!, $user: String!, $image: Int!) {
    insert_entry(objects: { team_id: $team, user_id: $user, image_id: $image }) {
      returning {
        id
      }
    }
  }
`;

const MUTATION_WITH_URL = /* GraphQL */ `
  mutation InsertEntry($team: Int!, $user: String!, $url: String!) {
    insert_entry(
      objects: { team_id: $team, user_id: $user, image: { data: { original_url: $url } } }
    ) {
      returning {
        id
      }
    }
  }
`;

interface Data {
  insert_entry: {
    returning: Array<{ id: number }>;
  };
}

interface VariablesWithUrl {
  team: number;
  user: string;
  url: string;
}

interface VariablesWithImage {
  team: number;
  user: string;
  image: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useInsertEntryWithImage() {
  return useMutation<Data, VariablesWithImage>(MUTATION_WITH_IMAGE);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useInsertEntryWithUrl() {
  return useMutation<Data, VariablesWithUrl>(MUTATION_WITH_URL);
}
