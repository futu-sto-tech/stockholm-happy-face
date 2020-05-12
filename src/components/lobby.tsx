import React, { useCallback, useRef } from 'react';

import Link from 'next/link';
import LogoIcon from './logo-icon';
import { MdArrowBack } from 'react-icons/md';
import { Session } from '../graphql/subscriptions/session';
import { motion } from 'framer-motion';
import useUpdateTeamEntry from '../graphql/mutations/update-team-entry';
import useUserQuery from '../graphql/queries/user';

const Lobby: React.FC<{ session: Session; userId: string }> = ({ session, userId }) => {
  const dragConstraint = useRef(null);
  const userData = useUserQuery(userId);

  const handleClickCopyLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(window.location.href);
  };

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
      <main className="flex flex-col items-center justify-center flex-1 space-y-10 bg-yellow-400">
        <div className="py-24 bg-white rounded-lg">
          <LogoIcon />
          <div className="flex flex-col items-center space-y-5">
            <div className="space-y-1">
              <p className="text-lg text-center">
                Team: <span className="font-semibold">{session?.name}</span>
              </p>
            </div>
            <p className="text-sm text-center text-gray-600">Waiting for Smileys to start...</p>
          </div>
        </div>

        <div className="w-full max-w-4xl p-4 mx-auto">
          <ul className="flex justify-center space-x-5">
            {session?.participants.map((item) => (
              <motion.li
                drag
                dragConstraints={dragConstraint}
                className="flex flex-col items-center cursor-move"
                key={item.id}
              >
                <div
                  className="w-16 h-16 bg-center bg-contain rounded-full"
                  style={{ backgroundImage: `url(${item.picture})` }}
                />
                <p className="text-sm text-gray-300">{item.name}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="p-4 bg-gray-100">
        <div className="flex items-center w-full max-w-6xl mx-auto">
          <div className="flex items-center flex-1">
            <Link href="/profile">
              <a className="flex items-center px-4 space-x-1 flat-button-secondary">
                <MdArrowBack size="20" />
                <p>Leave</p>
              </a>
            </Link>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-center space-x-2">
              <button className="px-4 flat-button-secondary" onClick={handleClickCopyLink}>
                Copy link
              </button>

              <button className="px-4 flat-button-secondary">Preview my GIF</button>
            </div>
          </div>
          <div className="flex items-center justify-end flex-1">
            {userData.data?.user_by_pk.role === 'HOST' && (
              <button onClick={handleClickStart} className="flat-button-secondary">
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
