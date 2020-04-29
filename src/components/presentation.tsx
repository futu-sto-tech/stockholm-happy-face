import { Entry, Session } from '../pages/sessions/[id]';
import {
  MdArrowBack,
  MdArrowForward,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import React, { useCallback, useMemo } from 'react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMutation } from 'graphql-hooks';

const UPDATE_SESSION_MUTATION = /* GraphQL */ `
  mutation UpdateSession($sessionId: Int!, $entryId: Int, $time: timestamptz) {
    update_session(
      where: { id: { _eq: $sessionId } }
      _set: { entry_id: $entryId, changed_entry_at: $time }
    ) {
      returning {
        id
      }
    }
  }
`;

interface UpdateSessionData {
  update_session: {
    returning: Array<{ id: number }>;
  };
}

interface UpdateSessionVariables {
  sessionId: number;
  entryId?: number;
  time?: string;
}

const Presentation: React.FC<{ session: Session; entry: Entry }> = ({ session, entry }) => {
  const [updateSession] = useMutation<UpdateSessionData, UpdateSessionVariables>(
    UPDATE_SESSION_MUTATION,
  );

  const entryIds = useMemo(() => session.team.entries.map<number>((item) => item.id), [session]);
  const handleNext = useCallback(async () => {
    const entryIndex = entryIds.indexOf(entry.id);

    if (entryIndex + 1 === entryIds.length) {
      await updateSession({ variables: { sessionId: session.id, entryId: undefined } });
    } else if (entryIndex + 1 < entryIds.length) {
      await updateSession({
        variables: {
          sessionId: session.id,
          entryId: entryIds[entryIndex + 1],
          time: new Date().toISOString(),
        },
      });
    }
  }, [updateSession, entryIds, session, entry.id]);

  const handlePrev = useCallback(async () => {
    const entryIndex = entryIds.indexOf(entry.id);

    if (entryIndex > 0) {
      await updateSession({
        variables: {
          sessionId: session.id,
          entryId: entryIds[entryIndex - 1],
          time: new Date().toISOString(),
        },
      });
    } else if (entryIndex === 0) {
      await updateSession({ variables: { sessionId: session.id, entryId: undefined } });
    }
  }, [updateSession, entryIds, session, entry.id]);

  const timeLeft = useMemo(() => {
    const changedAt = new Date(session.changed_entry_at);
    const secondsAgo = (new Date().getTime() - changedAt.getTime()) / 1000;
    return Math.max(60 - secondsAgo, 0);
  }, [session]);

  const percentagePassed = useMemo(() => 100 * (1 - timeLeft / 60), [timeLeft]);

  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <header className="flex p-4 bg-white">
        <Link href="/profile">
          <a className="flex items-center flat-button space-x-1">
            <MdArrowBack />
            <p>Leave</p>
          </a>
        </Link>
      </header>
      <motion.div
        animate={{ width: [`${percentagePassed}%`, '100%'] }}
        transition={{ duration: timeLeft }}
        className="h-2 bg-blue-500 opacity-50"
      />
      <main className="flex flex-col items-center flex-1 p-4">
        <div className="flex flex-col justify-center flex-1 space-y-2">
          <nav className="flex justify-end space-x-1">
            <button
              className="px-2 py-1 text-gray-400 bg-black rounded-l-lg rounded-r active:text-white"
              onClick={handlePrev}
            >
              <MdKeyboardArrowLeft size="28" />
            </button>
            <button
              className="px-2 text-gray-400 bg-black rounded-l rounded-r-lg active:text-white"
              onClick={handleNext}
            >
              <MdKeyboardArrowRight size="28" />
            </button>
          </nav>
          <div className="overflow-hidden rounded shadow-xl">
            <header className="flex items-center p-2 bg-black space-x-4">
              <img
                className="w-12 h-auto rounded-full"
                src={entry.user.picture}
                alt={entry.user.name}
              />
              <div>
                <p className="leading-none text-white">{entry.user.name}</p>
                <p className="text-sm text-gray-300">Posted this week in {session.team.name}</p>
              </div>
            </header>
            <img className="w-full" src={entry.image.original_url} alt="GIF" />
          </div>
        </div>
      </main>
      <footer className="flex p-4 bg-white space-x-4">
        {session.users.map((item) => (
          <div key={item.user.id} className="">
            <img
              className="w-16 h-auto border border-gray-700 rounded-full"
              src={item.user.picture}
              alt={item.user.name}
            />
          </div>
        ))}
      </footer>
    </div>
  );
};

export default Presentation;
