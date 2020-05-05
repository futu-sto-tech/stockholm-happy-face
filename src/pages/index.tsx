import React, { useEffect } from 'react';

import LogoIcon from '../components/logo-icon';
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
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-end p-10">
        <div className="w-full max-w-xs p-6 space-y-4 border border-gray-700 rounded shadow-stereoscopic">
          <div className="flex justify-center">
            <LogoIcon size="120" />
          </div>
          <ul>
            <li className="flex items-center space-x-4">
              <p className="w-8 text-4xl font-bold text-shadow-stereoscopic">1.</p>
              <p className="text-lg font-bold">Log in</p>
            </li>
            <li className="flex items-center space-x-4">
              <p className="w-8 text-4xl font-bold text-shadow-stereoscopic">2.</p>
              <p className="text-lg font-bold">Select a GIF</p>
            </li>
            <li className="flex items-center space-x-4">
              <p className="w-8 text-4xl font-bold text-shadow-stereoscopic">3.</p>
              <p className="text-lg font-bold">Share with your team</p>
            </li>
          </ul>
          <div>
            <button className="mx-auto stereoscopic-button" onClick={login}>
              {loading || authenticated ? (
                <motion.span
                  className="text-3xl text-center"
                  animate={{ rotate: 360 }}
                  transition={{ loop: Infinity, repeatDelay: 1 }}
                >
                  🤔
                </motion.span>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-yellow-400"></main>
    </div>
  );
};

export default IndexPage;
