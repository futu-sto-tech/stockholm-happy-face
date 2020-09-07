import { useMutation } from 'graphql-hooks';

const MUTATION = /* GraphQL */ `
  mutation UpdateUser($user: String!) {
    update_user(where: { id: { _eq: $user } }, _set: { last_seen: "now()" }) {
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
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useUpdateOnlineUserMutation() {
  return useMutation<Data, Variables>(MUTATION);
}
