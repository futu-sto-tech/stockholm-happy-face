import { useMutation } from 'graphql-hooks';

const UPDATE_USER_TEAM_MUTATION = /* GraphQL */ `
  mutation UpdateUser($id: String!, $team: Int!) {
    update_user(where: { id: { _eq: $id } }, _set: { team_id: $team }) {
      returning {
        id
      }
    }
  }
`;

interface UpdateUserTeamData {
  update_user: { returning: { id: string } };
}

interface UpdateUserTeamVariables {
  id: string;
  team: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useUpdateUserTeamMutation() {
  return useMutation<UpdateUserTeamData, UpdateUserTeamVariables>(UPDATE_USER_TEAM_MUTATION);
}
