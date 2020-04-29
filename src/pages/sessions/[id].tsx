import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Result, useMutation, useSubscription } from 'graphql-hooks';
import Router, { useRouter } from 'next/router';
import { getEndOfWeek, getStartOfWeek } from '../../lib/utils';

import Layout from '../../components/layout';
import LogoIcon from '../../components/logo-icon';
import Presentation from '../../components/presentation';
import { motion } from 'framer-motion';
import { useAuth0 } from '../../context/auth';

const SESSION_SUBSCRIPTION = /* GraphQL */ `
  subscription Session($sessionId: Int!, $before: timestamptz!, $after: timestamptz!) {
    session_by_pk(id: $sessionId) {
      id
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
          picture
        }
      }
    }
  }
`;

export interface Entry {
  id: number;
  image: {
    original_url: string;
  };
  user: {
    id: string;
    name: string;
    picture: string;
  };
}

export interface Session {
  id: number;
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
  entry?: Entry;
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

  const handleClickStart = useCallback(async () => {
    if (session) {
      const entryId = session.team.entries[0].id;
      await updateSession({
        variables: { sessionId: session.id, entryId, time: new Date().toISOString() },
      });
    }
  }, [session, updateSession]);

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

  if (session?.entry !== null && session?.entry !== undefined) {
    return <Presentation session={session} entry={session.entry} />;
  }

  return (
    <Layout showNav={session?.entry ? false : true}>
      <div className={`flex flex-col h-screen`}>
        <main className="flex items-center flex-1 w-full max-w-4xl px-4 mx-auto">
          {session?.entry ? (
            <div></div>
          ) : (
            <div className="flex flex-col items-center mx-auto space-y-5">
              <LogoIcon />
              <h2 className="text-lg font-semibold">{session?.team.name}</h2>
              <button
                className="px-8 py-3 text-gray-700 transition-colors duration-150 bg-white border border-gray-400 rounded-sm hover:text-black hover:border-black"
                onClick={handleClickStart}
              >
                Start session
              </button>
            </div>
          )}
        </main>
        <footer className="flex justify-center h-40 space-x-2">
          {session?.users.map((item) => (
            <motion.button
              onClick={(): Promise<void> => handleClickUser(item.user.id)}
              key={item.user.id}
              className="flex items-center justify-center"
              positionTransition
            >
              <div className="space-y-1">
                <motion.img
                  key={item.user.id}
                  animate={{
                    scale: [0.5, 1, 1.3, 1, 1],
                    rotate: [0, 0, -15, -15, 0],
                  }}
                  positionTransition
                  className={`w-20 h-auto mx-auto rounded-full border-4 ${
                    item.user.id === session.entry?.user.id
                      ? 'border-blue-500 shadow-xl'
                      : 'border-transparent'
                  }`}
                  src={item.user.picture}
                />
                <p className={`text-center text-black`}>{item.user.name}</p>
              </div>
            </motion.button>
          ))}
        </footer>
      </div>
    </Layout>
  );
};

export default SessionPage;
