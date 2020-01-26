import * as screenHook from './screen-hooks';

import { IoMdArrowBack, IoMdCheckmark } from 'react-icons/io';

import FixedBottom from '../../component/fixed-bottom';
import React from 'react';
import RoundButton from '../../component/round-button';
import { useRouter } from 'next/router';

const GifPreviewScreen: React.FC = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const url = router.query.url as string;
  const { createEntry } = screenHook.useCreateEntry(userId, url);

  const handleClickDismiss = (): void => {
    router.back();
  };

  return (
    <div className="container">
      <div className="inner-container">
        {url && <div className="image" style={{ backgroundImage: `url(${url})` }} />}
      </div>

      <FixedBottom>
        <div className="footer-container">
          <RoundButton
            onClick={handleClickDismiss}
            IconComponent={IoMdArrowBack}
            buttonType="NEUTRAL"
          />
          <RoundButton onClick={createEntry} IconComponent={IoMdCheckmark} buttonType="SUCCESS" />
        </div>
      </FixedBottom>

      <style jsx>{`
        .container {
          height: 100vh;
          padding-bottom: 88px;
        }
        .inner-container {
          height: 100%;
          max-height: 800px;
          padding: 16px;
          max-width: 800px;
          margin: 0 auto;
        }
        .image {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        .footer-container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      `}</style>
    </div>
  );
};

export default GifPreviewScreen;
