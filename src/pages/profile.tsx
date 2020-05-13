import { AnimatePresence, motion } from 'framer-motion';
import { MdDelete, MdMoreHoriz } from 'react-icons/md';
import React, { useCallback, useMemo, useState } from 'react';
import { formatDistanceToNow, parseJSON } from 'date-fns';
import useTeamSubscription, { TeamSubscriptionData } from '../graphql/subscriptions/team';
import useUserEntriesQuery, { Entry, EntryUser } from '../graphql/queries/user-entries';

import Layout from '../components/layout';
import Link from 'next/link';
import buttonStyles from '../styles/button.module.css';
import { getCurrentWeek } from '../lib/utils';
import useDeleteEntryMutation from '../graphql/mutations/delete-entry-mutation';
import useUpdateTeamActiveMutation from '../graphql/mutations/update-team-active';
import { useUserId } from '../hooks';

const EntryItem: React.FC<{ entry: Entry; onDelete: () => Promise<void> }> = ({
  entry,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const fromNow = formatDistanceToNow(parseJSON(entry.created_at), { addSuffix: true });

  return (
    <motion.div positionTransition exit={{ opacity: 0, height: 0 }}>
      <header className="flex items-center justify-between h-16 px-3 bg-black rounded-t-lg">
        <div className="flex items-center space-x-3">
          <img className="h-10 rounded-full" src={entry.user.picture} alt={entry.user.name} />
          <div className="space-y-1">
            <p className="text-base font-bold leading-none text-gray-100">{entry.user.name}</p>
            <p className="text-sm leading-none text-white">
              Posted {fromNow} in {entry.team.name}
            </p>
          </div>
        </div>
        <div className="relative">
          <button className="block" onClick={(): void => setShowMenu((isOpen) => !isOpen)}>
            <MdMoreHoriz className="text-gray-400" size="24" />
          </button>

          {showMenu && (
            <>
              <button
                className="fixed top-0 bottom-0 left-0 right-0 block w-full h-full bg-transparent"
                onClick={(): void => setShowMenu(false)}
              />
              <motion.div
                className="absolute right-0 w-48 py-1 bg-white rounded-lg shadow-xl"
                initial={{ opacity: 0, scale: 0.4, translateX: 32, translateY: -16 }}
                animate={{ opacity: 1, scale: 1, translateX: 0, translateY: 0 }}
                transition={{ duration: 0.1 }}
              >
                <button
                  className="flex w-full px-4 py-2 space-x-2 transition-colors duration-150 hover:bg-black hover:text-white"
                  onClick={onDelete}
                >
                  <MdDelete size="24" />
                  <p>Delete</p>
                </button>
              </motion.div>
            </>
          )}
        </div>
      </header>
      <img src={entry.image.original_url} className="w-full h-auto rounded-b-lg" loading="lazy" />
    </motion.div>
  );
};

const ActiveNotification: React.FC<{ team: { id: number; name: string } }> = ({ team }) => (
  <div className="flex items-center justify-between p-6 bg-yellow-400 rounded-lg shadow-stereoscopic">
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-4 h-4 bg-black rounded-full" />
        <motion.div
          animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
          transition={{ loop: Infinity, duration: 1.5 }}
          className="absolute top-0 left-0 w-4 h-4 border-2 border-black rounded-full"
        />
      </div>
      <div className="space-y-2">
        <p className="text-xl font-bold leading-none text-black">{team.name} Smileys is live</p>
        <p className="text-base leading-none text-black">Session began 2 min ago</p>
      </div>
    </div>
    <Link href="/teams/[id]" as={`/teams/${team.id}`}>
      <a className={buttonStyles.primaryWhite}>Join</a>
    </Link>
  </div>
);

const InactiveNotification: React.FC<{
  team: { name: string };
  onClickActivate: () => void;
  user: EntryUser;
}> = ({ team, onClickActivate, user }) => (
  <div className="flex items-center justify-between px-6 py-4 border border-gray-900 rounded-lg">
    <div className="flex items-center space-x-2">
      <span className="w-4 h-4 border border-black rounded-full"></span>
      <p className="text-lg font-bold ">{team.name} Smileys is offline</p>
    </div>
    {user.role === 'HOST' ? (
      <button className={buttonStyles.secondary} onClick={onClickActivate}>
        Start
      </button>
    ) : (
      <button disabled className={buttonStyles.secondary}>
        Join
      </button>
    )}
  </div>
);

const Notification: React.FC<{ data: TeamSubscriptionData; user: EntryUser }> = ({
  data,
  user,
}) => {
  const [updateTeamActive] = useUpdateTeamActiveMutation();
  const handleClickActivate = async (): Promise<void> => {
    await updateTeamActive({ variables: { id: data.team_by_pk.id, active: true } });
  };

  return data.team_by_pk.active ? (
    <ActiveNotification team={data.team_by_pk} />
  ) : (
    <InactiveNotification
      team={data.team_by_pk}
      onClickActivate={handleClickActivate}
      user={user}
    />
  );
};

const ThisWeekGif: React.FC<{ peopleCount?: number }> = ({ peopleCount }) => {
  let sentence: string;
  if (peopleCount === 0) {
    sentence = `You can be the first to post a GIF!`;
  } else if (peopleCount === 1) {
    sentence = `One person has posted their GIF 🎉`;
  } else {
    sentence = `${peopleCount} people have posted their GIF 🎉`;
  }

  return (
    <div>
      <p className="text-2xl font-bold text-black">Your GIF this week</p>
      <p className="text-base leading-none text-gray-700">{sentence}</p>
    </div>
  );
};

const TeamSection: React.FC<{ user: EntryUser }> = ({ user }) => {
  const data = useTeamSubscription(user.team.id);

  return data ? (
    <div className="space-y-10">
      <Notification data={data} user={user} />
      <ThisWeekGif peopleCount={data?.team_by_pk.entries_aggregate.aggregate.count} />
    </div>
  ) : null;
};

export const EntryFeed: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, refetch } = useUserEntriesQuery(userId);

  const [currentYear, currentWeek] = useMemo(() => getCurrentWeek(), []);
  const currentEntry = data?.user_by_pk?.entries.find(
    (item) => item.year === currentYear && item.week === currentWeek,
  );

  const [deleteEntry] = useDeleteEntryMutation();
  const handleRemoveItem = useCallback(
    async (id: number) => {
      await deleteEntry({ variables: { id } });
      await refetch();
    },
    [deleteEntry, refetch],
  );

  return (
    <div>
      <div className="max-w-xl px-4 py-16 mx-auto">
        {data?.user_by_pk && <TeamSection user={data.user_by_pk} />}
        <div className="h-5" />
        {currentEntry ? (
          <EntryItem
            entry={currentEntry}
            onDelete={(): Promise<void> => handleRemoveItem(currentEntry.id)}
          />
        ) : (
          <div className="bg-white">
            <header className="flex items-center h-16 px-3 bg-black rounded-t-lg">
              <div className="flex items-center space-x-3">
                <img
                  className="h-10 rounded-full"
                  src={data?.user_by_pk?.picture}
                  alt={data?.user_by_pk?.name}
                />
                <div>
                  <p className="text-base font-bold leading-none text-white">
                    {data?.user_by_pk?.name}
                  </p>
                  <p className="text-sm text-white">This week</p>
                </div>
              </div>
            </header>
            <div className="flex flex-col items-center justify-center h-64 border-b-2 border-l-2 border-r-2 border-black border-dashed rounded-b-lg">
              <p className="text-sm text-center text-black">No GIF for this week yet</p>
              <div className="h-2" />
              <Link href="/entries/new">
                <a className={buttonStyles.primary}>Pick GIF</a>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          backgroundImage: `url('/images/wobble-green.svg')`,
          height: 141,
          backgroundPosition: 'center',
        }}
      />
      <div className="min-h-screen py-16 bg-green-400">
        <div className="max-w-xl px-4 mx-auto">
          <p className="text-xl font-bold text-black">Previous GIFs</p>
          <div className="h-2" />
          <div className="space-y-4">
            <AnimatePresence>
              {data?.user_by_pk?.entries
                .filter((item) => item.id !== currentEntry?.id)
                .map((item) => (
                  <EntryItem
                    key={item.id}
                    entry={item}
                    onDelete={(): Promise<void> => handleRemoveItem(item.id)}
                  />
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const userId = useUserId();

  return (
    <Layout>
      <EntryFeed userId={userId} />
    </Layout>
  );
};

export default ProfilePage;
