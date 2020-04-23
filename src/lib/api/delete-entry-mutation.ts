import { FetchData, useMutation } from 'graphql-hooks';

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

export default function useDeleteEntryMutation(): FetchData<
  DeleteEntryData,
  DeleteEntryVariables,
  object
> {
  const [deleteEntry] = useMutation<DeleteEntryData, DeleteEntryVariables>(DELETE_ENTRY_MUTATION);
  return deleteEntry;
}
