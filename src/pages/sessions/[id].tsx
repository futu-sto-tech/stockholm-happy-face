import { AnimatePresence, motion } from 'framer-motion';
import { MdClose, MdNavigateBefore, MdNavigateNext, MdPlayArrow } from 'react-icons/md';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Result, useMutation, useSubscription } from 'graphql-hooks';
import Router, { useRouter } from 'next/router';
import { getEndOfWeek, getStartOfWeek } from '../../lib/utils';

import Button from '../../components/button';
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
      {percentagePassed && (
        <motion.div
          animate={{ width: [`${percentagePassed}%`, '100%'] }}
          transition={{ duration: timeLeft }}
          className="absolute top-0 left-0 h-2 bg-blue-500 opacity-50"
        />
      )}
      <div className="absolute top-0 left-0 p-4">
        <Button onClick={handleClickClose}>
          <MdClose size="24" />
        </Button>
      </div>
      <div
        className={`flex flex-col h-screen ${
          session?.entry && 'bg-gray-900'
        } transition-colors duration-500`}
      >
        <main className="flex items-center justify-center flex-1">
          {session?.entry ? (
            <div className="max-w-4xl space-y-4">
              <header className="flex items-center justify-between">
                <Button onClick={handlePrev}>
                  <MdNavigateBefore size="24" />
                </Button>
                <p className="text-lg font-semibold text-center text-gray-400">
                  {session.entry.user.name}
                </p>
                <Button onClick={handleNext}>
                  <MdNavigateNext size="24" />
                </Button>
              </header>
              <main className="relative flex justify-center flex-1 overflow-hidden">
                <AnimatePresence exitBeforeEnter>
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
                  />
                </AnimatePresence>
              </main>
            </div>
          ) : (
            <Button onClick={handleNext}>
              <MdPlayArrow size="24" />
            </Button>
          )}
        </main>
        <footer className="flex p-4 bg-gray-800 shadow-2xl space-x-2">
          {session?.users.map((item) => (
            <motion.button
              onClick={(): Promise<void> => handleClickUser(item.user.id)}
              key={item.user.id}
              className="flex items-center justify-center"
              animate={{
                scale: [0.5, 1, 1.3, 1, 1],
                rotate: [0, 0, -15, -15, 0],
              }}
              positionTransition
            >
              <div className="space-y-2">
                <img className="w-20 h-auto mx-auto rounded-full" src={item.user.picture} />
                <p className="text-center text-gray-400">{item.user.name}</p>
              </div>
            </motion.button>
          ))}
        </footer>
      </div>
    </div>
  );
};

export default SessionPage;
