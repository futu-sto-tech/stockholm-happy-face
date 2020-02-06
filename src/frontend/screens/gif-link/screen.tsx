import { IoMdArrowBack, IoMdCheckmark } from 'react-icons/io';
import React, { useState } from 'react';

import FixedBottom from '../../component/fixed-bottom';
import Link from 'next/link';
import RoundButton from '../../component/round-button';
import SearchInput from '../../component/search-input';
import Text from '../../component/text';
import { useRouter } from 'next/router';

const GifLinkScreen: React.FC = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const [url, setUrl] = useState('');

  return (
    <div className="container">
      <div className="heading">
        <Text size="medium">Paste in a direct link to a GIF</Text>
      </div>
      <SearchInput
        value={url}
        onChange={({ target: { value } }): void => setUrl(value)}
        placeholder="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"
        type="url"
      />

      <FixedBottom>
        <div className="footer-container">
          <Link href="/[userId]" as={`/${userId}`}>
            <a>
              <RoundButton IconComponent={IoMdArrowBack} buttonType="NEUTRAL" />
            </a>
          </Link>
          <Link href={`/[userId]/new/preview?url=${url}`} as={`/${userId}/new/preview?url=${url}`}>
            <a>
              <RoundButton IconComponent={IoMdCheckmark} buttonType="NEUTRAL" />
            </a>
          </Link>
        </div>
      </FixedBottom>

      <style jsx>{`
        .container {
          height: 100vh;
          padding-bottom: 88px;
          padding: 32px;
        }

        .heading {
          text-align: center;
          margin-bottom: 16px;
        }

        .footer-container {
          display: flex;
          justify-content: space-around;
        }
      `}</style>
    </div>
  );
};

export default GifLinkScreen;
