import { ApiGifObject, searchGiphy } from '../giphy';

export async function searchGif(query: string, offset = 0): Promise<{ images: ApiGifObject[] }> {
  const images = await searchGiphy(query, { offset });
  return { images };
}
