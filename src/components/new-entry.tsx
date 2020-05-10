import React, { useEffect, useState } from 'react';

import ConfirmNewEntry from './confirm-new-entry';
import SearchGif from './search-gif';
import { useRouter } from 'next/router';
import { useUserId } from '../hooks';

const NewEntry: React.FC = () => {
  const router = useRouter();
  const { url: gifUrl } = router.query;
  const userId = useUserId();
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(() => setOffset(0), [query]);

  return typeof gifUrl === 'string' ? (
    <ConfirmNewEntry url={gifUrl} user={userId} />
  ) : (
    <SearchGif query={query} setQuery={setQuery} offset={offset} setOffset={setOffset} />
  );
};

export default NewEntry;
