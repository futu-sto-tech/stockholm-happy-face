import { useMutation } from 'graphql-hooks';

const MUTATION = /* GraphQL */ `
  mutation UpdateTeam($id: Int!, $active: Boolean!) {
    update_team(where: { id: { _eq: $id } }, _set: { active: $active, entry_id: null }) {
      returning {
        id
      }
    }
  }
`;

interface Data {
  update_team: { returning: { id: number } };
}

interface Variables {
  id: number;
  active: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useUpdateTeamActiveMutation() {
  return useMutation<Data, Variables>(MUTATION);
}
