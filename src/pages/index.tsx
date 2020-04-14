import React, { useEffect } from 'react';

import { useAuth0 } from '../context/auth';
import { useRouter } from 'next/router';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { user, loading, authenticated, login } = useAuth0();

  useEffect(() => {
    if (authenticated && user) router.push('/profile');
  }, [router, authenticated, user]);

  return (
    <div className="flex items-center justify-center h-screen p-4 bg-blue-300">
      <div className="grid gap-4">
        <img className="w" src="/smileys-logo.svg" />
        {loading || authenticated ? (
          <div>Loading...</div>
        ) : (
          <button className="relative w-32 p-3 mx-auto" onClick={login}>
            <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-blue-400 rounded-lg opacity-75" />
            <p className="relative z-20 text-blue-700">Login</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
