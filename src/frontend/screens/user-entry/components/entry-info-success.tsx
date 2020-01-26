import { ApiEntry } from '../../../../types';
import React from 'react';
import Text from '../../../component/text';

const EntryInfoSuccess: React.FC<{ data: ApiEntry }> = ({ data }) => {
  return (
    <>
      <div className="container">
        <div className="week-label">
          <Text size="medium">{`Week ${data.week}, ${data.year}`}</Text>
        </div>
        <Text size="small" color="muted">
          {`Posted ${data.fromNow}`}
        </Text>
      </div>
      <div className="bottom-container">
        <div className="image-container">
          <div className="image" style={{ backgroundImage: `url(${data.images.original.url})` }} />
        </div>
      </div>

      <style jsx>{`
        .container {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 16px;
        }
        .week-label {
          margin-bottom: 2px;
        }
        .bottom-container {
          padding: 16px;
        }
        .image-container {
          height: 100%;
          max-width: 800px;
          max-height: 800px;
          margin: 0 auto;
        }
        .image {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
      `}</style>
    </>
  );
};

export default EntryInfoSuccess;
