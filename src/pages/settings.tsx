import * as gtag from 'lib/gtag';

import React, { FormEvent, useEffect, useState } from 'react';
import { useAppMachine, useUserId } from '../hooks';

import { AppMachineEvent } from '../machines/app-machine';
import { BaseHeader } from 'components/header/component';
import { MdArrowBack } from 'react-icons/md';
import TeamPicker from 'components/team-picker';
import buttonStyles from '../styles/button.module.css';
import { useRouter } from 'next/router';
import useUpdateUserNameMutation from '../graphql/mutations/update-user-name';
import useUpdateUserRoleMutation from '../graphql/mutations/update-user-role';
import useUserEntriesQuery from '../graphql/queries/user-entries';

const EditUserName: React.FC<{
  value?: string;
  onSubmit: (event: FormEvent, name: string) => void;
}> = ({ value, onSubmit }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (value) setName(value);
  }, [value]);

  return (
    <form onSubmit={(event): void => onSubmit(event, name)}>
      <div className="flex">
        <input
          className="flex-1 border-r-0 border-black rounded-l-lg rounded-r-none form-input"
          value={name}
          onChange={({ target: { value } }): void => setName(value)}
          required
        />

        <button
          className={buttonStyles.secondary}
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: 'auto' }}
          type="submit"
        >
          update
        </button>
      </div>
    </form>
  );
};

const EditUserRole: React.FC<{
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ checked, onChange }) => (
  <div className="flex items-center justify-between">
    <p className="text-lg">Session host</p>
    <input
      type="checkbox"
      className="w-6 h-6 text-black form-checkbox border-black"
      checked={checked}
      onChange={onChange}
    />
  </div>
);

const EditUserData: React.FC = () => {
  const userId = useUserId();
  const { data, refetch } = useUserEntriesQuery(userId);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserName] = useUpdateUserNameMutation();

  const handleChangeRole = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const role = event.target.checked ? 'HOST' : 'PARTICIPANT';
    gtag.event({ name: 'changeRole', label: role });
    await updateUserRole({ variables: { id: userId, role } });
    await refetch();
  };

  const handleChangeName = async (event: FormEvent, name: string): Promise<void> => {
    event.preventDefault();
    gtag.event({ name: 'changeUserName' });
    await updateUserName({ variables: { id: userId, name } });
    await refetch();
  };

  return (
    <>
      <img src={data?.user_by_pk?.picture} className="w-32 h-32 mx-auto rounded-full" />
      <EditUserName value={data?.user_by_pk?.name} onSubmit={handleChangeName} />

      <div className="flex items-center justify-between">
        <p className="text-lg">Your team</p>

        <TeamPicker />
      </div>

      <EditUserRole checked={data?.user_by_pk?.role === 'HOST'} onChange={handleChangeRole} />
    </>
  );
};

const SettingsPage: React.FC = () => {
  const [, send] = useAppMachine();
  const router = useRouter();

  return (
    <div>
      <BaseHeader>
        <button
          className="flex items-center h-12 px-4 space-x-1 text-black rounded-lg hover:bg-black hover:text-white"
          onClick={(): void => router.back()}
        >
          <MdArrowBack size="24" />
          <p className="text-lg leading-none">Back</p>
        </button>
      </BaseHeader>
      <div className="h-10" />
      <div className="max-w-lg p-4 mx-auto space-y-10">
        <EditUserData />

        <div className="flex justify-center">
          <button
            className={buttonStyles.tertiary}
            onClick={(): void => {
              gtag.event({ name: 'logOut' });
              send(AppMachineEvent.LOG_OUT);
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
