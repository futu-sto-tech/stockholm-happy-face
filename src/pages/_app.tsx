import '../styles/index.css';

import { AuthProvider, useAuth0 } from '../context/auth';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createGraphqlClient, gqlAxios } from '../graphql/client';

import { ClientContext } from 'graphql-hooks';
import NextApp from 'next/app';

const AuthClientConnection: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const { getIdTokenClaims, loading } = useAuth0();

  useEffect(() => {
    if (getIdTokenClaims) {
      console.info('setup interceptor');
      const interceptorId = gqlAxios.interceptors.request.use(async function (config) {
        console.info('interceptor called');
        const idToken = await getIdTokenClaims();
        config.headers['Authorization'] = `Bearer ${idToken.__raw}`;
        return config;
      });

      setReady(true);

      return (): void => gqlAxios.interceptors.request.eject(interceptorId);
    }
  }, [getIdTokenClaims]);

  useEffect(() => {
    if (loading === false && getIdTokenClaims === undefined) setReady(true);
  }, [loading, getIdTokenClaims]);

  const getHeaders = useCallback(async () => {
    const idToken = await getIdTokenClaims?.();
    return {
      headers: {
        Authorization: `Bearer ${idToken?.__raw}`,
      },
    };
  }, [getIdTokenClaims]);

  const graphqlClient = useMemo(() => createGraphqlClient(getHeaders), [getHeaders]);

  return ready ? (
    <ClientContext.Provider value={graphqlClient}>{children}</ClientContext.Provider>
  ) : null;
};

class MyApp extends NextApp {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <AuthProvider>
        <AuthClientConnection>
          <Component {...pageProps} />
        </AuthClientConnection>
      </AuthProvider>
    );
  }
}

export default MyApp;
