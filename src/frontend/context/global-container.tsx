import React, { useState } from 'react';

import { GlobalProvider } from './global';

const GlobalContainer: React.FC = ({ children }) => {
  const [gifQuery, setGifQuery] = useState('');
  const [offset, setOffset] = useState(0);

  return (
    <GlobalProvider
      value={{
        gifQuery,
        setGifQuery,
        offset,
        setOffset,
      }}
    >
      {children}
    </GlobalProvider>
  );
};

export default GlobalContainer;
