import { IoMdAdd } from 'react-icons/io';
import Link from 'next/link';
import React from 'react';
import RoundButton from '../../../component/round-button';
import { useEntry } from '../../../api';

const NewPreviewButton: React.FC<{ userId: string; entryId: string }> = ({ userId, entryId }) => {
  const { data } = useEntry(entryId);

  if (data === undefined) {
    return <RoundButton IconComponent={IoMdAdd} disabled />;
  }

  return (
    <Link
      href={`/[userId]/new/preview?url=${data?.gif.url}`}
      as={`/${userId}/new/preview?url=${data?.gif.url}`}
    >
      <a>
        <RoundButton IconComponent={IoMdAdd} disabled={data === undefined} />
      </a>
    </Link>
  );
};

export default NewPreviewButton;
