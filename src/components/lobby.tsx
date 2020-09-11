import * as gtag from 'lib/gtag';

import { AnimatePresence, motion } from 'framer-motion';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import React, { useCallback, useRef, useState } from 'react';

import Link from 'next/link';
import LogoIcon from './logo-icon';
import { MdArrowBack } from 'react-icons/md';
import { Session } from '../graphql/subscriptions/session';
import { OnlineUser } from '../graphql/subscriptions/online-users';
import buttonStyles from '../styles/button.module.css';
import useDeleteEntryMutation from 'graphql/mutations/delete-entry-mutation';
import { useRouter } from 'next/router';
import useUpdateTeamEntry from '../graphql/mutations/update-team-entry';
import useUserQuery from '../graphql/queries/user';

const Lobby: React.FC<{ session: Session; activeParticipants: OnlineUser[], userId: string }> = ({ session, activeParticipants, userId }) => {
  const router = useRouter();
  const dragConstraint = useRef(null);
  const userData = useUserQuery(userId);
  const [showModal, setShowModal] = useState(false);

  const [updateTeamEntry] = useUpdateTeamEntry();
  const handleClickStart = useCallback(async () => {
    const entryId = session.entries[0].id;
    await updateTeamEntry({
      variables: { team: session.id, entry: entryId, time: new Date().toISOString() },
    });
  }, [session, updateTeamEntry]);

  const userEntry = session.entries.find((item) => item.user.id === userId);

  const [deleteEntry] = useDeleteEntryMutation();
  const handleClickChangeGIF = useCallback(
    async (entryId: number) => {
      router.push('/entries/new');
      await deleteEntry({ variables: { id: entryId } });
    },
    [deleteEntry, router],
  );

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
              {activeParticipants.map((item) => (
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

      <footer className="p-4 bg-white">
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
              {userEntry ? (
                <button
                  onClick={(): void => {
                    setShowModal(true);
                    gtag.event({ name: 'showGifPreview' });
                  }}
                  className={buttonStyles.tertiary}
                >
                  Preview my GIF
                </button>
              ) : (
                  <Link href="/entries/new">
                    <a className={buttonStyles.primary}>Pick a GIF</a>
                  </Link>
                )}
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

      {userEntry && (
        <AnimatePresence>
          <DialogOverlay
            isOpen={showModal}
            onDismiss={(): void => setShowModal(false)}
            style={{ background: 'rgba(0, 0, 0, 0.75)' }}
          >
            <DialogContent
              style={{ background: 'transparent', width: '100%' }}
              className="max-w-4xl"
            >
              <motion.div
                initial={{ opacity: 0.5, scale: 0.9, translateY: 56 }}
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                className="w-full rounded-lg shadow-2xl"
              >
                <header className="flex items-center justify-between h-20 px-4 bg-black rounded-t-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-12 h-12 rounded-full"
                      alt="User avatar"
                      src={userEntry.user.picture}
                    />
                    <div className="space-y-2">
                      <p className="text-xl font-bold leading-none text-white">
                        {userEntry.user.name}
                      </p>
                      <p className="text-base leading-none text-white">This week</p>
                    </div>
                  </div>

                  <button
                    onClick={(): any => {
                      handleClickChangeGIF(userEntry.id);
                      gtag.event({ name: 'changeGifFromLobby' });
                    }}
                    className="px-4 py-2 text-white border border-white rounded-lg"
                  >
                    Change GIF
                  </button>
                </header>
                <main
                  className="flex justify-center p-8 bg-black rounded-b-lg"
                  style={{ backgroundColor: userEntry.image.color }}
                >
                  <img src={userEntry.image.original_url} alt="User GIF image" />
                </main>
              </motion.div>
            </DialogContent>
          </DialogOverlay>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Lobby;
