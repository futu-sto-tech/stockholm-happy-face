import React from 'react';

const AppHeader: React.FC = ({ children }) => (
  <header className="bg-white">
    <div className="max-w-4xl px-4 py-3 mx-auto">{children}</div>
  </header>
);

export default AppHeader;
