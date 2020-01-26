import { useCallback, useState } from 'react';
import { useChangeGifQuery, useChangeOffset } from '../../hooks';

import { useCreateNewEntry } from '../../api';
import { useRouter } from 'next/router';

export function useCreateEntry(
  userId: string,
  url: string,
): {
  error: string | undefined;
  createEntry: () => Promise<void>;
} {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const createNewEntry = useCreateNewEntry(userId);
  const changeGifQuery = useChangeGifQuery();
  const changeOffset = useChangeOffset();

  const createEntry = useCallback(async (): Promise<void> => {
    try {
      await createNewEntry(url);
      changeGifQuery('');
      changeOffset(0);
      router.push('/[userId]', `/${userId}`);
    } catch (saveError) {
      setError(saveError);
    }
  }, [changeGifQuery, changeOffset, createNewEntry, router, url, userId]);

  return { error, createEntry };
}
