import { useCallback } from 'react';
import { useMutation } from 'graphql-hooks';

const MUTATION = /* GraphQL */ `
  mutation UpdateTeam($teamId: Int!, $entryId: Int!, $time: timestamptz!) {
    update_entry(where: { id: { _eq: $entryId } }, _set: { presented: true }) {
      returning {
        id
      }
    }

    update_team(
      where: { id: { _eq: $teamId } }
      _set: { entry_id: $entryId, changed_entry_at: $time }
    ) {
      returning {
        id
      }
    }
  }
`;

interface MutationData {
  update_entry: {
    returning: Array<{ id: number }>;
  };
  update_team: {
    returning: Array<{ id: number }>;
  };
}

interface MutationVariables {
  teamId: number;
  entryId: number;
  time: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function usePresentEntry(teamId: number) {
  const [mutate] = useMutation<MutationData, MutationVariables>(MUTATION);

  return useCallback(
    (entryId: number) => mutate({ variables: { teamId, entryId, time: new Date().toISOString() } }),
    [mutate, teamId],
  );
}
