import EntryInfoSuccess from './entry-info-success';
import ErrorBox from '../../../component/error-box';
import React from 'react';
import { useEntry } from '../../../api';

const EntryInfo: React.FC<{ entryId: string }> = ({ entryId }) => {
  const { data, error } = useEntry(entryId);

  if (error) {
    return <ErrorBox>{`Failed to load entry: ${error}`}</ErrorBox>;
  }

  if (data === undefined) {
    return null;
  }

  return <EntryInfoSuccess data={data} />;
};

export default EntryInfo;
