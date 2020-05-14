import '../styles/index.css';
import '@reach/dialog/styles.css';

import { AppMachineState } from '../machines/app-machine';
import { AppProps } from 'next/app';
import GraphqlClientProvider from '../context/graphql-client';
import LogoIcon from '../components/logo-icon';
import React from 'react';
import dynamic from 'next/dynamic';
import { useAppMachine } from '../hooks';
import { useRouter } from 'next/router';

function SplashScreen(): JSX.Element {
  return (
    <div className="flex items-center justify-center h-screen text-gray-400 bg-gray-200">
      <LogoIcon />
    </div>
  );
}

type AuthWrapperProps = { children: JSX.Element };

function AuthWrapper({ children }: AuthWrapperProps): JSX.Element {
  const router = useRouter();
  const [state] = useAppMachine();

  if (
    state.matches(AppMachineState.starting) ||
    state.matches(AppMachineState.receivingAuthRedirect)
  ) {
    return <SplashScreen />;
  }

  if (state.context.auth) {
    return (
      <GraphqlClientProvider token={state.context.auth.token}>{children}</GraphqlClientProvider>
    );
  } else if (router.pathname !== '/') {
    router.replace('/');
    return <SplashScreen />;
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
