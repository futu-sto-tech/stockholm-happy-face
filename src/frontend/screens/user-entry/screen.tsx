import { IoMdClose, IoMdTrash } from 'react-icons/io';
import React, { useCallback, useEffect, useState } from 'react';

import EntryInfo from './components/entry-info';
import FixedBottom from '../../component/fixed-bottom';
import Link from 'next/link';
import NewPreviewButton from './components/new-preview-button';
import RoundButton from '../../component/round-button';
import { useDeleteEntry } from '../../api';
import { useRouter } from 'next/router';

const UserEntryScreen: React.FC = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const entryId = router.query.entryId as string;

  const deleteEntry = useDeleteEntry(userId);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleClickConfirmDelete = useCallback(() => {
    deleteEntry(entryId);
    setConfirmDelete(false);
    router.push('/[userId]', `/${userId}`);
  }, [deleteEntry, entryId, router, userId]);
  const handleClickDelete = useCallback(() => setConfirmDelete(true), []);

  useEffect(() => {
    if (confirmDelete) {
      const handle = setTimeout(() => setConfirmDelete(false), 4000);
      return (): void => clearTimeout(handle);
    }
  }, [confirmDelete]);

  return (
    <div className="container">
      <EntryInfo entryId={entryId} />

      <FixedBottom>
        <div className="footer-container">
          {confirmDelete ? (
            <RoundButton
              onClick={handleClickConfirmDelete}
              IconComponent={IoMdTrash}
              buttonType="DANGER"
            />
          ) : (
            <RoundButton
              onClick={handleClickDelete}
              IconComponent={IoMdTrash}
              buttonType="NEUTRAL"
            />
          )}
          <NewPreviewButton userId={userId} entryId={entryId} />
          <Link href="/[userId]" as={`/${userId}`}>
            <a>
              <RoundButton IconComponent={IoMdClose} />
            </a>
          </Link>
        </div>
      </FixedBottom>

      <style jsx>{`
        .footer-container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }

        .container {
          height: 100vh;
          padding-bottom: 88px;
          display: grid;
          grid-template-rows: auto 1fr;
        }
      `}</style>
    </div>
  );
};

export default UserEntryScreen;
