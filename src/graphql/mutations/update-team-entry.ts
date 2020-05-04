import { useMutation } from 'graphql-hooks';

const MUTATION = /* GraphQL */ `
  mutation UpdateTeam($team: Int!, $entry: Int, $time: timestamptz) {
    update_team(
      where: { id: { _eq: $team } }
      _set: { entry_id: $entry, changed_entry_at: $time }
    ) {
      returning {
        id
      }
    }
  }
`;

interface Data {
  update_team: {
    returning: Array<{ id: number }>;
  };
}

interface Variables {
  team: number;
  entry?: number;
  time?: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useUpdateTeamEntry() {
  return useMutation<Data, Variables>(MUTATION);
}
