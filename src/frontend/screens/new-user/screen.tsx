import { IoIosArrowRoundBack, IoIosSave } from 'react-icons/io';
import React, { useState } from 'react';

import ErrorBox from '../../component/error-box';
import FixedBottom from '../../component/fixed-bottom';
import Link from 'next/link';
import RoundButton from '../../component/round-button';
import SearchInput from '../../component/search-input';
import Text from '../../component/text';
import { userHook } from '../../hook';

const NewUserScreen: React.FC = () => {
  const { createUser, error } = userHook.useCreateUser();
  const [name, setName] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    createUser(name);
  };

  return (
    <div className="container">
      <div className="label">
        <Text size="medium">Pick a username</Text>
      </div>
      <form onSubmit={handleSubmit}>
        <SearchInput
          value={name}
          onChange={({ target: { value } }): void => setName(value)}
          autoFocus={true}
          required={true}
        />
      </form>
      {error && (
        <div className="error">
          <ErrorBox>{error}</ErrorBox>
        </div>
      )}

      <FixedBottom>
        <div className="footer-container">
          <Link href="/">
            <a>
              <RoundButton IconComponent={IoIosArrowRoundBack} buttonType="NEUTRAL" />
            </a>
          </Link>
          <RoundButton
            IconComponent={IoIosSave}
            buttonType="SUCCESS"
            onClick={(): void => createUser(name)}
          />
        </div>
      </FixedBottom>

      <style jsx>{`
        .footer-container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }

        .container {
          padding: 16px;
        }

        .label {
          margin-bottom: 16px;
          text-align: center;
        }

        .error {
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
};

export default NewUserScreen;
