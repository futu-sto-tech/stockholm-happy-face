import { Entry, Lobby } from 'types';
import React, { useMemo } from 'react';

import GifPost from 'components/gif-post';
import Header from 'components/header';
import Link from 'next/link';
import PostGrid from 'components/post-grid';
import { getCurrentWeek } from 'lib/utils';
import usePresentRandomEntry from 'graphql/mutations/present-random-entry';
import useTeamEntriesQuery from 'graphql/queries/team-entries';

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
  const presentRandomEntry = usePresentRandomEntry(user.team.id);

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

  return (
    <div>
      <Header />
      <main>
        <section className="grid max-w-4xl grid-cols-1 gap-4 px-4 py-16 mx-auto md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">Waiting for Smileys to start</h1>
              <p className="text-base font-bold">{user.team.entries.length} posted GIFs so far</p>
            </div>

            {user.role === 'HOST' && (
              <button
                onClick={presentRandomEntry}
                className="flex items-center h-12 px-6 text-lg font-bold text-white bg-black rounded-lg hover:bg-opacity-75"
              >
                Start Smileys
              </button>
            )}

            <Link href="/entries/new">
              <a className="inline-flex items-center h-12 px-6 text-lg font-bold text-white bg-black rounded-lg hover:bg-opacity-75">
                {currentUserEntry ? 'Pick new GIF' : 'Pick GIF'}
              </a>
            </Link>
          </div>

          {currentUserEntry ? (
            <GifPost
              user={{ ...currentUserEntry.user, image: currentUserEntry.user.picture }}
              image={{ url: currentUserEntry.image.original_url }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-64 border-2 border-black border-dashed rounded-lg">
              <p className="text-base">You haven't added a post for this week yet</p>
            </div>
          )}
        </section>

        <div
          style={{
            backgroundImage: `url('/images/wobble-green.svg')`,
            height: 86,
            backgroundSize: '160px',
            backgroundRepeat: 'repeat-x',
            marginTop: 240,
          }}
        />
        <div className="bg-green-400">
          <div className="relative max-w-4xl px-4 mx-auto" style={{ top: -320 }}>
            {lastWeekEntries && lastWeekEntries.length !== 0 && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Last week</h2>
                  <p className="text-base font-bold">Stockholm</p>
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
