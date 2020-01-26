import React, { useState } from 'react';

import FixedBottom from '../../component/fixed-bottom';
import { IoMdAdd } from 'react-icons/io';
import Link from 'next/link';
import RoundButton from '../../component/round-button';
import SearchInput from '../../component/search-input';
import UserList from './components/user-list';

const LoginScreen: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="container">
      <UserList query={query} />

      <FixedBottom>
        <div className="footer-container">
          <SearchInput
            type="text"
            placeholder="Hanna..."
            value={query}
            onChange={({ target: { value } }): void => setQuery(value)}
          />
          <Link href="/new">
            <a>
              <RoundButton IconComponent={IoMdAdd} buttonType="SUCCESS" />
            </a>
          </Link>
        </div>
      </FixedBottom>

      <style jsx>{`
        .footer-container {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-gap: 16px;
        }

        .container {
          padding: 16px;
          padding-bottom: 120px;
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;
