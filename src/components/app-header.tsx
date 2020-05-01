import React from 'react';

const AppHeader: React.FC = ({ children }) => (
  <header className="sticky top-0 bg-white shadow-xl">
    <div className="max-w-4xl px-4 py-3 mx-auto">{children}</div>
  </header>
);

export default AppHeader;
