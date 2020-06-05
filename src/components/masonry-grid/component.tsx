import Masonry from 'react-masonry-css';
import React from 'react';

interface BaseT {
  id: number | string;
}

interface Props<T extends BaseT> {
  columns?: number;
  items: T[];
  children: (data: T) => React.ReactElement;
}

function MasonryGrid<T extends BaseT>({
  columns = 2,
  items,
  children,
}: Props<T>): React.ReactElement {
  return (
    <div>
      <Masonry
        breakpointCols={{ default: columns, 756: columns - 1 }}
        className="flex w-auto -mt-4 -ml-4"
        columnClassName="ml-4"
      >
        {items.map((item) => (
          <div key={item.id} className="mt-4">
            {children(item)}
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default MasonryGrid;
