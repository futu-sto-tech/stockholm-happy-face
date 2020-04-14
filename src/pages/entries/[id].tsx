import React, { useCallback } from 'react';
import { useMutation, useQuery } from 'graphql-hooks';

import Link from 'next/link';
import { useAuth0 } from '../../context/auth';
import { useRouter } from 'next/router';
import { useUserEntries } from '../profile';

const query = /* GraphQL */ `
  query Entry($entryId: Int!) {
    entry_by_pk(id: $entryId) {
      year
      week
      user {
        id
        name
      }
      image {
        original_url
      }
      team {
        id
        name
      }
    }
  }
`;

interface QueryData {
  entry_by_pk: {
    year: number;
    week: number;
    user: {
      id: string;
      name: string;
    };
    image: {
      original_url: string;
    };
    team: {
      id: number;
      name: string;
    };
  };
}

interface QueryVariables {
  entryId: number;
}

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

const ActiveEntryPage: React.FC<{ userId: string; entryId: number }> = ({ userId, entryId }) => {
  const router = useRouter();
  const { data } = useQuery<QueryData, QueryVariables>(query, { variables: { entryId } });

  const { refetch } = useUserEntries(userId);
  const [deleteEntry] = useMutation<DeleteEntryData, DeleteEntryVariables>(DELETE_ENTRY_MUTATION);
  const handleClickDelete = useCallback(async () => {
    await deleteEntry({ variables: { id: entryId } });
    await refetch();
    router.push('/profile');
  }, [entryId, deleteEntry, router, refetch]);

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h2>
        Week {data?.entry_by_pk.week}, {data?.entry_by_pk.year}
      </h2>
      <img className="mx-auto my-4" src={data?.entry_by_pk.image.original_url} />
      <div className="grid grid-cols-3 gap-2">
        <Link href="/profile">
          <a className="block p-2 mb-4 text-center bg-gray-400 rounded shadow hover:bg-gray-300">
            Back
          </a>
        </Link>
        <Link href="/teams/[id]" as={`/teams/${data?.entry_by_pk.team.id}`}>
          <a className="block p-2 mb-4 text-center bg-gray-400 rounded shadow hover:bg-gray-300">
            {data?.entry_by_pk.team.name}
          </a>
        </Link>
        <button
          className="block p-2 mb-4 text-center bg-gray-400 rounded shadow hover:bg-gray-300"
          onClick={handleClickDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const EntryPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth0();
  const entryId = parseInt(router.query.id as string);

  if (user) {
    return <ActiveEntryPage userId={user.sub} entryId={entryId} />;
  }

  return <p>Loading...</p>;
};

export default EntryPage;
