import { getEndOfWeek, getStartOfWeek } from 'lib/utils';

import { useCallback } from 'react';
import { useMutation } from 'graphql-hooks';

const START_OF_WEEK = getStartOfWeek().toISOString();
const END_OF_WEEK = getEndOfWeek().toISOString();

const MUTATION_DELETE_ENTRY = /* GraphQL */ `
  mutation DeleteEntry($team: Int!, $user: String!, $before: timestamptz!, $after: timestamptz!) {
    delete_entry(
      where: {
        user_id: { _eq: $user }
        team_id: { _eq: $team }
        created_at: { _gte: $after, _lte: $before }
      }
    ) {
      returning {
        id
      }
    }
  }
`;

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

interface DeleteVariables {
  team: number;
  user: string;
  before: string;
  after: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useInsertEntryWithImage(user: string) {
  const [deleteExisting] = useMutation<unknown, DeleteVariables>(MUTATION_DELETE_ENTRY);
  const [mutate] = useMutation<Data, VariablesWithImage>(MUTATION_WITH_IMAGE);
  return useCallback(
    async (team: number, image: number) => {
      await deleteExisting({
        variables: { user, team, after: START_OF_WEEK, before: END_OF_WEEK },
      });
      return await mutate({ variables: { user, team, image } });
    },
    [user, mutate, deleteExisting],
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useInsertEntryWithUrl(user: string) {
  const [deleteExisting] = useMutation<unknown, DeleteVariables>(MUTATION_DELETE_ENTRY);
  const [mutate] = useMutation<Data, VariablesWithUrl>(MUTATION_WITH_URL);
  return useCallback(
    async (team: number, url: string) => {
      await deleteExisting({
        variables: { user, team, after: START_OF_WEEK, before: END_OF_WEEK },
      });
      return await mutate({
        variables: { user, team, url },
      });
    },
    [user, mutate, deleteExisting],
  );
}
