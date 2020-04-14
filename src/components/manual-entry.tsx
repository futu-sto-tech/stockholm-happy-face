import React, { useCallback, useState } from 'react';

import Link from 'next/link';
import { MdClose } from 'react-icons/md';
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
    <div className="bg-white rounded-lg shadow">
      <header className="relative flex items-center justify-center h-16 px-4 border-b border-gray-300">
        <p className="text-lg font-semibold text-center">Choose a GIF</p>
        <div className="absolute top-0 bottom-0 right-0 flex items-center pr-4">
          <Link href="/profile">
            <a className="p-2 bg-gray-200 rounded-full">
              <MdClose size="20" />
            </a>
          </Link>
        </div>
      </header>
      <main className="h-64 p-12">
        <form onSubmit={handleSubmitUrl}>
          <label className="block">
            <span className="text-gray-600">Paste link to your GIF here</span>
            <input
              className="block w-full mt-1 mb-2 rounded-lg form-input"
              placeholder="Happy, sad, boring..."
              type="url"
              value={url}
              onChange={({ target: { value } }): void => setUrl(value)}
              required
              autoFocus
            />
          </label>
          <button
            className="px-4 py-2 text-gray-700 transition-transform transform bg-gray-300 rounded hover:bg-gray-400 active:scale-95"
            type="submit"
          >
            Preview
          </button>
        </form>
      </main>
    </div>
  );
};

export default ManualEntry;
