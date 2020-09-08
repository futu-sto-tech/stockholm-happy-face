import { ButtonSecondary, buttonStyles } from 'components/button';
import React, { useMemo } from 'react';

import Link from 'next/link';
import { Lobby } from 'types';
import useUpdateTeamStatus from './hooks/use-update-team-status';

interface Props {
  user: Lobby;
}

const SessionBox: React.FC<Props> = ({ user }) => {
  const startSession = useUpdateTeamStatus(user.team.id, 'STARTED');

  const currentUserEntry = useMemo(
    () => user.team.entries.find((item) => item.user.id === user.id),
    [user.team.entries, user.id],
  );

  if (user.team.status === 'ENDED') {
    return (
      <div className="p-12 bg-white border-2 border-black rounded-lg stark-shadow">
        <p className="font-bold text-center">Session ended</p>
      </div>
    );
  }

  if (currentUserEntry) {
    return (
      <div className="p-12 bg-white border-2 border-black rounded-lg stark-shadow">
        <p className="font-bold text-center">Session ended</p>
      </div>
    );
  }

  return (
    <div className="p-12 bg-white border-2 border-black rounded-lg stark-shadow">
      <div className="flex flex-col items-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-center">Smileys is about to start</h1>
          <p className="font-bold text-center">0 posted GIFs so far</p>
          <p className="text-center">You haven&apos;t added a post for this week yet</p>
        </div>
        <div className="space-x-4">
          {user.role === 'HOST' && (
            <ButtonSecondary onClick={startSession}>Start Smileys</ButtonSecondary>
          )}
          <Link href="/entries/new">
            <a className={buttonStyles.primary}>Pick GIF</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SessionBox;
