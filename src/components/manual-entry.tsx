import React, { useCallback, useState } from 'react';

import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import buttonStyles from '../styles/button.module.css';
import { useRouter } from 'next/router';

const ManualEntry: React.FC = () => {
  const router = useRouter();
  const [url, setUrl] = useState('');

  const handleSubmitUrl = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      router.push({
        pathname: '/entries/new',
        query: { url },
      });
    },
    [router, url],
  );

  return (
    <form onSubmit={handleSubmitUrl}>
      <div className="p-6 space-y-4">
        <header>
          <p className="text-xl font-bold text-center text-black">
            Great, you already found a GIF!
          </p>
          <p className="text-base text-center text-gray-700">Paste the link to the GIF below.</p>
        </header>
        <main>
          <input
            className="block w-full transition-colors duration-150 bg-white border border-black rounded-sm form-input"
            placeholder="https://media.giphy.com/media/YOqTSEtKNwmivNtNFd/giphy.gif"
            type="url"
            value={url}
            onChange={({ target: { value } }): void => setUrl(value)}
            required
            autoFocus
          />
        </main>
        <footer className="flex justify-between w-full">
          <Link href="/entries/new">
            <a className={`${buttonStyles.tertiary} space-x-2`}>
              <MdArrowBack size="20" />
              <p className="text-base leading-none">Pick another</p>
            </a>
          </Link>

          <button className={buttonStyles.secondary} type="submit">
            Preview GIF
          </button>
        </footer>
      </div>
    </form>
  );
};

export default ManualEntry;
