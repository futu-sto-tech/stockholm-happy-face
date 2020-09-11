import { Entry, Session } from 'graphql/subscriptions/session';
import { OnlineUser } from 'graphql/subscriptions/online-users';
import React, { useCallback, useMemo } from 'react';

import Link from 'next/link';
import LogoIcon from './logo-icon';
import { MdArrowBack } from 'react-icons/md';
import { motion } from 'framer-motion';
import useUpdateTeamActiveMutation from 'graphql/mutations/update-team-active';
import useUpdateTeamEntry from 'graphql/mutations/update-team-entry';

const ActiveParticipant: React.FC<{ name: string }> = ({ name }) => (
  <div className="p-3 bg-white rounded">
    <p className="font-bold text-black">{name}</p>
  </div>
);

const SidePanel: React.FC<{ session: Session; entry: Entry }> = ({ session, entry }) => {
  const [updateTeamEntry] = useUpdateTeamEntry();

  const entryIds = useMemo(() => session.entries.map<number>((item) => item.id), [session]);
  const entryIndex = entryIds.indexOf(entry.id);
  const handleNext = useCallback(async () => {
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
  }, [updateTeamEntry, entryIds, session, entryIndex]);

  const handlePrev = useCallback(async () => {
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
  }, [updateTeamEntry, entryIds, session, entryIndex]);

  const handleClickShowUserEntry = useCallback(
    async (entryId: number) => {
      await updateTeamEntry({
        variables: { team: session.id, entry: entryId, time: new Date().toISOString() },
      });
    },
    [session, updateTeamEntry],
  );

  const [updateTeamActive] = useUpdateTeamActiveMutation();
  const handleClickEndSession = async (): Promise<void> => {
    await updateTeamActive({ variables: { id: session.id, active: false } });
  };

  return (
    <div className="flex flex-col h-full p-6 bg-black">
      <main className="flex-1 space-y-10">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Participants</h3>
          <div className="h-px bg-white bg-opacity-50" />
          <ul>
            {session.entries.map((item) => (
              <li key={item.id}>
                {item.id === session.entry?.id ? (
                  <div className="my-2">
                    <ActiveParticipant name={item.user.name} />
                  </div>
                ) : (
                    <div className="flex items-center justify-between p-3 pr-0 text-white transition-all duration-100 rounded hover:bg-white hover:bg-opacity-10 hover:pr-3 group">
                      <div className="flex items-center space-x-2">
                        {item.id === session.entry?.id && (
                          <span className="w-3 h-3 bg-white rounded-full" />
                        )}
                        <p>{item.user.name}</p>
                      </div>
                      {item.id !== session.entry?.id && (
                        <button
                          onClick={(): Promise<void> => handleClickShowUserEntry(item.id)}
                          className="font-bold transition-opacity duration-100 opacity-0 group-hover:opacity-100"
                        >
                          Show
                        </button>
                      )}
                    </div>
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
            className="flex-1 px-4 py-2 text-white border border-white rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={entryIndex + 1 === entryIds.length}
          >
            Next
          </button>
        </nav>
        <button className="w-full px-4 text-white" onClick={handleClickEndSession}>
          End session
        </button>
      </footer>
    </div>
  );
};

const Presentation: React.FC<{ session: Session; activeParticipants: OnlineUser[], entry: Entry }> = ({ session, activeParticipants, entry }) => {
  return (
    <div
      className="flex h-screen transition-colors duration-300 bg-black"
      style={{ backgroundColor: entry.image.color }}
    >
      <div className="flex flex-col flex-1 h-full">
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
        <main className="flex flex-col items-center justify-center flex-1 p-4 space-y-6">
          <img
            className="object-contain w-full max-h-full rounded-lg shadow-xl"
            src={entry.image.original_url}
            alt="GIF"
          />
        </main>
        <footer className="flex justify-center flex-shrink-0 p-4 space-x-4 bg-white bg-opacity-25">
          {activeParticipants.map((item) => (
            <div key={item.id} className="relative">
              {item.id === session.entry?.user.id && (
                <p className="absolute flex justify-center flex-shrink-0 w-full text-lg font-bold leading-none text-white transform -translate-y-12">
                  {entry.user.name}
                </p>
              )}
              <motion.img
                initial={{ scale: 1, translateY: 0 }}
                animate={{
                  scale: item.id === session.entry?.user.id ? 1.2 : 1,
                  translateY: item.id === session.entry?.user.id ? -16 : 0,
                }}
                className="w-16 h-auto rounded-full"
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
