import React from 'react';
import Text from '../../../component/text';

const UserImageListEmpty: React.FC = () => {
  return (
    <div className="container">
      <div className="heading">
        <Text size="medium">Add your first GIF ✌️</Text>
      </div>
      <video className="video" width="400" autoPlay loop controls={false}>
        <source src="https://media.giphy.com/media/UtZtgAHBpGNMY/giphy.mp4" type="video/mp4" />
      </video>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 10vh;
        }
        .heading {
          margin-bottom: 16px;
        }
        .video {
          max-width: 100%;
        }
      `}</style>
    </div>
  );
};

export default UserImageListEmpty;
