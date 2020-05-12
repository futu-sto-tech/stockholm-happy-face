import { AppMachineEvent, AppMachineState } from '../machines/app-machine';
import { useAppMachine, useUserId } from '../hooks';

import { EntryFeed } from './profile';
import Layout from '../components/layout';
import LogoIcon from '../components/logo-icon';
import React from 'react';
import buttonStyles from '../styles/button.module.css';

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
  } else {
    return (
      <div>
        <div className="flex flex-col min-h-screen">
          <header className="flex items-center justify-center flex-1 bg-yellow-400">
            <div className="space-y-16 md:space-y-24">
              <div className="flex justify-center text-black">
                <LogoIcon size="176" />
              </div>

              <div className="flex justify-center">
                <button
                  className={buttonStyles.primaryWhite}
                  onClick={(): void => {
                    send(AppMachineEvent.LOG_IN);
                  }}
                >
                  Log in
                </button>
              </div>
            </div>
          </header>
          <main className="flex-1 bg-green-400">
            <div
              style={{
                backgroundImage: `url('/images/wobble.svg')`,
                height: 159,
                backgroundPosition: 'center',
              }}
            />
          </main>
        </div>
        <footer className="bg-green-600">
          <div className="w-full max-w-4xl p-4 mx-auto">
            <p className="text-sm text-green-300 uppercase">About</p>
            <a className="text-green-100 uppercase hover:underline" href="https://futurice.com/">
              Futurice.com
            </a>
          </div>
        </footer>
      </div>
    );
  }
};

export default IndexPage;
