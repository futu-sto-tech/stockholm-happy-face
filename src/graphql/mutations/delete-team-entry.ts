import { useMutation } from 'graphql-hooks';

const MUTATION = /* GraphQL */ `
  mutation UpdateTeam($teamId: Int!) {
    update_team(where: { id: { _eq: $teamId } }, _set: { entry_id: null }) {
      returning {
        id
      }
    }
  }
`;

interface MutationData {
  update_team: {
    returning: Array<{ id: number }>;
  };
}

interface MutationVariables {
  teamId: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useDeleteTeamEntry() {
  return useMutation<MutationData, MutationVariables>(MUTATION);
}
