import { AnimatePresence, motion } from 'framer-motion';
import { MdClose, MdNavigateBefore, MdNavigateNext, MdPlayArrow } from 'react-icons/md';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Result, useMutation, useSubscription } from 'graphql-hooks';
import Router, { useRouter } from 'next/router';
import { getEndOfWeek, getStartOfWeek } from '../../lib/utils';

import { useAuth0 } from '../../context/auth';

const SESSION_SUBSCRIPTION = /* GraphQL */ `
  subscription Session($sessionId: Int!, $before: timestamptz!, $after: timestamptz!) {
    session_by_pk(id: $sessionId) {
      is_active
      team {
        id
        name
        entries(where: { created_at: { _gte: $after, _lte: $before } }) {
          id
          user_id
        }
      }
      user {
        id
        name
      }
      users(order_by: { created_at: desc }) {
        user {
          id
          name
          picture
        }
      }
      changed_entry_at
      entry {
        id
        image {
          original_url
        }
        user {
          id
          name
        }
      }
    }
  }
`;

interface Session {
  is_active: boolean;
  team: {
    id: number;
    name: string;
    entries: Array<{ id: number; user_id: string }>;
  };
  user: {
    id: string;
    name: string;
  };
  users: Array<{ user: { id: string; name: string; picture?: string } }>;
  changed_entry_at: string;
  entry?: {
    id: number;
    image: {
      original_url: string;
    };
    user: {
      id: string;
      name: string;
    };
  };
}

interface SessionData {
  session_by_pk: Session;
}

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

const INSERT_SESSION_USER_MUTATION = /* GraphQL */ `
  mutation InsertSessionUser($sessionId: Int!, $userId: String!) {
    insert_session_user(objects: { session_id: $sessionId, user_id: $userId }) {
      returning {
        user_id
      }
    }
  }
`;

interface InsertSessionUserVariables {
  sessionId: number;
  userId: string;
}

const DELETE_SESSION_USER_MUTATION = /* GraphQL */ `
  mutation DeleteSessionUser($sessionId: Int!, $userId: String!) {
    delete_session_user(where: { session_id: { _eq: $sessionId }, user_id: { _eq: $userId } }) {
      affected_rows
    }
  }
`;

const Button: React.FC<{ onClick?: () => void; className?: string }> = ({
  className,
  ...props
}) => (
  <motion.button
    className={`inline-block p-3 text-gray-700 bg-gray-300 rounded-full hover:bg-gray-200 ${className}`}
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05 }}
    {...props}
  />
);

