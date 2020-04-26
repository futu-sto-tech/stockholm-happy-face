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
    <div className="space-y-5">
      <img src={data?.user_by_pk.picture} className="w-40 h-40 mx-auto rounded-full" />
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            className="flex-1 border-r-0 border-black rounded-l-sm rounded-r-none form-input"
            value={name}
            onChange={({ target: { value } }): void => setName(value)}
            disabled={loading || name === undefined}
            required
          />

          <button
            className="px-6 py-2 text-white transition-colors duration-150 bg-black border border-black rounded-r-sm hover:bg-white hover:text-black"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth0();

  return (
    <Layout>
      <div className="max-w-lg p-4 mx-auto space-y-10">
        {user && <EditUserName userId={user.sub} />}

        <button
          className="block w-48 py-3 mx-auto text-gray-700 transition-colors duration-150 bg-white border border-gray-400 rounded-sm space-x-2 hover:text-black hover:border-black"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default SettingsPage;
