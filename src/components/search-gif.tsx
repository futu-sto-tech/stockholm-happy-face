import React, { useEffect, useRef } from 'react';

import Link from 'next/link';
import MasonryGrid from './masonry-grid';
import TrendingGifResults from './trending-gif-results';
import { motion } from 'framer-motion';
import { useDebounce } from '../hooks';
import { useQuery } from 'graphql-hooks';

const SEARCH_GIF_QUERY = /* GraphQL */ `
  query SearchGif($query: String!, $offset: Int) {
    search_gif(query: $query, offset: $offset) {
      id
      original {
        url
      }
      fixed_width {
        url
        webp
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
  fixed_width: {
    url: string;
    webp: string;
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
      <MasonryGrid items={data?.search_gif || []} columns={3}>
        {(item): React.ReactElement => (
          <Link href={{ query: { url: item.original.url } }} passHref>
            <motion.a
              key={item.id}
              className="block w-full mb-1"
              initial={{ opacity: 0, y: -32 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <picture>
                <source srcSet={item.fixed_width.webp} type="image/webp" />
                <source srcSet={item.fixed_width.url} type="image/gif" />
                <img src={item.fixed_width.url} className="w-full h-auto" alt={item.title} />
              </picture>
            </motion.a>
          </Link>
        )}
      </MasonryGrid>
      {data?.search_gif.length && (
        <p className="text-center" ref={scrollRef}>
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
    <div className="space-y-10">
      <header className="max-w-2xl mx-auto space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-black">How was your week?</h2>
          <p className="text-base text-gray-700">
            Pick a GIF to share your experience this week with your team.
          </p>
        </div>
        <div className="space-y-2">
          <input
            className="block w-full border-gray-600 rounded form-input"
            placeholder="Happy, stressful, confusing..."
            type="search"
            value={query}
            onChange={({ target: { value } }): void => setQuery(value)}
          />
          <Link href={{ href: '/entries/new', query: { manual: 'on' } }}>
            <a className="block text-base text-black underline">Or paste a link</a>
          </Link>
        </div>
      </header>
      <main>
        {debouncedQuery ? (
          <SearchResults query={debouncedQuery} offset={offset} setOffset={setOffset} />
        ) : (
          <TrendingGifResults />
        )}
      </main>
    </div>
  );
};

export default SearchGif;
