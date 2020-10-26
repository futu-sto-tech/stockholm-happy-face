import { useMutation } from 'graphql-hooks';

const MUTATION = /* GraphQL */ `
  mutation InsertReaction($reaction: String!, $entryId: Int!, $user: String!) {
    insert_reaction(objects: { content: $reaction, entry_id: $entryId, user_id: $user }) {
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

interface Variables {
  reaction: string;
  entryId: number;
  user: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useInsertReactionMutation() {
  return useMutation<Data, Variables>(MUTATION);
}
