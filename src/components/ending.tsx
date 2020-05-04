import React, { useCallback } from 'react';

import Link from 'next/link';
import LogoIcon from './logo-icon';
import { MdArrowBack } from 'react-icons/md';
import { Session } from '../graphql/subscriptions/session';
import useUpdateTeamActiveMutation from '../graphql/mutations/update-team-active';
import useUserQuery from '../graphql/queries/user';

const Ending: React.FC<{ session: Session; userId: string }> = ({ session, userId }) => {
  const userData = useUserQuery(userId);

  const [updateTeamActive] = useUpdateTeamActiveMutation();
  const handleClickRestart = useCallback(async () => {
    await updateTeamActive({ variables: { id: session.id, active: true } });
  }, [session, updateTeamActive]);

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 bottom-0 left-0 right-0 m-20 overflow-hidden pointer-events-none">
        <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none"></div>
      </div>
      <main className="flex flex-col items-center justify-center flex-1 space-y-10 bg-black">
        <div className="w-full max-w-xl py-24 bg-gray-100 rounded shadow-stereoscopic">
          <div className="flex flex-col items-center space-y-5">
            <LogoIcon />
            <div className="space-y-1">
              <p className="text-lg text-center">
                Team: <span className="font-semibold">{session?.name}</span>
              </p>
              <p className="text-sm text-center text-gray-600">That&apos;s it for this week!</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="p-4 bg-gray-100">
        <div className="flex items-center w-full max-w-6xl mx-auto">
          <div className="flex items-center flex-1">
            <Link href="/profile">
              <a className="flex items-center px-4 space-x-1 flat-button">
                <MdArrowBack size="20" />
                <p>Leave</p>
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-end flex-1">
            {userData.data?.user_by_pk.role === 'HOST' && (
              <button onClick={handleClickRestart} className="flat-button">
                Re-start session
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Ending;
