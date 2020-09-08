import { Entry } from 'types';
import GifPost from 'components/gif-post';
import MasonryGrid from 'components/masonry-grid';
import React from 'react';

interface Props {
  entries: Entry[];
}

const PostGrid: React.FC<Props> = ({ entries }) => (
  <MasonryGrid items={entries}>
    {({ user, image }): React.ReactElement => (
      <GifPost
        user={{ ...user, image: user.picture }}
        image={{
          url: image.fixed_width_url || image.original_url,
          webp: image.fixed_width_webp_url,
        }}
      />
    )}
  </MasonryGrid>
);

export default PostGrid;
