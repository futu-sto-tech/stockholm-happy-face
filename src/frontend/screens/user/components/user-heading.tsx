import React from 'react';
import Text from '../../../component/text';
import { useUser } from '../../../api';

const UserHeading: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, error } = useUser(userId);

  if (error) {
    <Text size="medium">Failed to fetch user name</Text>;
  }

  return data ? <Text size="medium" truncate>{`Welcome ${data.name}`}</Text> : null;
};

export default UserHeading;
