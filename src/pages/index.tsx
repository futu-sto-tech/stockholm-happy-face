import { AppMachineEvent, AppMachineState } from 'machines/app-machine';
import { useAppMachine, useUserId } from 'hooks';

import { EntryFeed } from './profile';
import Layout from 'components/layout';
import LogoIcon from 'components/logo-icon';
import Lottie from 'react-lottie';
import React from 'react';
import buttonStyles from 'styles/button.module.css';
import mascotAnimation from 'animations/mascot.json';

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
        <header className="flex items-center justify-center bg-yellow-400 h-screen-70">
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
        <main className="h-screen bg-green-400">
          <div
            style={{
              backgroundImage: `url('/images/wobble.svg')`,
              height: 159,
              backgroundPosition: 'center',
            }}
          />
          <div className="flex flex-col justify-center h-screen-70">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: mascotAnimation,
              }}
              isClickToPauseDisabled={true}
              width={400}
            />

            <div className="-mt-16">
              <div className="flex flex-col items-center -mt-64 space-y-10">
                <ul className="space-y-3">
                  <li className="text-xl font-bold">
                    <span className="text-4xl">1.</span> Log in
                  </li>
                  <li className="text-xl font-bold">
                    <span className="text-4xl">2.</span> Select a GIF
                  </li>
                  <li className="text-xl font-bold">
                    <span className="text-4xl">3.</span> Share with your team
                  </li>
                </ul>
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
          </div>
        </main>
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
