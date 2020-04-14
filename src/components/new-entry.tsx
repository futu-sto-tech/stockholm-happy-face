import React, { useEffect, useState } from 'react';

import ConfirmNewEntry from './confirm-new-entry';
import SearchGif from './search-gif';
import { useAuth0 } from '../context/auth';
import { useRouter } from 'next/router';

const NewEntry: React.FC = () => {
  const router = useRouter();
  const { url: gifUrl } = router.query;
  const { user } = useAuth0();
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(() => setOffset(0), [query]);

  return user && typeof gifUrl === 'string' ? (
    <ConfirmNewEntry url={gifUrl} user={user.sub} />
  ) : (
    <SearchGif query={query} setQuery={setQuery} offset={offset} setOffset={setOffset} />
  );
};

export default NewEntry;
