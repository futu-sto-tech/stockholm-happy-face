import ErrorBox from '../../../component/error-box';
import React from 'react';
import UserListLoading from './user-list-loading';
import UserListSuccess from './user-list-success';
import { userHook } from '../../../hook';

const UserList: React.FC<{ query: string }> = ({ query }) => {
  const { data, error } = userHook.useFilteredUserList(query);

  if (error) {
    return <ErrorBox>Unable to fetch users, please try again</ErrorBox>;
  }

  if (data === undefined) {
    return <UserListLoading />;
  }

  if (data.length === 0) {
    return <ErrorBox>No users found, want to create a new user?</ErrorBox>;
  }

  return <UserListSuccess data={data} />;
};

export default UserList;
