import * as screenHook from '../screen-hooks';

import ErrorBox from '../../../component/error-box';
import React from 'react';
import UserImageListEmpty from './user-image-list-empty';
import UserImageListSuccess from './user-image-list-success';

const UserImageList: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, error } = screenHook.useImageList(userId);

  if (error) {
    return <ErrorBox>Unable to previous entries</ErrorBox>;
  }

  if (data && data.length === 0) {
    return <UserImageListEmpty />;
  }

  return <UserImageListSuccess data={data} />;
};

export default UserImageList;
