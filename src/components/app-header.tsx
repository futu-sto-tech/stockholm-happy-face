import React from 'react';

function AppHeader({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <header className="bg-white">
      <div className="flex items-center h-16 max-w-4xl px-4 mx-auto">{children}</div>
    </header>
  );
}

export default AppHeader;
