import { useUserList as useApiUserList, useCreateUser as useCreateApiUser } from '../api';
import { useCallback, useState } from 'react';

import { User } from '../../types';
import { responseInterface } from 'swr';
import { useDebounce } from '../hooks';
import { useRouter } from 'next/router';

export function useCreateUser(): {
  createUser: (name: string) => void;
  error: string | undefined;
} {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const createApiUser = useCreateApiUser();

  const createUser = useCallback(
    async (name: string) => {
      setError(undefined);
      try {
        const user = await createApiUser(name);
        console.info('Created new user');
        router.push('/[userId]', `/${user.id}`);
      } catch (error) {
        setError(error.message);
      }
    },
    [createApiUser, router],
  );

  return {
    error,
    createUser,
  };
}

export function useFilteredUserList(query: string): responseInterface<User[], string> {
  const debouncedQuery = useDebounce<string>(query, 1000);
  return useApiUserList(debouncedQuery);
}
