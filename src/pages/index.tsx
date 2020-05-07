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
      <header className="flex justify-center py-24">
        <div className="w-full max-w-xs p-6 space-y-4 bg-gray-900 rounded shadow-stereoscopic">
          <div className="flex justify-center text-white">
            <LogoIcon size="120" />
          </div>
          <ul>
            <li className="flex items-center space-x-4">
              <p className="w-8 text-4xl font-bold text-gray-100 text-shadow-stereoscopic">1.</p>
              <p className="text-lg font-semibold text-gray-100">Log in</p>
            </li>
            <li className="flex items-center space-x-4">
              <p className="w-8 text-4xl font-bold text-gray-100 text-shadow-stereoscopic">2.</p>
              <p className="text-lg font-semibold text-gray-100">Select a GIF</p>
            </li>
            <li className="flex items-center space-x-4">
              <p className="w-8 text-4xl font-bold text-gray-100 text-shadow-stereoscopic">3.</p>
              <p className="text-lg font-semibold text-gray-100">Share with your team</p>
            </li>
          </ul>
          <div>
            <button className="mx-auto stereoscopic-button-white" onClick={login}>
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
      <main className="flex-1 bg-yellow-400">
        <div
          className="w-full"
          style={{
            backgroundImage: `url('/images/pattern.svg')`,
            height: 120,
            backgroundSize: 120,
          }}
        />
      </main>
    </div>
  );
};

export default IndexPage;
