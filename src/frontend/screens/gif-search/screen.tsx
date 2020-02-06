import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import { useChangeGifQuery, useChangeOffset, useGifQuery, useOffset } from '../../hooks';

import FixedBottom from '../../component/fixed-bottom';
import GifImageList from './components/gif-image-list';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import React from 'react';
import RoundButton from '../../component/round-button';
import SearchInput from '../../component/search-input';
import { useRouter } from 'next/router';

const GifSearchScreen: React.FC = () => {
  const router = useRouter();
  const userId = router.query.userId as string;

  const query = useGifQuery();
  const changeGifQuery = useChangeGifQuery();
  const offset = useOffset();
  const changeOffset = useChangeOffset();

  const handleClickNextPage = (): void => changeOffset(offset + 25);
  const handleClickPrevPage = (): void => changeOffset(offset - 25);

  return (
    <div className="container">
      <GifImageList userId={userId} offset={offset} />

      <div className="pagination">
        <div className="pagination-button button-prev">
          <RoundButton
            buttonType="NEUTRAL"
            IconComponent={IoMdArrowBack}
            title="Previous page"
            onClick={handleClickPrevPage}
            disabled={offset === 0}
          />
        </div>
        <div className="pagination-button button-next">
          <RoundButton
            buttonType="NEUTRAL"
            IconComponent={IoMdArrowForward}
            title="Next page"
            onClick={handleClickNextPage}
            disabled={!query}
          />
        </div>
      </div>

      <FixedBottom>
        <div className="footer-container">
          <SearchInput
            placeholder="funny, sad, boring, exciting..."
            value={query}
            onChange={({ target: { value } }): void => changeGifQuery(value)}
            autoFocus={true}
          />
          <Link href="/[userId]" as={`/${userId}`}>
            <a>
              <RoundButton
                onClick={(): void => {
                  changeGifQuery('');
                  changeOffset(0);
                }}
                IconComponent={IoMdClose}
                title="Close"
              />
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

        .pagination {
          position: fixed;
          z-index: 999;
          top: 0;
          bottom: ${88 + 16}px;
          left: 8px;
          right: 8px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          pointer-events: none;
        }
        .pagination-button {
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
          border-radius: 40px;
          pointer-events: initial;
        }
      `}</style>
    </div>
  );
};

export default GifSearchScreen;
