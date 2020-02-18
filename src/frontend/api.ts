import { ApiEntry, SearchResult, User } from '../types';
import useSWR, { mutate, responseInterface } from 'swr';

import fetch from './fetch';
import { useCallback } from 'react';

const ENDPOINT = {
  users: '/api/users',
  usersByQuery: (query: string): string => `/api/users?query=${query}`,
  user: (userId: string): string => `/api/users/${userId}`,
  entry: (entryId: string): string => `/api/entries/${entryId}`,
  entries: '/api/entries',
  entriesByUser: (userId: string): string => `/api/entries?user=${userId}`,
  gifSearch: (query: string, offset: number): string =>
    `/api/gif/search?query=${query}&offset=${offset}`,
};

type UserListResponse = User[];

export function useUserList(query?: string): responseInterface<UserListResponse, string> {
  return useSWR<UserListResponse, string>(
    query ? ENDPOINT.usersByQuery(query) : ENDPOINT.users,
    fetch,
  );
}

type UserResponse = User;

export function useUser(userId?: string): responseInterface<UserResponse, string> {
  return useSWR<UserResponse, string>(() => (userId ? ENDPOINT.user(userId) : null), fetch);
}

export function useEntry(entryId?: string): responseInterface<EntryResponse, string> {
  return useSWR<EntryResponse, string>(() => (entryId ? ENDPOINT.entry(entryId) : null), fetch);
}

type EntryListResponse = ApiEntry[];

export function useUserEntryList(userId?: string): responseInterface<EntryListResponse, string> {
  return useSWR<EntryListResponse>(() => (userId ? ENDPOINT.entriesByUser(userId) : null), fetch);
}

type SearchResultResponse = {
  images: SearchResult[];
};

export function useGifSearch(
  query?: string,
  offset = 0,
): responseInterface<SearchResultResponse, string> {
  return useSWR<SearchResultResponse>(
    () => (query ? ENDPOINT.gifSearch(query, offset) : null),
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
      try {
        const newUser = await fetch<UserResponse>(ENDPOINT.users, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
        mutate(ENDPOINT.users, [...(userList || []), newUser], false);
        return newUser;
      } catch (error) {
        throw new Error('Unable to create new user');
      }
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
      const newEntry = await fetch<EntryResponse>(ENDPOINT.entries, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      mutate(ENDPOINT.entriesByUser(userId), [...(userEntries.data || []), newEntry], false);
    },
    [userId, userEntries.data],
  );

  return createNewEntry;
}

export function useDeleteEntry(userId: string): (entryId: string) => Promise<void> {
  const userEntries = useUserEntryList(userId);

  return useCallback(
    async (entryId: string): Promise<void> => {
      await fetch<EntryResponse>(ENDPOINT.entry(entryId), {
        method: 'DELETE',
      });
      const updatedEntries = userEntries.data?.filter(item => item.id !== entryId);
      mutate(ENDPOINT.entriesByUser(userId), updatedEntries, false);
    },
    [userEntries.data, userId],
  );
}
