import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import createAuth0Client from '@auth0/auth0-spa-js';

interface AuthUser {
  sub: string;
  email: string;
  name: string;
}

interface AuthContextInterface {
  loading: boolean;
  authenticated: boolean;
  user?: AuthUser;
  login: () => Promise<void>;
  logout: () => void;
  getIdTokenClaims?: () => Promise<IdToken>;
}

export const AuthContext = createContext<AuthContextInterface>({
  loading: true,
  authenticated: false,
  login: async () => {
    console.log('login');
  },
  logout: () => {
    console.log('logout');
  },
});

export const useAuth0 = (): AuthContextInterface => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const client = useRef<Auth0Client>();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [user, setUser] = useState<AuthUser>();

  const handleRedirectCallback = useCallback(async () => {
    setLoading(true);

    await client.current!.handleRedirectCallback();
    const auth0User = await client.current!.getUser();

    setLoading(false);
    setAuthenticated(true);
    setUser(auth0User);
  }, []);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const auth0Client = await createAuth0Client({
          domain: process.env.AUTH0_DOMAIN as string,
          // eslint-disable-next-line @typescript-eslint/camelcase
          client_id: process.env.AUTH0_CLIENT_ID as string,
          // eslint-disable-next-line @typescript-eslint/camelcase
          redirect_uri: window.location.origin,
        });

        client.current = auth0Client;

        if (window.location.search.includes('code=')) {
          return await handleRedirectCallback();
        }

        const isAuthenticated = await auth0Client.isAuthenticated();
        const auth0User = isAuthenticated ? await auth0Client.getUser() : undefined;

        setLoading(false);
        setAuthenticated(isAuthenticated);
        setUser(auth0User);
      } catch (error) {
        console.warn(error);
      }
    })();
  }, [handleRedirectCallback]);

  const getIdTokenClaims = useCallback(
    async (): Promise<IdToken> => await client.current!.getIdTokenClaims(),
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        loading,
        authenticated,
        user,
        login: async (): Promise<void> => client.current?.loginWithRedirect(),
        logout: (): void => client.current?.logout({ returnTo: window.location.origin }),
        getIdTokenClaims: client.current ? getIdTokenClaims : undefined,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
