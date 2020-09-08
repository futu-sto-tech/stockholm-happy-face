import {
  ListboxButton,
  ListboxInput,
  ListboxList,
  ListboxOption,
  ListboxPopover,
} from '@reach/listbox';
import React, { useCallback } from 'react';

import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './styles.module.css';
import useTeamsQuery from 'graphql/queries/teams';
import useUpdateUserTeamMutation from 'graphql/mutations/update-user-team';
import { useUserId } from 'hooks';
import useUserQuery from 'graphql/queries/user';

const TeamPicker: React.FC = () => {
  const userId = useUserId();
  const user = useUserQuery(userId);
  const [updateUserTeam] = useUpdateUserTeamMutation();
  const teams = useTeamsQuery();

  const handleChange = useCallback(
    async (value: string) => {
      await updateUserTeam({ variables: { id: userId, team: parseInt(value) } });
      user.refetch();
    },
    [updateUserTeam, userId, user],
  );

  return (
    <ListboxInput value={user.data?.user_by_pk.team?.id.toString()} onChange={handleChange}>
      <ListboxButton className={styles.button}>
        <p>{user.data?.user_by_pk.team?.name}</p>
        <MdKeyboardArrowDown size="24" />
      </ListboxButton>
      <ListboxPopover className={styles.list}>
        <ListboxList>
          {teams.data?.team.map((item) => (
            <ListboxOption key={item.id} value={item.id.toString()} className={styles.listItem}>
              {item.name}
            </ListboxOption>
          ))}
        </ListboxList>
      </ListboxPopover>
    </ListboxInput>
  );
};

export default TeamPicker;
