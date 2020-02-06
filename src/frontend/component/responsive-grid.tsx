import React from 'react';

type ResponsiveGridProps<T> = {
  items?: T[];
  children: (item: T) => React.ReactNode;
  loading?: boolean;
};

function ResponsiveGrid<T>({
  items,
  children,
  loading = false,
}: ResponsiveGridProps<T>): JSX.Element {
  return (
    <div className="container">
      {loading
        ? [1, 2, 3, 4, 5].map(index => <div key={index} className="loading-item" />)
        : items && items.map(item => children(item))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          grid-auto-rows: 200px;
          grid-gap: 16px;
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .loading-item {
          height: 100%;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.05);
          animation: fade-in 1.5s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default ResponsiveGrid;
