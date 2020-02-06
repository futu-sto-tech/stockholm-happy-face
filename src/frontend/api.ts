import { ApiEntry, SearchResult, User } from '../types';
import useSWR, { mutate, responseInterface } from 'swr';

import fetch from './fetch';
import { useCallback } from 'react';

type UserListResponse = User[];

export function useUserList(query?: string): responseInterface<UserListResponse, string> {
  return useSWR<UserListResponse, string>(
    query ? `/api/users?query=${query}` : '/api/users',
    fetch,
  );
}

type UserResponse = User;

export function useUser(userId?: string): responseInterface<UserResponse, string> {
  return useSWR<UserResponse, string>(() => (userId ? `/api/users/${userId}` : null), fetch);
}

export function useEntry(entryId?: string): responseInterface<EntryResponse, string> {
  return useSWR<EntryResponse, string>(() => (entryId ? `/api/entries/${entryId}` : null), fetch);
}

type EntryListResponse = ApiEntry[];

export function useUserEntryList(userId?: string): responseInterface<EntryListResponse, string> {
  return useSWR<EntryListResponse>(() => (userId ? `/api/entries?user=${userId}` : null), fetch);
}

type SearchResultResponse = {
  images: SearchResult[];
};

export function useGifSearch(
  query?: string,
  offset = 0,
): responseInterface<SearchResultResponse, string> {
  return useSWR<SearchResultResponse>(
    () => (query ? `/api/gif/search?query=${query}&offset=${offset}` : null),
    fetch,
  );
}

type NewEntryRequestBody = {
  userId: string;
  url: string;
};

type EntryResponse = ApiEntry;

type NewUserRequestBody = {
  name: string;
};

export function useCreateUser(): (name: string) => Promise<User> {
  const { data: userList } = useUserList();

  const handle = useCallback(
    async (name: string): Promise<User> => {
      const data: NewUserRequestBody = { name };
      const newUser = await fetch<UserResponse>('/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      mutate('/api/users', [...(userList || []), newUser]);
      return newUser;
    },
    [userList],
  );

  return handle;
}

export function useCreateNewEntry(userId: string): (url: string) => Promise<void> {
  const userEntries = useUserEntryList(userId);

  const createNewEntry = useCallback(
    async (url: string): Promise<void> => {
      const data: NewEntryRequestBody = { userId, url };
      const newEntry = await fetch<EntryResponse>('/api/entries', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      mutate('/api/entries', [...(userEntries.data || []), newEntry]);
    },
    [userId, userEntries.data],
  );

  return createNewEntry;
}

export function useDeleteEntry(userId: string): (entryId: string) => Promise<void> {
  const userEntries = useUserEntryList(userId);

  return useCallback(
    async (entryId: string): Promise<void> => {
      await fetch<EntryResponse>(`/api/entries/${entryId}`, {
        method: 'DELETE',
      });
      const updatedEntries = userEntries.data?.filter(item => item.id !== entryId);
      mutate('/api/entries', updatedEntries);
    },
    [userEntries],
  );
}
