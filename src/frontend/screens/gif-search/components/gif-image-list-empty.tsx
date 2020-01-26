import React from 'react';
import Text from '../../../component/text';

const GifImageListEmpty: React.FC = () => (
  <div className="empty-state">
    <div className="empty-state-heading">
      <Text size="medium">Search for a GIF</Text>
    </div>
    <Text size="small" color="muted">
      ...that represents how your week has been!
    </Text>

    <style jsx>{`
      .empty-state {
        text-align: center;
        padding-top: 10vh;
      }
      .empty-state-heading {
        margin-bottom: 8px;
      }
    `}</style>
  </div>
);

export default GifImageListEmpty;
