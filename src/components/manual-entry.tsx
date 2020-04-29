import React, { useCallback, useState } from 'react';

import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
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
          <p className="text-lg font-semibold text-black">Great, you already found a GIF!</p>
          <p className="text-gray-700">Paste the link to the GIF below.</p>
        </header>
        <main>
          <input
            className="block w-full transition-colors duration-150 bg-white border border-black border-gray-400 rounded-sm hover:border-black form-input"
            placeholder="Happy, sad, boring..."
            type="url"
            value={url}
            onChange={({ target: { value } }): void => setUrl(value)}
            required
            autoFocus
          />
        </main>
        <footer className="flex space-x-4">
          <Link href="/entries/new">
            <a className="flex items-center px-6 py-2 text-gray-700 transition-colors duration-150 bg-white border border-gray-400 rounded-sm space-x-2 hover:text-black hover:border-black">
              <MdArrowBack size="20" />
              <p className="text-base leading-none">Pick another</p>
            </a>
          </Link>

          <button
            className="px-6 py-2 text-white transition-colors duration-150 bg-black border border-black rounded-sm hover:bg-white hover:text-black"
            type="submit"
          >
            Preview GIF
          </button>
        </footer>
      </div>
    </form>
  );
};

export default ManualEntry;
