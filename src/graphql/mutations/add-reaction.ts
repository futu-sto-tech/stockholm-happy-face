import { useMutation } from 'graphql-hooks';

const MUTATION = /* GraphQL */ `
  mutation InsertReaction($reaction: reaction_insert_input!) {
    insert_reaction(objects: [$reaction]) {
      returning {
        id
        created_at
        content
        entry
        sender_id
      }
    }
  }
`;

interface Data {
  insert_reaction: {
    returning: {
      id: number;
      created_at: Date;
      content: string;
      sender_id: number;
    };
  };
}

interface Variables {
  content: string;
  entry: number;
  sender_id: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useInsertReactionMutation() {
  return useMutation<Data, Variables>(MUTATION);
}
