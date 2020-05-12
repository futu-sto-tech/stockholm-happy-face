import React, { useCallback } from 'react';

import Link from 'next/link';
import LogoIcon from './logo-icon';
import { MdArrowBack } from 'react-icons/md';
import { Session } from '../graphql/subscriptions/session';
import buttonStyles from '../styles/button.module.css';
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
      <main className="flex flex-col items-center justify-between flex-1 py-24 space-y-10 bg-green-400">
        <div className="flex flex-col items-center space-y-8">
          <LogoIcon />
          <div className="flex flex-col items-center px-16 py-8 space-y-5 bg-white rounded-lg shadow-lg">
            <div className="space-y-1">
              <p className="text-xl text-center">
                Team: <span className="font-bold">{session?.name}</span>
              </p>
            </div>
          </div>
          <p className="text-base text-center text-black">That&apos;s it for this week!</p>
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
          <div className="flex items-center justify-end flex-1">
            {userData.data?.user_by_pk.role === 'HOST' && (
              <button onClick={handleClickRestart} className={buttonStyles.secondary}>
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
