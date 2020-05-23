import { useMutation } from 'graphql-hooks';

const MUTATION = /* GraphQL */ `
  mutation UpdateUser($user: String!, $team: Int) {
    update_user(where: { id: { _eq: $user } }, _set: { session_id: $team }) {
      returning {
        id
      }
    }
  }
`;

interface Data {
  update_user: { returning: { id: string } };
}

interface Variables {
  user: string;
  team?: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useUpdateUserSessionMutation() {
  return useMutation<Data, Variables>(MUTATION);
}
