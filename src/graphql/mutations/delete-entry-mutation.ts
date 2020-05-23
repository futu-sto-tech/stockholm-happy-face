import { useMutation } from 'graphql-hooks';

const DELETE_ENTRY_MUTATION = /* GraphQL */ `
  mutation DeleteEntry($id: Int!) {
    delete_entry(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

interface DeleteEntryData {
  delete_entry: { returning: { id: number } };
}

interface DeleteEntryVariables {
  id: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useDeleteEntryMutation() {
  return useMutation<DeleteEntryData, DeleteEntryVariables>(DELETE_ENTRY_MUTATION);
}
