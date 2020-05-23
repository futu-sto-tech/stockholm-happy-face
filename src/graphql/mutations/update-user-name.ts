import { useMutation } from 'graphql-hooks';

const MUTATION = /* GraphQL */ `
  mutation UpdateUser($id: String!, $name: String!) {
    update_user(where: { id: { _eq: $id } }, _set: { name: $name }) {
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
  id: string;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useUpdateUserNameMutation() {
  return useMutation<Data, Variables>(MUTATION);
}
