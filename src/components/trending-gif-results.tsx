import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import MasonryGrid from './masonry-grid';
import { MdTrendingUp } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useQuery } from 'graphql-hooks';

const TRENDING_GIF_QUERY = /* GraphQL */ `
  query SearchGif($offset: Int) {
    trending_gif(offset: $offset) {
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

interface TrendingGifData {
  trending_gif: Array<GifResult>;
}

interface TrendingGifVariables {
  offset: number;
}

const updateData = (prevData: TrendingGifData, data: TrendingGifData): TrendingGifData => ({
  // eslint-disable-next-line @typescript-eslint/camelcase
  trending_gif: [...prevData.trending_gif, ...data.trending_gif],
});

const TrendingGifResults: React.FC = () => {
  const [offset, setOffset] = useState(0);

  const { data } = useQuery<TrendingGifData | undefined, TrendingGifVariables>(TRENDING_GIF_QUERY, {
    variables: { offset },
    updateData: offset === 0 ? undefined : updateData,
  });

  const scrollRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const node = scrollRef.current;

      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            setOffset(data?.trending_gif.length || 0);
          }
        });
      });
      scrollObserver.observe(node);

      return (): void => scrollObserver.unobserve(node);
    }
  }, [data, setOffset]);

  return (
    <div className="space-y-4">
      <p className="flex items-center space-x-3 text-lg font-bold leading-none text-black">
        <MdTrendingUp size="24" />
        <span>Trending</span>
      </p>
      <MasonryGrid>
        {data?.trending_gif.map((item) => (
          <Link key={item.id} href={{ query: { url: item.original.url } }} passHref>
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
        ))}
      </MasonryGrid>
      {data?.trending_gif.length && (
        <p className="font-bold text-center" ref={scrollRef}>
          Loading more...
        </p>
      )}
    </div>
  );
};

export default TrendingGifResults;
