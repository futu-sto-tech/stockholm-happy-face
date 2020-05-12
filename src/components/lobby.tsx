import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useRef } from 'react';

import Link from 'next/link';
import LogoIcon from './logo-icon';
import { MdArrowBack } from 'react-icons/md';
import { Session } from '../graphql/subscriptions/session';
import buttonStyles from '../styles/button.module.css';
import useUpdateTeamEntry from '../graphql/mutations/update-team-entry';
import useUserQuery from '../graphql/queries/user';

const Lobby: React.FC<{ session: Session; userId: string }> = ({ session, userId }) => {
  const dragConstraint = useRef(null);
  const userData = useUserQuery(userId);

  const [updateTeamEntry] = useUpdateTeamEntry();
  const handleClickStart = useCallback(async () => {
    const entryId = session.entries[0].id;
    await updateTeamEntry({
      variables: { team: session.id, entry: entryId, time: new Date().toISOString() },
    });
  }, [session, updateTeamEntry]);

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 bottom-0 left-0 right-0 m-20 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none"
          ref={dragConstraint}
        ></div>
      </div>
      <main className="flex flex-col items-center justify-between flex-1 px-4 py-24 space-y-10 bg-yellow-400">
        <div className="flex flex-col items-center space-y-8">
          <LogoIcon />
          <div className="flex flex-col items-center px-16 py-8 space-y-5 bg-white rounded-lg shadow-lg">
            <div className="space-y-1">
              <p className="text-xl text-center">
                Team: <span className="font-bold">{session?.name}</span>
              </p>
              <p className="text-base text-center">
                {session.entries.length === 1
                  ? `${session.entries.length} post `
                  : `${session.entries.length} posts `}
                so far
              </p>
            </div>
          </div>
          <p className="text-base text-center text-black">Waiting for Smileys to start</p>
        </div>

        <div className="w-full max-w-4xl p-4 mx-auto bg-white rounded-lg shadow-lg">
          <ul className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
            <AnimatePresence exitBeforeEnter>
              {session?.participants.map((item) => (
                <motion.li
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  drag
                  dragConstraints={dragConstraint}
                  className="flex flex-col items-center justify-center h-24 cursor-move"
                  key={item.id}
                >
                  <div
                    className="w-16 h-16 bg-center bg-contain rounded-full"
                    style={{ backgroundImage: `url(${item.picture})` }}
                  />
                  <p className="text-sm text-black">{item.name}</p>
                </motion.li>
              ))}
            </AnimatePresence>
            {session.participants.length === 0 && <li className="h-24"></li>}
          </ul>
        </div>
      </main>

      <footer className="p-4 bg-gray-100">
        <div className="flex items-center w-full max-w-6xl mx-auto">
          <div className="flex items-center flex-1">
            <Link href="/profile">
              <a className={`${buttonStyles.tertiary} space-x-1`}>
                <MdArrowBack size="20" />
                <p>Leave</p>
              </a>
            </Link>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-center space-x-2">
              <button className={buttonStyles.tertiary}>Preview my GIF</button>
            </div>
          </div>
          <div className="flex items-center justify-end flex-1">
            {userData.data?.user_by_pk.role === 'HOST' && (
              <button onClick={handleClickStart} className={buttonStyles.secondary}>
                Start session
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Lobby;
