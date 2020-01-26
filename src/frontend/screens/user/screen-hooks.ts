import { UserImage } from '../../types';
import { useMemo } from 'react';
import { useUserEntryList } from '../../api';

export function useImageList(
  userId: string,
): { data: UserImage[] | undefined; error: string | undefined } {
  const { data, error } = useUserEntryList(userId);

  const imageList = useMemo(() => {
    if (data) {
      return data.map(item => ({
        id: item.id,
        url: item.images.preview?.url || item.images.original.url,
        link: `/${userId}/${item.id}`,
        week: item.week,
        year: item.year,
      }));
    } else {
      return undefined;
    }
  }, [data, userId]);

  return { data: imageList, error };
}
