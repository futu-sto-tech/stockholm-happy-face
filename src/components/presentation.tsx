import { Entry, Session } from '../subscriptions/session';
import React, { useCallback, useMemo } from 'react';

import Link from 'next/link';
import LogoIcon from './logo-icon';
import { MdArrowBack } from 'react-icons/md';
import { motion } from 'framer-motion';
import useUpdateTeamEntry from '../mutations/update-team-entry';

const SidePanel: React.FC<{ session: Session; entry: Entry }> = ({ session, entry }) => {
  const [updateTeamEntry] = useUpdateTeamEntry();

  const entryIds = useMemo(() => session.entries.map<number>((item) => item.id), [session]);
  const handleNext = useCallback(async () => {
    const entryIndex = entryIds.indexOf(entry.id);

    if (entryIndex + 1 === entryIds.length) {
      await updateTeamEntry({ variables: { team: session.id, entry: undefined } });
    } else if (entryIndex + 1 < entryIds.length) {
      await updateTeamEntry({
        variables: {
          team: session.id,
          entry: entryIds[entryIndex + 1],
          time: new Date().toISOString(),
        },
      });
    }
  }, [updateTeamEntry, entryIds, session, entry.id]);

  const handlePrev = useCallback(async () => {
    const entryIndex = entryIds.indexOf(entry.id);

    if (entryIndex > 0) {
      await updateTeamEntry({
        variables: {
          team: session.id,
          entry: entryIds[entryIndex - 1],
          time: new Date().toISOString(),
        },
      });
    } else if (entryIndex === 0) {
      await updateTeamEntry({ variables: { team: session.id, entry: undefined } });
    }
  }, [updateTeamEntry, entryIds, session, entry.id]);

  const handleClickShowUser = useCallback(
    async (userId: string) => {
      const entryId = session.entries.find((item) => item.user_id === userId)?.id;
      console.log(userId, session.entries, entryId);

      if (entryId) {
        await updateTeamEntry({
          variables: { team: session.id, entry: entryId, time: new Date().toISOString() },
        });
      }
    },
    [session, updateTeamEntry],
  );

  return (
    <div className="flex flex-col h-full p-6 bg-black">
      <main className="flex-1 space-y-10">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">Participants</h3>
          <div className="h-px bg-gray-600" />
          <ul>
            {session.participants.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-3 text-white transition-all duration-100 rounded hover:bg-white hover:bg-opacity-10 hover:px-3 group"
              >
                <div className="flex items-center space-x-2">
                  {item.id === session.entry?.user.id && (
                    <span className="w-3 h-3 bg-blue-600 rounded-full" />
                  )}
                  <p>{item.name}</p>
                </div>
                {item.id !== session.entry?.user.id && (
                  <button
                    onClick={(): Promise<void> => handleClickShowUser(item.id)}
                    className="font-semibold transition-opacity duration-100 opacity-0 group-hover:opacity-100"
                  >
                    Show
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="space-y-5">
        <nav className="flex space-x-5">
          <button
            className="flex-1 px-4 py-2 text-white border border-white rounded"
            onClick={handlePrev}
          >
            Previous
          </button>
          <button
            className="flex-1 px-4 py-2 text-white border border-white rounded"
            onClick={handleNext}
          >
            Next
          </button>
        </nav>
        <button className="w-full px-4 py-2 text-white border border-white rounded">
          End session
        </button>
      </footer>
    </div>
  );
};

const Presentation: React.FC<{ session: Session; entry: Entry }> = ({ session, entry }) => {
  const timeLeft = useMemo(() => {
    const changedAt = new Date(session.changed_entry_at);
    const secondsAgo = (new Date().getTime() - changedAt.getTime()) / 1000;
    return Math.max(60 - secondsAgo, 0);
  }, [session]);

  const percentagePassed = useMemo(() => 100 * (1 - timeLeft / 60), [timeLeft]);

  return (
    <div
      className="flex h-screen transition-colors duration-300 bg-gray-800"
      style={{ backgroundColor: entry.image.color }}
    >
      <div className="flex flex-col flex-1 h-full">
        <motion.div
          animate={{ width: [`${percentagePassed}%`, '100%'] }}
          transition={{ duration: timeLeft }}
          className="h-2 bg-white bg-opacity-25"
        />
        <header className="flex items-center justify-between w-full max-w-6xl p-4 mx-auto">
          <Link href="/profile">
            <a className="flex items-center justify-center px-3 py-2 space-x-1 text-white border border-white rounded hover:bg-white hover:bg-opacity-10">
              <MdArrowBack size="20" />
              <p>Leave</p>
            </a>
          </Link>

          <div className="flex justify-center flex-1">
            <LogoIcon color="white" size="120" />
          </div>

          <div className="w-24" />
        </header>
        <main className="flex flex-col items-center flex-1 p-4">
          <div className="flex flex-col justify-center flex-1 space-y-2">
            <div className="overflow-hidden rounded shadow-xl">
              <header className="flex items-center p-2 space-x-4 bg-black">
                <img
                  className="w-12 h-auto rounded-full"
                  src={entry.user.picture}
                  alt={entry.user.name}
                />
                <div>
                  <p className="leading-none text-white">{entry.user.name}</p>
                  <p className="text-sm text-gray-300">Posted this week in {session.name}</p>
                </div>
              </header>
              <img className="w-full" src={entry.image.original_url} alt="GIF" />
            </div>
          </div>
        </main>
        <footer className="flex justify-center p-4 space-x-4 bg-gray-100">
          {session.participants.map((item) => (
            <div key={item.id} className="">
              <img
                className="w-16 h-auto border border-gray-700 rounded-full"
                src={item.picture}
                alt={item.name}
              />
            </div>
          ))}
        </footer>
      </div>

      <div className="w-full h-full max-w-xs">
        <SidePanel session={session} entry={entry} />
      </div>
    </div>
  );
};

export default Presentation;
