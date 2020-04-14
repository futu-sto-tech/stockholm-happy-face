import ManualEntry from '../../components/manual-entry';
import NewEntry from '../../components/new-entry';
import React from 'react';
import { useRouter } from 'next/router';

const EntriesNewPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="h-screen max-w-2xl p-4 mx-auto">
      {router.query.manual ? <ManualEntry /> : <NewEntry />}
    </div>
  );
};

export default EntriesNewPage;
