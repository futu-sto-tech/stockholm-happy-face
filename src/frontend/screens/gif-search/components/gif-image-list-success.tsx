import { GifImage } from '../../../types';
import Link from 'next/link';
import React from 'react';
import ResponsiveGrid from '../../../component/responsive-grid';

const GifImageListSuccess: React.FC<{ data: GifImage[] | undefined }> = ({ data }) => (
  <>
    <ResponsiveGrid items={data} loading={data === undefined}>
      {(item): React.ReactNode => (
        <Link key={item.id} href={`/[userId]/new/preview?url=${item.originalUrl}`} as={item.link}>
          <a className="grid-item" style={{ backgroundImage: `url(${item.url})` }} />
        </Link>
      )}
    </ResponsiveGrid>

    <style jsx>{`
      .grid-item {
        display: block;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
      }
    `}</style>
  </>
);

export default GifImageListSuccess;
