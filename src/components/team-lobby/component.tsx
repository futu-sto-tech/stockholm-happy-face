import { ButtonSecondary, buttonStyles } from 'components/button';
import { Entry, Lobby } from 'types';
import React, { useMemo } from 'react';

import Confetti from 'react-confetti';
import GifPost from 'components/gif-post';
import Header from 'components/header';
import Link from 'next/link';
import PostGrid from 'components/post-grid';
import { getCurrentWeek } from 'lib/utils';
import { useElementSize } from './hooks';
import useTeamEntriesQuery from 'graphql/queries/team-entries';
import useUpdateTeamStatus from 'components/session-box/hooks/use-update-team-status';

const [CURRENT_YEAR, CURRENT_WEEK] = getCurrentWeek();

interface WeekGroup {
  year: number;
  week: number;
  entries: Entry[];
}

interface WeekGroupMap {
  [key: string]: WeekGroup;
}

interface Props {
  data: Lobby;
}

const TeamLobby: React.FC<Props> = ({ data: user }) => {
  const { data: entriesData } = useTeamEntriesQuery(user.team.id);

  const currentUserEntry = useMemo(
    () => user.team.entries.find((item) => item.user.id === user.id),
    [user.team.entries, user.id],
  );

  const lastWeekEntries = useMemo(
    () =>
      entriesData?.entry.filter(
        (item) => item.year === CURRENT_YEAR && item.week === CURRENT_WEEK - 1,
      ),
    [entriesData?.entry.filter],
  );

  const previousEntries = useMemo<WeekGroup[] | undefined>(() => {
    const weekGroupMap = entriesData?.entry
      .filter(
        (item) =>
          item.year !== CURRENT_YEAR ||
          (item.week !== CURRENT_WEEK && item.week !== CURRENT_WEEK - 1),
      )
      .reduce<WeekGroupMap>((prev, current) => {
        const key = `${current.year}-${current.week}`;
        if (!(key in prev)) {
          prev[key] = { year: current.year, week: current.week, entries: [] };
        }
        prev[key].entries.push(current);
        return prev;
      }, {});

    return weekGroupMap ? Object.values(weekGroupMap) : undefined;
  }, [entriesData?.entry.filter]);

  const elRef = React.useRef<HTMLDivElement | null>(null);
  const [width, height] = useElementSize(elRef);

  const startSession = useUpdateTeamStatus(user.team.id, 'STARTED');

  return (
    <div>
      <Header />
      <main>
        <section className="max-w-4xl px-4 mx-auto my-24">
          <div
            ref={elRef}
            className={`relative bg-white border-2 border-black rounded-lg stark-shadow ${
              currentUserEntry && 'grid grid-rows-2 md:grid-rows-1 md:grid-cols-2'
            }`}
          >
            {user.team.status === 'STARTED' && (
              <Confetti width={width} height={height} numberOfPieces={100} className="z-0" />
            )}
            <div className="relative z-10 flex flex-col items-center justify-center h-64 my-6 space-y-10">
              <div className="flex flex-col items-center space-y-2">
                <h1 className="text-2xl font-bold">
                  {user.team.status === 'STARTED'
                    ? 'Smileys is about to start'
                    : 'Smileys is not active'}
                </h1>
                <p className="font-bold">{user.team.entries.length} posted GIFs so far</p>
                {currentUserEntry === undefined && (
                  <p>You haven&apos;t added a post for this week yet</p>
                )}
              </div>

              <div className="flex justify-center space-x-6">
                {user.team.status === 'STARTED' ? (
                  <Link href="/sessions/[id]" as={`/sessions/${user.team.id}`}>
                    <a className={buttonStyles.secondary}>Join Smileys</a>
                  </Link>
                ) : (
                  user.role === 'HOST' && (
                    <ButtonSecondary onClick={startSession}>Start Smileys</ButtonSecondary>
                  )
                )}
                <Link href="/entries/new">
                  <a className="inline-flex items-center h-12 px-6 text-lg font-bold text-white bg-black rounded-lg hover:bg-opacity-75">
                    {currentUserEntry ? 'Pick new GIF' : 'Pick GIF'}
                  </a>
                </Link>
              </div>
            </div>
            {currentUserEntry && (
              <div className="relative z-10 flex items-center h-64 p-4 my-6">
                <img
                  src={currentUserEntry.image.original_url}
                  loading="lazy"
                  className="object-contain w-auto h-full mx-auto rounded-lg"
                />
              </div>
            )}
          </div>
        </section>

        <div
          style={{
            backgroundImage: `url('/images/wobble-green.svg')`,
            height: 86,
            backgroundSize: '160px',
            backgroundRepeat: 'repeat-x',
          }}
        />
        <div className="bg-green-400">
          <div className="relative max-w-4xl px-4 pt-6 mx-auto">
            {lastWeekEntries && lastWeekEntries.length !== 0 && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Last week</h2>
                  <p className="text-base font-bold">{user.team.name}</p>
                </div>

                <PostGrid entries={lastWeekEntries} />

                <div className="h-4" />
              </section>
            )}

            {previousEntries?.map((item) => (
              <section key={`${item.year}${item.week}`} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    Week {item.week} {CURRENT_YEAR !== item.year && `(${item.year})`}
                  </h2>
                </div>

                <PostGrid entries={item.entries} />

                <div className="h-4" />
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamLobby;
