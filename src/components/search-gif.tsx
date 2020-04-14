import React, { useEffect, useRef } from 'react';

import Link from 'next/link';
import { MdClose } from 'react-icons/md';
import TrendingGifResults from './trending-gif-results';
import { useDebounce } from '../hooks';
import { useQuery } from 'graphql-hooks';

const SEARCH_GIF_QUERY = /* GraphQL */ `
  query SearchGif($query: String!, $offset: Int) {
    search_gif(query: $query, offset: $offset) {
      id
      original {
        url
      }
      preview {
        url
      }
      title
    }
  }
`;

interface GifResult {
  id: string;
  original: {
    url: string;
  };
  preview: {
    url: string;
  };
  title: string;
}

interface SearchGifData {
  search_gif: Array<GifResult>;
}

interface SearchGifVariables {
  query: string;
  offset: number;
}

const updateData = (prevData: SearchGifData, data: SearchGifData): SearchGifData => ({
  // eslint-disable-next-line @typescript-eslint/camelcase
  search_gif: [...prevData.search_gif, ...data.search_gif],
});

const SearchResults: React.FC<{
  query: string;
  offset: number;
  setOffset: (value: number) => void;
}> = ({ query, offset, setOffset }) => {
  const { data } = useQuery<SearchGifData | undefined, SearchGifVariables>(SEARCH_GIF_QUERY, {
    variables: { query, offset },
    updateData: offset === 0 ? undefined : updateData,
  });

  const scrollRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const node = scrollRef.current;

      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            setOffset(data?.search_gif.length || 0);
          }
        });
      });
      scrollObserver.observe(node);

      return (): void => scrollObserver.unobserve(node);
    }
  }, [data, setOffset]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {data?.search_gif.map((item) => (
          <Link key={item.id} href={{ query: { url: item.original.url } }}>
            <a>
              <img src={item.preview.url} alt={item.title} className="object-cover w-full h-full" />
            </a>
          </Link>
        ))}
      </div>
      {data?.search_gif.length && (
        <p className="font-semibold text-center" ref={scrollRef}>
          Loading more...
        </p>
      )}
    </div>
  );
};

const SearchGif: React.FC<{
  query: string;
  setQuery: (value: string) => void;
  offset: number;
  setOffset: (value: number) => void;
}> = ({ query, setQuery, offset, setOffset }) => {
  const debouncedQuery = useDebounce(query, 1000);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      <header className="relative flex items-center justify-center h-16 px-4 border-b border-gray-300">
        <p className="text-lg font-semibold text-center">Choose a GIF</p>
        <div className="absolute top-0 bottom-0 right-0 flex items-center pr-4">
          <Link href="/profile">
            <a className="p-2 bg-gray-200 rounded-full">
              <MdClose size="20" />
            </a>
          </Link>
        </div>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col">
          <input
            className="block w-full rounded-lg form-input"
            placeholder="Happy, sad, boring..."
            type="search"
            value={query}
            onChange={({ target: { value } }): void => setQuery(value)}
            autoFocus
          />
          <div className="h-4" />
          <div className="flex-1">
            {debouncedQuery ? (
              <SearchResults query={debouncedQuery} offset={offset} setOffset={setOffset} />
            ) : (
              <TrendingGifResults />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchGif;
