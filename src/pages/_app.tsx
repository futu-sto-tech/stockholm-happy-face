import '../styles/index.css';

import { AppProps } from 'next/app';
import GraphqlClientProvider from '../context/graphql-client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useAppMachine } from '../hooks';

type AuthWrapperProps = { children: JSX.Element };

function AuthWrapper({ children }: AuthWrapperProps): JSX.Element {
  const [state] = useAppMachine();

  if (state.context.auth) {
    return (
      <GraphqlClientProvider token={state.context.auth.token}>{children}</GraphqlClientProvider>
    );
  }

  return children;
}

const AppProviderWithNoSSR = dynamic(import('../machines/app-context'), { ssr: false });

export default function SmileysApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppProviderWithNoSSR>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </AppProviderWithNoSSR>
  );
}
