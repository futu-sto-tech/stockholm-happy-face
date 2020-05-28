import { AppMachineEvent, AppMachineState } from 'machines/app-machine';

import LogoIcon from 'components/logo-icon';
import Lottie from 'react-lottie';
import React from 'react';
import TeamSwitch from 'components/team-switch';
import buttonStyles from 'styles/button.module.css';
import mascotAnimation from 'animations/mascot.json';
import { useAppMachine } from 'hooks';

const IndexPage: React.FC = () => {
  const [state, send] = useAppMachine();

  if (state.matches(AppMachineState.loggedIn)) {
    return <TeamSwitch />;
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
        <div
          className="bg-green-400"
          style={{
            backgroundImage: `url('/images/wobble.svg')`,
            height: 159,
            backgroundPosition: 'center',
          }}
        />
        <main className="flex items-center justify-center bg-green-400 h-screen-70">
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 lg:gap-16">
            <div className="-mt-32 lg:mt-0">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: mascotAnimation,
                }}
                isClickToPauseDisabled={true}
                width={400}
              />
            </div>

            <div className="flex flex-col items-center -mt-12 space-y-10">
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
