import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'graphql-hooks';

import Layout from '../components/layout';
import { useAuth0 } from '../context/auth';

const UPDATE_USER_MUTATION = /* GraphQL */ `
  mutation UpdateUser($id: String!, $name: String!) {
    update_user(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        id
      }
    }
  }
`;

interface UpdateUserData {
  update_user: { returning: { id: string } };
}

interface UpdateUserVariables {
  id: string;
  name: string;
}

const USER_QUERY = /* GraphQL */ `
  query User($id: String!) {
    user_by_pk(id: $id) {
      name
    }
  }
`;

interface UserData {
  user_by_pk: {
    name: string;
  };
}

interface UserVariables {
  id: string;
}

const EditUserName: React.FC<{ userId: string }> = ({ userId }) => {
  const [name, setName] = useState<string>();
  const [editName, setEditName] = useState(false);
  const { data, refetch } = useQuery<UserData | undefined, UserVariables>(USER_QUERY, {
    variables: { id: userId },
  });

  useEffect(() => {
    if (data) setName(data.user_by_pk.name);
  }, [data]);

  const [updateUser, { loading }] = useMutation<UpdateUserData, UpdateUserVariables>(
    UPDATE_USER_MUTATION,
  );

  const handleSubmit = useCallback(
    async (event: FormEvent): Promise<void> => {
      event.preventDefault();

      if (name) {
        await updateUser({ variables: { id: userId, name } });
        await refetch();
        setEditName(false);
      }
    },
    [userId, name, updateUser, refetch],
  );

  return (
    <div>
      <div className="px-4 py-2 bg-white rounded shadow">
        <p className="text-sm text-gray-600 uppercase">Name</p>
        {editName ? (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <input
                className="flex-1 mr-2 form-input"
                value={name}
                onChange={({ target: { value } }): void => setName(value)}
                disabled={loading || name === undefined}
                required
              />
              <button
                type="submit"
                className="px-4 py-2 mr-2 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
                disabled={loading}
              >
                {loading ? 'Loading' : 'Save'}
              </button>
              <button
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
                onClick={(): void => setEditName(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-row items-center">
            <p className="flex-1">{data?.user_by_pk.name}</p>
            <button
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={(): void => setEditName(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth0();

  return (
    <Layout>
      <div className="grid max-w-2xl gap-4 p-4 mx-auto">
        {user && <EditUserName userId={user.sub} />}

        <button
          className="px-4 py-2 text-gray-700 transition-transform transform bg-gray-300 rounded hover:bg-gray-400 active:scale-95"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default SettingsPage;
