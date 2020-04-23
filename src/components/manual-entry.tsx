import { MdArrowBack, MdClose } from 'react-icons/md';
import React, { useCallback, useState } from 'react';

import Button from './button';
import Link from 'next/link';
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
    <div className="p-4 bg-gray-200 border border-gray-400 rounded-lg space-y-4">
      <header className="flex items-center space-x-4">
        <Link href="/entries/new">
          <a className="text-gray-800">
            <MdArrowBack size="24" />
          </a>
        </Link>
        <p className="text-lg font-semibold text-gray-800">Great, you already found a GIF!</p>
      </header>
      <main>
        <form onSubmit={handleSubmitUrl}>
          <label className="block">
            <span className="text-gray-600">Link to GIF</span>
            <input
              className="block w-full mt-1 mb-4 rounded-lg form-input"
              placeholder="Happy, sad, boring..."
              type="url"
              value={url}
              onChange={({ target: { value } }): void => setUrl(value)}
              required
              autoFocus
            />
          </label>
          <Button className="px-8 bg-gray-300 hover:bg-gray-400" type="submit">
            Preview
          </Button>
        </form>
      </main>
    </div>
  );
};

export default ManualEntry;
