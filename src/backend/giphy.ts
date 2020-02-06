import axios from 'axios';

const client = axios.create({ baseURL: 'https://api.giphy.com/v1/gifs' });

client.interceptors.request.use(config => ({
  ...config,
  params: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    api_key: process.env.GIPHY_API_KEY,
    lang: 'en',
    rating: 'PG-13',
    ...config.params,
  },
}));

type ImageObject = {
  url: string;
  width: string;
  height: string;
};

type GifObject = {
  id: string;
  title: string;
  images: {
    preview_gif: ImageObject;
    original: ImageObject;
  };
};

type SearchResponse = {
  data: GifObject[];
};

type GifResponse = {
  data: GifObject;
};

export type ApiGifObject = {
  id: string;
  title: string;
  preview: { width: string; height: string; url: string };
  original: { width: string; height: string; url: string };
};

function parseGifObject(item: GifObject): ApiGifObject {
  const { id, title, images } = item;
  const { width, height, url } = images.preview_gif;

  return {
    id,
    title,
    preview: {
      width,
      height,
      url,
    },
    original: {
      width: images.original.width,
      height: images.original.height,
      url: images.original.url,
    },
  };
}

export async function searchGiphy(
  query: string,
  { limit = 25, offset = 0 },
): Promise<ApiGifObject[]> {
  try {
    const response = await client.get<SearchResponse>('search', {
      params: { q: query, limit, offset },
    });
    return response.data.data.map(parseGifObject);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getGiphyGif(id: string): Promise<ApiGifObject | undefined> {
  try {
    const response = await client.get<GifResponse>(id);
    return parseGifObject(response.data.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
