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
    <div className="flex flex-col min-h-screen bg-gray-400">
      <div className="flex items-center justify-center flex-1 p-8">
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
      <div className="grid max-w-6xl gap-10 px-4 mx-auto grid-col-1 lg:grid-cols-3">
        <section className="flex flex-col justify-between space-y-5">
          <div>
            <p className="text-lg font-semibold text-center text-gray-700">Step 1 - Login</p>
            <p className="text-center text-gray-600">Use your company Google account</p>
          </div>
          <img className="w-64 h-auto mx-auto" src="/images/login.svg" alt="Login" />
        </section>

        <section className="flex flex-col justify-between space-y-5">
          <div>
            <p className="text-lg font-semibold text-center text-gray-700">Step 2 - Pick a GIF</p>
            <p className="text-center text-gray-600">
              Try to find one that represents how your week has been
            </p>
          </div>
          <img className="w-64 h-auto mx-auto" src="/images/pick-gif.svg" alt="Pick a GIF" />
        </section>

        <section className="flex flex-col justify-between space-y-5">
          <div>
            <p className="text-lg font-semibold text-center text-gray-700">
              Step 3 - Join Smileys!
            </p>
            <p className="text-center text-gray-600">
              At the end of the week, gather the team and share how you feel
            </p>
          </div>
          <img className="w-64 h-auto mx-auto" src="/images/share-week.svg" alt="Pick a GIF" />
        </section>
      </div>
      <div className="flex-1" />
      <div className="h-10 lg:h-0" />
    </div>
  );
};

export default IndexPage;
