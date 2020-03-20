import { IoMdAdd, IoMdLink, IoMdLogOut } from 'react-icons/io';

import FixedBottom from '../../component/fixed-bottom';
import Link from 'next/link';
import React from 'react';
import RoundButton from '../../component/round-button';
import UserHeading from './components/user-heading';
import UserImageList from './components/user-image-list';
import { useRouter } from 'next/router';

const UserScreen: React.FC = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const handleClickLogout = (): void => {
    router.push(`/`);
  };

  return (
    <div className="container">
      <div className="welcome-box">
        <UserHeading userId={userId} />
      </div>

      <UserImageList userId={userId} />

      <FixedBottom>
        <div className="footer-container">
          <Link href="/[userId]/new/link" as={`/${userId}/new/link`}>
            <a>
              <RoundButton buttonType="NEUTRAL" IconComponent={IoMdLink} title="Link to GIF" />
            </a>
          </Link>
          <Link href="/[userId]/new" as={`/${userId}/new`}>
            <a>
              <RoundButton IconComponent={IoMdAdd} buttonType="SUCCESS" />
            </a>
          </Link>
          <RoundButton
            onClick={handleClickLogout}
            IconComponent={IoMdLogOut}
            buttonType="NEUTRAL"
          />
        </div>
      </FixedBottom>

      <style jsx>{`
        .footer-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        }

        .container {
          padding: 16px;
          padding-bottom: 120px;
        }
        .welcome-box {
          padding-bottom: 16px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default UserScreen;
