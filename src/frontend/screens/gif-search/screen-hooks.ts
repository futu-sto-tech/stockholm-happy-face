import { GifImage } from '../../types';
import { useGifSearch } from '../../api';
import { useMemo } from 'react';

export function useGifImageList(
  userId: string,
  query: string,
  offset: number,
): { data: GifImage[] | undefined; error: string | undefined } {
  const { data, error } = useGifSearch(query, offset);

  const imageList = useMemo(() => {
    return data?.images.map(item => ({
      id: item.id,
      url: item.preview.url,
      originalUrl: item.original.url,
      link: `/${userId}/new/preview?url=${item.original.url}`,
    }));
  }, [data, userId]);

  return { data: imageList, error };
}
