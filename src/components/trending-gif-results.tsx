import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useQuery } from 'graphql-hooks';

const TRENDING_GIF_QUERY = /* GraphQL */ `
  query SearchGif($offset: Int) {
    trending_gif(offset: $offset) {
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
    <div>
      <div className="grid grid-cols-2 gap-2">
        {data?.trending_gif.map((item) => (
          <Link key={item.id} href={{ query: { url: item.original.url } }}>
            <a>
              <img src={item.preview.url} alt={item.title} className="object-cover w-full h-full" />
            </a>
          </Link>
        ))}
      </div>
      {data?.trending_gif.length && (
        <p className="font-semibold text-center" ref={scrollRef}>
          Loading more...
        </p>
      )}
    </div>
  );
};

export default TrendingGifResults;
