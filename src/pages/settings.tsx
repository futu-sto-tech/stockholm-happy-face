import React, { FormEvent, useEffect, useState } from 'react';
import { useAppMachine, useUserId } from '../hooks';

import AppHeader from '../components/app-header';
import { AppMachineEvent } from '../machines/app-machine';
import FloatingHeader from '../components/floating-header';
import LogoIcon from '../components/logo-icon';
import { MdArrowBack } from 'react-icons/md';
import { useRouter } from 'next/router';
import useTeamsQuery from '../graphql/queries/teams';
import useUpdateUserNameMutation from '../graphql/mutations/update-user-name';
import useUpdateUserRoleMutation from '../graphql/mutations/update-user-role';
import useUpdateUserTeamMutation from '../graphql/mutations/update-user-team';
import useUserEntriesQuery from '../graphql/queries/user-entries';

const EditUserTeam: React.FC<{
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: number;
  teams?: Array<{ id: number; name: string }>;
}> = ({ onChange, value, teams }) => (
  <div className="flex items-center justify-between">
    <p className="text-lg">Your team</p>

    <select className="border-gray-800 rounded form-select" value={value} onChange={onChange}>
      <option disabled>Choose team</option>
      {teams?.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
);

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
          className="flex-1 border-r-0 border-black rounded-l rounded-r-none form-input"
          value={name}
          onChange={({ target: { value } }): void => setName(value)}
          required
        />

        <button className="border border-black rounded-l-none rounded-r flat-button" type="submit">
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
      className="text-black form-checkbox"
      checked={checked}
      onChange={onChange}
    />
  </div>
);

const EditUserData: React.FC = () => {
  const userId = useUserId();
  const { data, refetch } = useUserEntriesQuery(userId);
  const teamsData = useTeamsQuery();
  const [updateUserTeam] = useUpdateUserTeamMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserName] = useUpdateUserNameMutation();

  const handleChangeTeam = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    await updateUserTeam({ variables: { id: userId, team: parseInt(event.target.value) } });
    await refetch();
  };

  const handleChangeRole = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const role = event.target.checked ? 'HOST' : 'PARTICIPANT';
    await updateUserRole({ variables: { id: userId, role } });
    await refetch();
  };

  const handleChangeName = async (event: FormEvent, name: string): Promise<void> => {
    event.preventDefault();
    await updateUserName({ variables: { id: userId, name } });
    await refetch();
  };

  return (
    <>
      <img src={data?.user_by_pk?.picture} className="w-32 h-32 mx-auto rounded-full" />
      <EditUserName value={data?.user_by_pk?.name} onSubmit={handleChangeName} />
      <EditUserTeam
        teams={teamsData.data?.team}
        value={data?.user_by_pk?.team?.id}
        onChange={handleChangeTeam}
      />
      <EditUserRole checked={data?.user_by_pk?.role === 'HOST'} onChange={handleChangeRole} />
    </>
  );
};

const SettingsPage: React.FC = () => {
  const [, send] = useAppMachine();
  const router = useRouter();

  return (
    <div>
      <FloatingHeader>
        <AppHeader>
          <div className="flex items-center w-full">
            <div className="flex items-center flex-1 flex-start">
              <button
                className="flex items-center px-4 py-2 space-x-1 rounded hover:bg-gray-300"
                onClick={(): void => router.back()}
              >
                <MdArrowBack size="20" />
                <p>Back</p>
              </button>
            </div>
            <div className="flex items-center justify-center flex-1">
              <LogoIcon size="100" />
            </div>
            <div className="flex-1"></div>
          </div>
        </AppHeader>
      </FloatingHeader>
      <div className="h-10" />
      <div className="max-w-lg p-4 mx-auto space-y-10">
        <EditUserData />

        <button
          className="mx-auto flat-button-secondary"
          onClick={(): void => {
            send(AppMachineEvent.LOG_OUT);
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;