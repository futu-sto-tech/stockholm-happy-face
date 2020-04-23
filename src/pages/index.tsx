import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import { useAuth0 } from '../context/auth';
import { useRouter } from 'next/router';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { user, loading, authenticated, login } = useAuth0();

  useEffect(() => {
    if (authenticated && user) router.push('/profile');
  }, [router, authenticated, user]);

  return (
    <div className="flex items-center justify-center h-screen p-8 bg-gray-400">
      <div className="grid w-full max-w-screen-md gap-8">
        <img className="w-full mx-auto" src="/smileys-logo.svg" />
        {loading || authenticated ? (
          <motion.p
            className="text-3xl text-center"
            animate={{ rotate: 360 }}
            transition={{ loop: Infinity, repeatDelay: 1 }}
          >
            🤔
          </motion.p>
        ) : (
          <button
            className="w-48 p-3 mx-auto font-semibold text-gray-600 transition-shadow duration-200 bg-gray-200 rounded-lg shadow-sm opacity-75 hover:bg-white hover:shadow-2xl active:shadow-xs"
            onClick={login}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
