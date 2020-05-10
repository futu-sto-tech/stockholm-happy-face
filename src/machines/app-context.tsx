import { Interpreter, State } from 'xstate';
import React, { createContext, useRef } from 'react';
import appMachine, {
  AppMachineAction,
  AppMachineContextSchema,
  AppMachineEvent,
  AppMachineService,
  AppMachineStateSchema,
  AuthData,
} from './app-machine';

import { Auth0Client } from '@auth0/auth0-spa-js';
import { useMachine } from '@xstate/react';

type AppProverProps = { children: React.ReactNode };

export type AppMachine = [
  State<AppMachineContextSchema, AppMachineEvent, AppMachineStateSchema>,
  Interpreter<AppMachineContextSchema, AppMachineStateSchema, AppMachineEvent>['send'],
];

export const AppMachineContext = createContext<AppMachine | undefined>(undefined);

export default function AppProvider({ children }: AppProverProps): JSX.Element {
  const client = useRef(
    new Auth0Client({
      domain: process.env.AUTH0_DOMAIN as string,
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_id: process.env.AUTH0_CLIENT_ID as string,
      // eslint-disable-next-line @typescript-eslint/camelcase
      redirect_uri: window.location.origin,
    }),
  );

  const [state, send] = useMachine<AppMachineContextSchema, AppMachineEvent>(appMachine, {
    actions: {
      [AppMachineAction.checkAuth]: async (): Promise<void> => {
        try {
          const token = await client.current.getTokenSilently();
          if (token) {
            const idToken = await client.current.getIdTokenClaims();
            send({
              type: AppMachineEvent.AUTHENTICATE,
              auth: { userId: idToken.sub, token: idToken.__raw },
            });
            return;
          }
        } catch (error) {
          console.warn(error);
        }

        if (window.location.search.includes('code=')) {
          send(AppMachineEvent.REDIRECT_AUTH);
        } else {
          send(AppMachineEvent.LOG_OUT);
        }
      },
      [AppMachineAction.logIn]: (): Promise<void> => client.current.loginWithRedirect(),
      [AppMachineAction.logOut]: (): void =>
        client.current.logout({ returnTo: window.location.origin }),
    },
    services: {
      [AppMachineService.authRedirectHandler]: async (): Promise<AuthData> => {
        await client.current.handleRedirectCallback();
        const idToken = await client.current.getIdTokenClaims();
        return {
          userId: idToken.sub,
          token: idToken.__raw,
        };
      },
    },
  });

  return <AppMachineContext.Provider value={[state, send]}>{children}</AppMachineContext.Provider>;
}
