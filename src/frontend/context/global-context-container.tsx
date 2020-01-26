import React, { useEffect } from 'react';
import { useChangeOffset, useGifQuery } from '../hooks';

const GlobalContextContainer: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const query = useGifQuery();
  const changeOffset = useChangeOffset();

  useEffect(() => {
    changeOffset(0);
  }, [changeOffset, query]);

  return children;
};

export default GlobalContextContainer;
