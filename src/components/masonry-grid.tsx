import Masonry from 'react-masonry-css';
import React from 'react';

const MasonryGrid: React.FC = ({ children }) => {
  return (
    <Masonry
      breakpointCols={{ default: 3, 756: 2 }}
      className="flex w-auto -ml-1"
      columnClassName="ml-1"
    >
      {children}
    </Masonry>
  );
};

export default MasonryGrid;
