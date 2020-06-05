import { UseClientRequestResult, useMutation } from 'graphql-hooks';

import { TeamStatus } from 'types';
import { useCallback } from 'react';

const MUTATION = /* GraphQL */ `
  mutation UpdateTeam($id: Int!, $status: String!) {
    update_team(where: { id: { _eq: $id } }, _set: { status: $status, entry_id: null }) {
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
  status: TeamStatus;
}

export default function useUpdateTeamStatus(
  id: number,
  status: TeamStatus,
): () => Promise<UseClientRequestResult<Data>> {
  const [mutate] = useMutation<Data, Variables>(MUTATION);
  return useCallback(() => mutate({ variables: { id, status } }), [mutate, id, status]);
}
