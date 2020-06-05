import Header from 'components/header';
import ManualEntry from '../../components/manual-entry';
import NewEntry from '../../components/new-entry';
import React from 'react';
import { useRouter } from 'next/router';

const EntriesNewPage: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <Header />
      <div className="max-w-3xl px-4 mx-auto">
        <div className="h-10" />
        {router.query.manual ? <ManualEntry /> : <NewEntry />}
      </div>
    </div>
  );
};

export default EntriesNewPage;
