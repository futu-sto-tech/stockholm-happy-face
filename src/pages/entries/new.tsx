import Button from '../../components/button';
import Link from 'next/link';
import ManualEntry from '../../components/manual-entry';
import { MdClose } from 'react-icons/md';
import NewEntry from '../../components/new-entry';
import React from 'react';
import { useRouter } from 'next/router';

const EntriesNewPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="h-screen max-w-3xl p-4 mx-auto">
      <div className="top-0 left-0 mb-4 lg:fixed lg:p-4">
        <Link href="/profile">
          <a>
            <Button>
              <MdClose size="24" />
            </Button>
          </a>
        </Link>
      </div>
      {router.query.manual ? <ManualEntry /> : <NewEntry />}
    </div>
  );
};

export default EntriesNewPage;
