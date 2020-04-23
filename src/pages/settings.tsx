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
      picture
    }
  }
`;

interface UserData {
  user_by_pk: {
    name: string;
    picture: string;
  };
}

interface UserVariables {
  id: string;
}

const EditUserName: React.FC<{ userId: string }> = ({ userId }) => {
  const [name, setName] = useState<string>();
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
      }
    },
    [userId, name, updateUser, refetch],
  );

  return (
    <div>
      <img src={data?.user_by_pk.picture} className="w-40 h-40 mx-auto rounded-full" />
      <div className="h-4"></div>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            className="w-full h-12 rounded form-input"
            value={name}
            onChange={({ target: { value } }): void => setName(value)}
            disabled={loading || name === undefined}
            required
          />
          <div className="absolute top-0 bottom-0 right-0">
            <button
              type="submit"
              className="h-full px-4 text-gray-100 bg-gray-600 rounded-r hover:bg-gray-500"
              disabled={loading}
            >
              {loading ? 'Loading' : 'Update'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth0();

  return (
    <Layout>
      <div className="max-w-lg p-4 mx-auto space-y-4">
        {user && <EditUserName userId={user.sub} />}

        <button
          className="w-full px-4 py-2 font-semibold text-gray-600 transition-shadow duration-150 transform bg-white rounded shadow-xs hover:shadow-lg active:shadow-inner focus:shadow-outline active:bg-gray-200"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default SettingsPage;
