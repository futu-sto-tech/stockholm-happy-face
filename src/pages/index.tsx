import { AppMachineEvent, AppMachineState } from '../machines/app-machine';
import { useAppMachine, useUserId } from '../hooks';

import { EntryFeed } from './profile';
import Layout from '../components/layout';
import LogoIcon from '../components/logo-icon';
import React from 'react';

function UserEntryFeed(): JSX.Element {
  const userId = useUserId();

  return (
    <Layout>
      <EntryFeed userId={userId} />
    </Layout>
  );
}

const IndexPage: React.FC = () => {
  const [state, send] = useAppMachine();

  if (state.matches(AppMachineState.loggedIn)) {
    return <UserEntryFeed />;
  } else if (state.matches(AppMachineState.loggedOut)) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="flex justify-center py-24">
          <div className="w-full max-w-xs p-6 space-y-4 bg-gray-900 rounded shadow-stereoscopic">
            <div className="flex justify-center text-white">
              <LogoIcon size="120" />
            </div>
            <ul>
              <li className="flex items-center space-x-4">
                <p className="w-8 text-4xl font-bold text-gray-100 text-shadow-stereoscopic">1.</p>
                <p className="text-lg font-semibold text-gray-100">Log in</p>
              </li>
              <li className="flex items-center space-x-4">
                <p className="w-8 text-4xl font-bold text-gray-100 text-shadow-stereoscopic">2.</p>
                <p className="text-lg font-semibold text-gray-100">Select a GIF</p>
              </li>
              <li className="flex items-center space-x-4">
                <p className="w-8 text-4xl font-bold text-gray-100 text-shadow-stereoscopic">3.</p>
                <p className="text-lg font-semibold text-gray-100">Share with your team</p>
              </li>
            </ul>
            <div>
              <button
                className="mx-auto stereoscopic-button-white"
                onClick={(): void => {
                  send(AppMachineEvent.LOG_IN);
                }}
              >
                Login
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 bg-yellow-400">
          <div
            className="w-full"
            style={{
              backgroundImage: `url('/images/pattern.svg')`,
              height: 120,
              backgroundSize: 120,
            }}
          />
        </main>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-gray-500">
        <LogoIcon />
      </div>
    );
  }
};

export default IndexPage;