const SessionPage: React.FC = () => {
  const router = useRouter();
  const sessionId = parseInt(router.query.id as string);
  const [session, setSession] = useState<Session>();
  const { user } = useAuth0();

  const [updateSession] = useMutation<UpdateSessionData, UpdateSessionVariables>(
    UPDATE_SESSION_MUTATION,
  );

  const [insertSessionUser] = useMutation<unknown, InsertSessionUserVariables>(
    INSERT_SESSION_USER_MUTATION,
  );

  const [deleteSessionUser] = useMutation<unknown, InsertSessionUserVariables>(
    DELETE_SESSION_USER_MUTATION,
  );

  useEffect(() => {
    if (user?.sub && session) {
      if (session.users.find((item) => item.user.id === user.sub) === undefined) {
        insertSessionUser({ variables: { userId: user.sub, sessionId } });
      }
    }
  }, [insertSessionUser, user, sessionId, session]);

  useEffect(() => {
    async function handleDeleteSessionUser(url: string): Promise<void> {
      console.info('Changed route', url);
      if (user) {
        await deleteSessionUser({ variables: { userId: user.sub, sessionId } });
      }
    }

    Router.events.on('routeChangeStart', handleDeleteSessionUser);

    return (): void => Router.events.off('routeChangeStart', handleDeleteSessionUser);
  }, [user, deleteSessionUser, sessionId]);

  const handleClickClose = useCallback(async () => router.back(), [router]);

  const startOfWeek = useMemo(() => getStartOfWeek().toISOString(), []);
  const endOfWeek = useMemo(() => getEndOfWeek().toISOString(), []);
  useSubscription(
    {
      query: SESSION_SUBSCRIPTION,
      variables: { sessionId, before: endOfWeek, after: startOfWeek },
    },
    ({ error, data }: Result<SessionData>) => {
      if (error) {
        console.warn(error);
        return;
      }

      // all good, handle the gql result
      setSession(data?.session_by_pk);
    },
  );

  const entryIds = useMemo(() => session?.team.entries.map<number>((item) => item.id), [session]);

  const handleNext = useCallback(async () => {
    if (entryIds && session !== undefined) {
      if (session.entry === null) {
        await updateSession({
          variables: { sessionId, entryId: entryIds[0], time: new Date().toISOString() },
        });
      } else if (session.entry) {
        const entryIndex = entryIds.indexOf(session.entry.id);
        console.info('has entry', entryIndex, entryIds);

        if (entryIndex + 1 < entryIds.length) {
          await updateSession({
            variables: {
              sessionId,
              entryId: entryIds[entryIndex + 1],
              time: new Date().toISOString(),
            },
          });
        } else if (entryIndex + 1 === entryIds.length) {
          await updateSession({ variables: { sessionId, entryId: undefined } });
        }
      }
    }
  }, [updateSession, sessionId, entryIds, session]);

  const handlePrev = useCallback(async () => {
    if (entryIds && session?.entry) {
      const entryIndex = entryIds.indexOf(session.entry.id);
      console.info('Prev', entryIndex);

      if (entryIndex > 0) {
        await updateSession({
          variables: {
            sessionId,
            entryId: entryIds[entryIndex - 1],
            time: new Date().toISOString(),
          },
        });
      } else if (entryIndex === 0) {
        await updateSession({ variables: { sessionId, entryId: undefined } });
      }
    }
  }, [updateSession, sessionId, entryIds, session]);

  const handleClickUser = useCallback(
    async (userId: string) => {
      if (session) {
        const entryId = session.team.entries.find((item) => item.user_id === userId)?.id;
        if (entryId) {
          updateSession({ variables: { sessionId, entryId, time: new Date().toISOString() } });
        }
      }
    },
    [session, updateSession, sessionId],
  );

  const timeLeft = useMemo(() => {
    if (session?.entry && session?.changed_entry_at) {
      const changedAt = new Date(session?.changed_entry_at);
      const secondsAgo = (new Date().getTime() - changedAt.getTime()) / 1000;
      return Math.max(60 - secondsAgo, 0);
    }
  }, [session]);

  const percentagePassed = useMemo(() => {
    if (timeLeft !== undefined) {
      return 100 * (1 - timeLeft / 60);
    }
  }, [timeLeft]);

  return (
    <div>
      <div className="flex flex-col h-screen px-4">
        <div className="sticky top-0 pt-4">
          <header className="relative overflow-hidden bg-gray-400 rounded-full">
            {percentagePassed && (
              <motion.div
                animate={{ width: [`${percentagePassed}%`, '100%'] }}
                transition={{ duration: timeLeft }}
                className="absolute top-0 bottom-0 left-0 z-10 bg-red-500 opacity-25"
              />
            )}
            <div className="relative z-20 flex flex-row items-center justify-between p-2">
              <Button onClick={handleClickClose}>
                <MdClose size="24" />
              </Button>
              <p className="flex-1 text-xl font-semibold text-center text-gray-700">
                {session?.entry ? session.entry.user.name : 'Start Smileys!'}
              </p>
              {session?.entry ? (
                <div className="flex flex-row">
                  <Button onClick={handlePrev} className="rounded-l-full rounded-r-none">
                    <MdNavigateBefore size="24" />
                  </Button>
                  <Button onClick={handleNext} className="rounded-l-none rounded-r-full">
                    <MdNavigateNext size="24" />
                  </Button>
                </div>
              ) : (
                <Button onClick={handleNext}>
                  <MdPlayArrow size="24" />
                </Button>
              )}
            </div>
          </header>
        </div>
        <main className="flex-1">
          {session?.is_active === false ? (
            <div>This session has ended</div>
          ) : session?.entry ? (
            <div className="relative flex flex-row items-center justify-center h-full max-w-4xl mx-auto overflow-hidden">
              <AnimatePresence>
                <motion.img
                  key={session.entry.image.original_url}
                  src={session.entry.image.original_url}
                  initial={{ opacity: 0, x: 1000 }}
                  animate={{ zIndex: 1, x: 0, opacity: 1 }}
                  exit={{ zIndex: 0, x: -1000, opacity: 0 }}
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 200 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute"
                />
              </AnimatePresence>
            </div>
          ) : (
            <div className="grid h-full grid-cols-6 grid-rows-6 gap-2 py-4">
              {session?.users.map((item) => (
                <motion.div
                  key={item.user.id}
                  className="flex items-center justify-center overflow-hidden bg-gray-400 rounded-full"
                  animate={{
                    scale: [0.5, 1, 1.3, 1, 1],
                    rotate: [0, 0, -15, -15, 0],
                  }}
                  positionTransition
                >
                  {item.user.picture ? <img src={item.user.picture} /> : item.user.name}
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
      {session?.entry && (
        <div className="p-4 bg-gray-300">
          <div className="pb-3">
            <p className="text-lg font-semibold text-center">Team Stockholm</p>
          </div>
          <div className="grid gap-2">
            {session?.users.map((item) => (
              <button
                key={item.user.id}
                className="max-w-xs p-3 text-center bg-gray-400 rounded-full"
                onClick={(): Promise<void> => handleClickUser(item.user.id)}
              >
                {item.user.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionPage;
