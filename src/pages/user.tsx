import LogoIcon from 'components/logo-icon';
import React from 'react';

const UserPage: React.FC = () => {
  return (
    <div>
      <header className="sticky top-0 bg-white shadow-xl">
        <div className="flex items-center justify-between h-20 max-w-4xl px-4 mx-auto">
          <LogoIcon width="91" />
        </div>
      </header>
      <main>
        <p>Hello</p>
      </main>
    </div>
  );
};

export default UserPage;
