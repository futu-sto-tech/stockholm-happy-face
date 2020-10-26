import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';

import { FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import LogoIcon from 'components/logo-icon';
import useTeamSessionSubscription from 'graphql/subscriptions/team-session';
import useUpdateUserSessionMutation from 'graphql/mutations/update-user-session';
import useUpdateOnlineUserMutation from 'graphql/mutations/update-online-user';
import useOnlineUsers from 'graphql/subscriptions/online-users';
import { useUserId } from 'hooks';
import { hexToHSL } from 'lib/utils';
import { Picker, EmojiData } from 'emoji-mart';
import useInsertReactionMutation from 'graphql/mutations/insert-reaction';
import { useClickOutside } from 'hooks';
import styles from '../../styles/emojiPicker.module.css';
import emojiPicker from './emoji-picker';

interface Props {
  team: number;
}

const TeamSession: React.FC<Props> = ({ team }) => {
  const teamSession = useTeamSessionSubscription(team);
  const pickerRef = useRef<HTMLDivElement>(null)

  const entriesCount = useMemo(() => teamSession?.team_by_pk.entries.length, [
    teamSession?.team_by_pk.entries.length,
  ]);

  const presentedEntriesCount = useMemo(
    () => teamSession?.team_by_pk.entries.filter((item) => item.presented === true).length,
    [teamSession?.team_by_pk.entries.filter],
  );

  const presentedEntriesProgress = useMemo(
    () => (presentedEntriesCount && entriesCount ? presentedEntriesCount / entriesCount : 0),
    [presentedEntriesCount, entriesCount],
  );

  const handleClickOpenAdminPopup = (): void => {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=920`;
    window.open(`/sessions/${team}/controls`, 'test', params);
  };

  const userId = useUserId();
  const [updateUserSession] = useUpdateUserSessionMutation();
  const participants = useMemo(() => teamSession?.team_by_pk.participants.map((item) => item.id), [
    teamSession?.team_by_pk.participants.map,
  ]);

  useEffect(() => {
    if (participants && participants.indexOf(userId) === -1) {
      updateUserSession({ variables: { user: userId, team } });
    }
  }, [userId, participants, team, updateUserSession]);

  useEffect(() => {
    return (): void => {
      updateUserSession({ variables: { user: userId } });
    };
  }, [updateUserSession, userId]);

  const activeUsers = useOnlineUsers(team);
  const onlineUsers = activeUsers ? activeUsers.online_team_users : [];

  const [updateOnlineUser] = useUpdateOnlineUserMutation();
  useEffect(() => {
    const emitOnlineInterval = setInterval(
      async () => {
        await updateOnlineUser({
          variables: { user: userId },
        });
      },
      3000
    );
    return () => {
      clearInterval(emitOnlineInterval);
    }
  }, [updateOnlineUser, userId]);
  
  // Backgorund color
  const bgColor = teamSession?.team_by_pk.entry?.image.color ? teamSession?.team_by_pk.entry?.image.color : '#000000' ;
  
  // Make variants 1 and 2 for gradient use
  const colorVariant1 = bgColor ? hexToHSL(bgColor, 0, 40, 5) : null;
  const colorVariant2 = bgColor ? hexToHSL(bgColor, 100, 40, 5) : null;

  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [addReaction] = useInsertReactionMutation();

  const toggleEmojiPicker = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setshowEmojiPicker(!showEmojiPicker);
  }

  const handleAddReaction = (emoji: EmojiData): void => {
    if (teamSession?.team_by_pk.entry?.id && teamSession?.team_by_pk.entry?.user.id)
      addReaction({ variables: { reaction: emoji.native, entryId: teamSession?.team_by_pk.entry?.id, user: userId } })
    setshowEmojiPicker(false);
  };

  const handleAddStandardReaction = (reaction: string): void => {
    const entryId = teamSession?.team_by_pk.entry?.id;
    const user = userId;
    if (entryId && user) {
      addReaction({ variables: { reaction, entryId, user } });
    }
  }

  const onClickOutside = () => {
    setshowEmojiPicker(false);
  }

  useClickOutside(pickerRef, onClickOutside)

  const createReactionButton = (reaction: string, padding = "p-2") => (
    <button className={padding} onClick={() => handleAddStandardReaction(reaction)}>
      <span role="img" aria-label="button">{reaction}</span>
    </button>
  )

  return (
    <div
      className="grid h-screen bg-black grid-rows-12"
      style={{ 
        backgroundColor: bgColor, 
        backgroundImage: colorVariant1 && colorVariant2 ? `linear-gradient(45deg, ${colorVariant1}, ${colorVariant2})` : '' 
      }}
    >
      <header className="flex items-center justify-center row-span-1">
        <Link href="/">
          <a className="text-white">
            <LogoIcon width="120" />
          </a>
        </Link>
      </header>
      <main className="grid grid-cols-12 grid-rows-1 gap-4 px-12 row-span-10">
        <aside className="flex-col hidden col-span-3 overflow-auto bg-white rounded-lg shadow lg:flex bg-opacity-10">
          <header className="p-4 pt-6 space-y-6 border-b border-white border-opacity-10">
            <h2 className="text-xl leading-none text-center text-white">
              Team: <span className="font-bold">{teamSession?.team_by_pk.name}</span>
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-center text-white">
                {teamSession?.team_by_pk.entries.length} GIFs this time
              </p>
              <div className="w-full h-2 bg-white rounded-full bg-opacity-10">
                <div
                  className="h-full bg-white bg-opacity-25 rounded-full"
                  style={{ width: `${presentedEntriesProgress * 100}%` }}
                />
              </div>
            </div>

            {teamSession?.team_by_pk.entry ? (
              <div className="flex flex-col items-center flex-shrink-0 space-y-1">
                <img
                  src={teamSession?.team_by_pk.entry?.user.picture}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full shadow-sm"
                />
                <p className="text-lg text-white">{teamSession?.team_by_pk.entry?.user.name}</p>
              </div>
            ) : (
                <p className="font-bold text-center text-white">Starting soon...</p>
              )}
          </header>

          <ul className="flex-1 py-4 space-y-4 scrolling-touch">
            {teamSession && onlineUsers
              .filter((item) => item.id !== teamSession.team_by_pk.entry?.user.id)
              .map((item) => (
                <li key={item.id} className="inline-flex flex-col px-4">
                  <div className="relative">
                    <div className="overflow-hidden">
                      <img src={item.picture} alt={item.name} className="w-12 h-12 rounded-full" />
                      {teamSession?.team_by_pk.entry?.reactions.filter(r => r.user_id === item.id).map((reaction) => {
                        return (
                          <div key={reaction.id}>
                            <div className={`absolute bottom-0 left-0`}>
                              {reaction.content}
                            </div>
                            <div className={`${styles.reaction} absolute bottom-0 left-0`}>
                              {reaction.content}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <p className="text-base text-white">{item.name}</p>
                </li>
              ))}
            {/* Add spacing to end of list */}
            <li />
          </ul>

          <footer className="flex flex-col items-end p-2 border-t border-white border-opacity-10 relative">
            <button
              onClick={handleClickOpenAdminPopup}
              className="flex items-center justify-center w-full h-12 px-4 space-x-2 text-base text-white rounded-lg hover:bg-opacity-10 hover:bg-white"
            >
              <FiExternalLink size="20" />
              <p>Open admin controls</p>
            </button>
          </footer>
        </aside>

        <section className="col-span-12 space-y-6 lg:col-span-9 relative">
          <img
            className="object-contain w-auto w-full h-auto max-w-full max-h-full bg-white rounded-lg shadow bg-opacity-10"
            src={
              teamSession?.team_by_pk.entry?.image.original_url ||
              'https://media.giphy.com/media/brHaCdJqCXijm/giphy.gif'
            }
            alt="GIF"
          />
          <div className="flex flex-col items-center flex-shrink-0 space-y-1 lg:hidden">
            <img
              src={teamSession?.team_by_pk.entry?.user.picture}
              alt="Avatar"
              className="w-24 h-24 rounded-full shadow-sm"
            />
            <p className="text-lg text-white">{teamSession?.team_by_pk.entry?.user.name}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="absolute bottom-0 mb-10 flex items-center justify-center h-12 px-4 space-x-2 text-base bg-white text-white rounded-lg">
              {createReactionButton("😊", "pr-2")}
              {createReactionButton("😏")}
              {createReactionButton("🙃")}
              {createReactionButton("😔")}
              {createReactionButton("👍")}
              {createReactionButton("🤣")}
              <button
                type="button"
                aria-pressed="false"
                onClick={toggleEmojiPicker}
                className="pl-2"
              >
                <span role="img" aria-label="button">
                  {emojiPicker}
                </span>
              </button>
            </div>
            {showEmojiPicker && (
              <div ref={pickerRef} className="absolute items-center w-1/3 z-10 bottom-0 left-1/2">
                <Picker
                  theme="dark"
                  onSelect={handleAddReaction}
                  title="Pick your emoji"
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </div >
  );
};

export default TeamSession;
