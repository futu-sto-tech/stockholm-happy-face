import { useMutation } from 'graphql-hooks';

const MUTATION = /* GraphQL */ `
  mutation UpdateUser($id: String!, $role: String!) {
    update_user(where: { id: { _eq: $id } }, _set: { role: $role }) {
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
  role: 'PARTICIPANT' | 'HOST';
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useUpdateUserRoleMutation() {
  return useMutation<Data, Variables>(MUTATION);
}
